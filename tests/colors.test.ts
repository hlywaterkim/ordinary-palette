import Color from "colorjs.io";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  black,
  blue,
  colors,
  families,
  gray,
  green,
  indigo,
  orange,
  pink,
  red,
  steps,
  teal,
  violet,
  white,
  yellow,
} from "../src/palette.ts";

const HEX = /^#[0-9a-f]{6}$/;
const CSS_FILE = /^:root \{\n(?:  --color-[a-z]+(?:-\d+)?: #[0-9a-f]{6};\n)+\}\n$/;

const scales = {
  gray,
  red,
  orange,
  yellow,
  green,
  teal,
  blue,
  indigo,
  violet,
  pink,
} as const;

const LIGHTNESS = {
  50: 97,
  100: 89.5,
  200: 82,
  300: 74.5,
  400: 67,
  500: 59.5,
  600: 52,
  700: 44.5,
  800: 37,
  900: 29.5,
  950: 22,
} as const;

function oklch(hex: string): { l: number; c: number } {
  const color = new Color(hex).to("oklch");
  return {
    l: color.get("oklch.l") * 100,
    c: color.get("oklch.c") ?? 0,
  };
}

test("every family has all 11 steps", () => {
  assert.deepEqual([...families], [
    "gray",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "indigo",
    "violet",
    "pink",
  ]);
  assert.deepEqual([...steps], [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]);

  for (const family of families) {
    assert.deepEqual(
      Object.keys(colors[family]).map(Number),
      [...steps],
      `${family} steps`,
    );
    assert.equal(colors[family], scales[family]);
  }
});

test("every value matches #RRGGBB", () => {
  for (const family of families) {
    for (const step of steps) {
      assert.match(colors[family][step], HEX, `${family} ${step}`);
    }
  }
  assert.match(black, HEX);
  assert.match(white, HEX);
  assert.equal(colors.black, black);
  assert.equal(colors.white, white);
});

test("every family matches the shared OKLCH L targets", () => {
  for (const family of families) {
    for (const step of steps) {
      const { l } = oklch(colors[family][step]);
      const target = LIGHTNESS[step];
      assert.ok(
        Math.abs(l - target) <= 0.4,
        `${family} ${step} OKLCH L ${l} is more than 0.4 from ${target}`,
      );
    }
  }
});

test("OKLCH L is monotonic within each family", () => {
  for (const family of families) {
    let previous = Number.POSITIVE_INFINITY;
    for (const step of steps) {
      const { l } = oklch(colors[family][step]);
      assert.ok(l < previous, `${family} ${step} OKLCH L ${l} is not below ${previous}`);
      previous = l;
    }
  }
});

test("gray chroma is 0", () => {
  for (const step of steps) {
    assert.equal(oklch(gray[step]).c, 0, `gray ${step}`);
  }
});

test("yellow chroma curve is not the same shape as blue", () => {
  const yellowC = steps.map((step) => oklch(yellow[step]).c);
  const blueC = steps.map((step) => oklch(blue[step]).c);
  const peak = (curve: number[]) => curve.indexOf(Math.max(...curve));

  assert.ok(peak(yellowC) < peak(blueC));
  assert.ok(yellowC[0] > blueC[0]);
  assert.ok(yellowC.at(-1)! < blueC.at(-1)!);

  const ratios = yellowC.map((chroma, index) => chroma / blueC[index]);
  const mean = ratios.reduce((sum, value) => sum + value, 0) / ratios.length;
  const deviation = Math.sqrt(
    ratios.reduce((sum, value) => sum + (value - mean) ** 2, 0) / ratios.length,
  );
  assert.ok(deviation / mean > 0.35, `chroma curves are too proportional (${deviation / mean})`);
});

test("colors.json and colors.css match the palette", () => {
  const json = JSON.parse(readFileSync(new URL("../src/colors.json", import.meta.url), "utf8"));
  const css = readFileSync(new URL("../src/colors.css", import.meta.url), "utf8");

  assert.deepEqual(json, JSON.parse(JSON.stringify(colors)));
  assert.match(css, CSS_FILE);
  assert.equal(css.match(/--color-/g)?.length, families.length * steps.length + 2);

  for (const family of families) {
    for (const step of steps) {
      assert.ok(css.includes(`--color-${family}-${step}: ${colors[family][step]};`));
    }
  }
  assert.ok(css.includes(`--color-black: ${black};`));
  assert.ok(css.includes(`--color-white: ${white};`));
  assert.doesNotMatch(css, /primary|surface|background|foreground|\btext\b|muted|accent|destructive/);
});

test("built package matches the source palette", async () => {
  const built = await import("../dist/index.js");
  const builtJson = JSON.parse(readFileSync(new URL("../dist/colors.json", import.meta.url), "utf8"));
  const builtCss = readFileSync(new URL("../dist/colors.css", import.meta.url), "utf8");

  assert.equal(built.blue[500], blue[500]);
  assert.equal(built.colors.pink[950], colors.pink[950]);
  assert.equal(built.black, black);
  assert.equal(built.white, white);
  assert.deepEqual(builtJson, JSON.parse(JSON.stringify(colors)));
  assert.equal(builtCss, readFileSync(new URL("../src/colors.css", import.meta.url), "utf8"));
});
