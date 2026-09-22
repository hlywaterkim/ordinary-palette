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

function relativeLuminance(hex: string): number {
  const channel = (pair: string) => {
    const value = Number.parseInt(pair, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  const r = channel(hex.slice(1, 3));
  const g = channel(hex.slice(3, 5));
  const b = channel(hex.slice(5, 7));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
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

test("each step is darker than the previous step", () => {
  for (const family of families) {
    let previous = Number.POSITIVE_INFINITY;
    for (const step of steps) {
      const luminance = relativeLuminance(colors[family][step]);
      assert.ok(
        luminance < previous,
        `${family} ${step} luminance ${luminance} is not darker than ${previous}`,
      );
      previous = luminance;
    }
  }
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
