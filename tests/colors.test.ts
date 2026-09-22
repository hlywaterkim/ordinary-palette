import Color from "colorjs.io";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  blackOpacity,
  blue,
  cloudyBlue,
  colors,
  darkColors,
  darkGray,
  darkLightness,
  families,
  gray,
  opacitySteps,
  sourceChroma,
  sourceHue,
  steps,
  whiteOpacity,
  yellow,
  yellowLightnessOffset,
} from "../src/palette.ts";

const HEX = /^#[0-9a-f]{6}$/;
const ALPHA_HEX = /^#[0-9a-f]{8}$/;
const CSS_FILE =
  /^:root \{\n(?:  --color-[a-z0-9-]+-[0-9]+: #[0-9a-f]{6}(?:[0-9a-f]{2})?;\n)+\}\n$/;

function oklch(hex: string): { l: number; c: number; h: number } {
  const color = new Color(hex).to("oklch");
  return {
    l: color.get("oklch.l") * 100,
    c: color.get("oklch.c") ?? 0,
    h: color.get("oklch.h") ?? 0,
  };
}

function hueDelta(a: number, b: number): number {
  const delta = Math.abs(a - b) % 360;
  return Math.min(delta, 360 - delta);
}

function chromaLimit(family: (typeof families)[number], step: (typeof steps)[number]): number {
  return sourceChroma[family][String(step) as keyof (typeof sourceChroma)[typeof family]];
}

function hueIntent(family: (typeof families)[number], step: (typeof steps)[number]): number {
  return sourceHue[family][String(step) as keyof (typeof sourceHue)[typeof family]];
}

test("color families use steps 50–900 and no 950", () => {
  assert.deepEqual([...families], [
    "pink",
    "red",
    "orange",
    "yellow",
    "lime",
    "green",
    "teal",
    "cloudy-blue",
    "blue",
    "purple",
    "gray",
  ]);
  assert.deepEqual([...steps], [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]);
  assert.equal("950" in gray, false);
  assert.equal("indigo" in colors, false);
  assert.equal("violet" in colors, false);
});

test("solid colors are #RRGGBB", () => {
  for (const family of families) {
    for (const step of steps) {
      assert.match(colors[family][step], HEX, `light ${family} ${step}`);
      assert.match(darkColors[family][step], HEX, `dark ${family} ${step}`);
    }
  }
});

test("light families match gray OKLCH L, yellow uses an explicit offset", () => {
  for (const step of steps) {
    const target = oklch(gray[step]).l;
    const offset = yellowLightnessOffset[step];
    assert.ok(offset > 0, `yellow offset at ${step} should lighten that step`);

    for (const family of families) {
      const { l } = oklch(colors[family][step]);
      if (family === "yellow") {
        assert.ok(
          Math.abs(l - (target + offset)) <= 0.4,
          `yellow ${step} L ${l} is more than 0.4 from gray ${target} + ${offset}`,
        );
        assert.ok(l > target, `yellow ${step} should be lighter than gray`);
        continue;
      }
      assert.ok(
        Math.abs(l - target) <= 0.4,
        `${family} ${step} L ${l} is more than 0.4 from gray ${target}`,
      );
    }
  }
});

test("gamut mapping lowers chroma only", () => {
  for (const family of families) {
    for (const step of steps) {
      for (const hex of [colors[family][step], darkColors[family][step]]) {
        const measured = oklch(hex);
        assert.ok(
          measured.c <= chromaLimit(family, step) + 0.015,
          `${family} ${step} ${hex} chroma ${measured.c} exceeds source ${chromaLimit(family, step)}`,
        );
        if (measured.c <= 0.02) continue;
        const drift = hueDelta(measured.h, hueIntent(family, step));
        assert.ok(drift <= 8, `${family} ${step} ${hex} hue drifted ${drift}°`);
      }
    }
  }
});

test("dark L targets differ from light and have stronger contrast", () => {
  const lightLevels = steps.map((step) => oklch(gray[step]).l);
  const darkLevels = steps.map((step) => oklch(darkGray[step]).l);
  const gaps = (levels: number[]) => levels.slice(1).map((level, index) => levels[index] - level);

  for (const step of steps) {
    assert.ok(darkLightness[step] !== lightLevels[step]);
    assert.ok(Math.abs(darkLevels[steps.indexOf(step)] - darkLightness[step]) <= 0.4);
    for (const family of families) {
      const { l } = oklch(darkColors[family][step]);
      assert.ok(
        Math.abs(l - darkLightness[step]) <= 0.4,
        `dark ${family} ${step} L ${l} misses ${darkLightness[step]}`,
      );
      assert.notEqual(darkColors[family][step], colors[family][step]);
    }
  }

  const lightGaps = gaps(lightLevels);
  const darkGaps = gaps(darkLevels);
  const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;
  assert.ok(Math.min(...darkGaps) > Math.min(...lightGaps));
  assert.ok(mean(darkGaps) > mean(lightGaps));
});

test("opacity scales stay on their own names", () => {
  const alphas = [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
  const byte = (alpha: number) => Math.round(alpha * 255).toString(16).padStart(2, "0");
  for (const [index, step] of opacitySteps.entries()) {
    assert.equal(whiteOpacity[step], `#ffffff${byte(alphas[index])}`);
    assert.equal(blackOpacity[step], `#000000${byte(alphas[index])}`);
    assert.match(whiteOpacity[step], ALPHA_HEX);
  }
});

test("colors.json and colors.css match the palette", () => {
  const json = JSON.parse(readFileSync(new URL("../src/colors.json", import.meta.url), "utf8"));
  const css = readFileSync(new URL("../src/colors.css", import.meta.url), "utf8");
  const expected = { ...JSON.parse(JSON.stringify(colors)), dark: JSON.parse(JSON.stringify(darkColors)) };

  assert.deepEqual(json, expected);
  assert.match(css, CSS_FILE);
  assert.equal(css.includes("-950"), false);
  assert.equal(css.includes("--color-indigo-"), false);
  assert.ok(css.includes(`--color-blue-500: ${blue[500]};`));
  assert.ok(css.includes(`--color-dark-blue-500: ${darkColors.blue[500]};`));
  assert.ok(css.includes(`--color-cloudy-blue-500: ${cloudyBlue[500]};`));
  assert.ok(css.includes(`--color-dark-cloudy-blue-500: ${darkColors["cloudy-blue"][500]};`));
  assert.ok(css.includes(`--color-white-opacity-40: ${whiteOpacity["40"]};`));
  assert.doesNotMatch(css, /primary|surface|background|foreground|\btext\b|muted|accent|destructive/);
});

test("built package matches the source palette", async () => {
  const built = await import("../dist/index.js");
  assert.equal(built.yellow[900], yellow[900]);
  assert.equal(built.darkYellow[500], darkColors.yellow[500]);
  assert.equal(built.yellowLightnessOffset[900], 24);
  assert.equal(built.darkLightness[50], 94);
  assert.equal(
    readFileSync(new URL("../dist/colors.css", import.meta.url), "utf8"),
    readFileSync(new URL("../src/colors.css", import.meta.url), "utf8"),
  );
});
