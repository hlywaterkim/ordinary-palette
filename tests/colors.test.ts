import Color from "colorjs.io";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  blackOpacity,
  blue,
  cloudyBlue,
  colors,
  coolGray,
  darkChromaLightnessExceptions,
  darkColors,
  darkCoolGray,
  darkLightness,
  darkYellow,
  darkYellowLightnessOffset,
  families,
  neutralGray,
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
    "cool-gray",
    "neutral-gray",
  ]);
  assert.deepEqual([...steps], [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]);
  assert.equal("950" in coolGray, false);
  assert.equal("gray" in colors, false);
  assert.equal("gray" in darkColors, false);
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

test("light families match cool-gray OKLCH L, yellow uses an explicit offset", () => {
  for (const step of steps) {
    const target = oklch(coolGray[step]).l;
    const offset = yellowLightnessOffset[step];
    assert.ok(offset > 0, `yellow offset at ${step} should lighten that step`);

    for (const family of families) {
      const { l } = oklch(colors[family][step]);
      if (family === "yellow") {
        assert.ok(
          Math.abs(l - (target + offset)) <= 0.4,
          `yellow ${step} L ${l} is more than 0.4 from cool-gray ${target} + ${offset}`,
        );
        assert.ok(l > target, `yellow ${step} should be lighter than cool-gray`);
        continue;
      }
      assert.ok(
        Math.abs(l - target) <= 0.4,
        `${family} ${step} L ${l} is more than 0.4 from cool-gray ${target}`,
      );
    }
  }
});

test("light yellow hue stays within 15° of step 50", () => {
  const reference = oklch(yellow[50]).h;
  for (const step of steps) {
    const measured = oklch(yellow[step]);
    const drift = hueDelta(measured.h, reference);
    assert.ok(drift <= 15, `yellow ${step} hue ${measured.h} is ${drift}° from step 50`);
    assert.ok(measured.c >= 0.008, `yellow ${step} chroma ${measured.c} is too weak to read as yellow`);
  }
  const darkest = oklch(yellow[900]);
  assert.ok(hueDelta(darkest.h, reference) <= 15);
  assert.ok(darkest.c >= 0.08, `yellow 900 chroma ${darkest.c} collapsed away from yellow`);
});

test("dark yellow lightness offset keeps 800 and 900 yellow", () => {
  const reference = oklch(yellow[50]).h;
  assert.ok(darkYellowLightnessOffset[800] > 0);
  assert.ok(darkYellowLightnessOffset[900] > 0);
  for (const step of steps) {
    const measured = oklch(darkYellow[step]);
    const raised = darkChromaLightnessExceptions.yellow[step];
    const target = raised ?? darkLightness[step] + darkYellowLightnessOffset[step];
    assert.ok(
      Math.abs(measured.l - target) <= 0.4,
      `dark yellow ${step} L ${measured.l} misses ${target}`,
    );
    assert.ok(
      hueDelta(measured.h, reference) <= 15,
      `dark yellow ${step} hue ${measured.h} drifted ${hueDelta(measured.h, reference)}°`,
    );
    assert.notEqual(darkYellow[step], yellow[step]);
  }
  for (const step of [800, 900] as const) {
    const measured = oklch(darkYellow[step]);
    assert.ok(measured.l >= 28, `dark yellow ${step} L ${measured.l} collapsed toward black`);
    assert.ok(measured.c >= 0.05, `dark yellow ${step} chroma ${measured.c} is too weak to read as yellow`);
  }
});

test("neutral-gray is chroma 0 at cool-gray lightness", () => {
  assert.equal("neutral-gray" in sourceHue, false);
  for (const step of steps) {
    assert.equal(neutralGray[step] === "#666666", false);
    assert.equal(sourceChroma["neutral-gray"][String(step) as "50"], 0);
    for (const hex of [colors["neutral-gray"][step], darkColors["neutral-gray"][step]]) {
      const measured = oklch(hex);
      const reference = hex === colors["neutral-gray"][step] ? coolGray[step] : darkCoolGray[step];
      assert.ok(measured.c < 0.001, `${hex} chroma ${measured.c} is not 0`);
      assert.ok(
        Math.abs(measured.l - oklch(reference).l) <= 0.4,
        `${hex} L ${measured.l} misses cool-gray ${oklch(reference).l}`,
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
        if (family === "neutral-gray" || family === "yellow" || measured.c <= 0.02) continue;
        const drift = hueDelta(measured.h, hueIntent(family, step));
        assert.ok(drift <= 8, `${family} ${step} ${hex} hue drifted ${drift}°`);
      }
    }
  }
});

test("dark L targets differ from light and have stronger contrast", () => {
  const lightLevels = steps.map((step) => oklch(coolGray[step]).l);
  const darkLevels = steps.map((step) => oklch(darkCoolGray[step]).l);
  const gaps = (levels: number[]) => levels.slice(1).map((level, index) => levels[index] - level);

  for (const step of steps) {
    assert.ok(darkLightness[step] !== lightLevels[step]);
    assert.ok(Math.abs(darkLevels[steps.indexOf(step)] - darkLightness[step]) <= 0.4);
    for (const family of families) {
      const { l } = oklch(darkColors[family][step]);
      const nominal =
        family === "neutral-gray"
          ? darkLevels[steps.indexOf(step)]
          : family === "yellow"
            ? darkLightness[step] + darkYellowLightnessOffset[step]
            : darkLightness[step];
      const raised = darkChromaLightnessExceptions[family]?.[step];
      const target = raised ?? nominal;
      assert.ok(
        Math.abs(l - target) <= 0.4,
        `dark ${family} ${step} L ${l} misses ${target}`,
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

test("dark chroma is at least 90% of light chroma", () => {
  const chromatic = families.filter((family) => family !== "cool-gray" && family !== "neutral-gray");
  let lowest = Number.POSITIVE_INFINITY;
  for (const family of chromatic) {
    for (const step of steps) {
      const lightChroma = oklch(colors[family][step]).c;
      const dark = oklch(darkColors[family][step]);
      const ratio = dark.c / lightChroma;
      lowest = Math.min(lowest, ratio);
      assert.ok(ratio >= 0.9, `${family} ${step} dark/light chroma ${ratio.toFixed(3)}`);
      const nominal =
        family === "yellow" ? darkLightness[step] + darkYellowLightnessOffset[step] : darkLightness[step];
      const raised = darkChromaLightnessExceptions[family][step];
      if (raised == null) {
        assert.ok(Math.abs(dark.l - nominal) <= 0.4, `${family} ${step} L ${dark.l} left ${nominal}`);
      } else {
        assert.ok(raised > nominal, `${family} ${step} exception ${raised} is not above ${nominal}`);
        assert.ok(Math.abs(dark.l - raised) <= 0.4, `${family} ${step} L ${dark.l} misses exception ${raised}`);
      }
      assert.notEqual(darkColors[family][step], colors[family][step]);
    }
  }
  assert.ok(lowest >= 0.9);
  assert.equal(darkChromaLightnessExceptions["cool-gray"], undefined);
  assert.equal(darkCoolGray[500], "#4f5a65");
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
  assert.ok(css.includes(`--color-cool-gray-500: ${coolGray[500]};`));
  assert.ok(css.includes(`--color-neutral-gray-500: ${neutralGray[500]};`));
  assert.ok(css.includes(`--color-dark-cool-gray-500: ${darkCoolGray[500]};`));
  assert.ok(css.includes(`--color-dark-neutral-gray-500: ${darkColors["neutral-gray"][500]};`));
  assert.equal(css.includes("--color-gray-"), false);
  assert.equal(css.includes("--color-dark-gray-"), false);
  assert.doesNotMatch(css, /primary|surface|background|foreground|\btext\b|muted|accent|destructive/);
});

test("built package matches the source palette", async () => {
  const built = await import("../dist/index.js");
  assert.equal(built.yellow[900], yellow[900]);
  assert.equal(built.coolGray[500], "#84919d");
  assert.equal(built.darkCoolGray[500], "#4f5a65");
  assert.equal(built.neutralGray[500], neutralGray[500]);
  assert.equal("gray" in built, false);
  assert.equal(built.darkYellow[500], darkColors.yellow[500]);
  assert.equal(built.yellowLightnessOffset[900], 24);
  assert.equal(built.darkLightness[50], 94);
  assert.equal(
    readFileSync(new URL("../dist/colors.css", import.meta.url), "utf8"),
    readFileSync(new URL("../src/colors.css", import.meta.url), "utf8"),
  );
});
