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
  darkColors,
  darkCoolGray,
  darkLightness,
  darkSourceChroma,
  darkSourceHue,
  darkYellow,
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

function darkChromaLimit(family: (typeof families)[number], step: (typeof steps)[number]): number {
  if (!(family in darkSourceChroma)) return chromaLimit(family, step);
  return darkSourceChroma[family as keyof typeof darkSourceChroma][String(step) as "50"];
}

function darkHueIntent(family: (typeof families)[number], step: (typeof steps)[number]): number {
  return darkSourceHue[family as keyof typeof darkSourceHue][String(step) as "50"];
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

test("lightness falls from 50 to 900 and chroma humps", () => {
  for (const family of families) {
    const levels = steps.map((step) => oklch(colors[family][step]).l);
    assert.ok(levels[0] > levels[5], `${family} 50 should be lighter than 500`);
    assert.ok(levels[5] > levels[9], `${family} 500 should be lighter than 900`);
    for (let index = 1; index < levels.length; index += 1) {
      assert.ok(
        levels[index - 1] > levels[index],
        `${family} ${steps[index]} L ${levels[index]} is not darker than ${steps[index - 1]}`,
      );
    }
  }

  const chromatic = families.filter((family) => family !== "cool-gray" && family !== "neutral-gray");
  for (const step of [50, 100, 200] as const) {
    const target = oklch(blue[step]).l;
    for (const family of chromatic) {
      const { l } = oklch(colors[family][step]);
      assert.ok(Math.abs(l - target) <= 0.4, `${family} ${step} L ${l} misses shared pale ${target}`);
    }
    assert.equal(yellowLightnessOffset[step], 0);
  }

  for (const step of [400, 500, 600, 700, 800, 900] as const) {
    const yellowL = oklch(yellow[step]).l;
    const blueL = oklch(blue[step]).l;
    assert.ok(yellowL > blueL + 8, `yellow ${step} L ${yellowL} should stay lighter than blue ${blueL}`);
    assert.ok(
      Math.abs(yellowL - (blueL + yellowLightnessOffset[step])) <= 0.4,
      `yellow ${step} L ${yellowL} misses blue ${blueL} + ${yellowLightnessOffset[step]}`,
    );
  }
  assert.ok(yellowLightnessOffset[900] > yellowLightnessOffset[400]);

  const blueLevels = steps.map((step) => oklch(blue[step]).l);
  const grayLevels = steps.map((step) => oklch(coolGray[step]).l);
  assert.ok(blueLevels[0] - blueLevels[5] > blueLevels[5] - blueLevels[9]);
  for (const levels of [blueLevels, grayLevels]) {
    const gaps = levels.slice(1).map((level, index) => levels[index] - level);
    const early = (gaps[2] + gaps[3] + gaps[4]) / 3;
    const late = (gaps[5] + gaps[6] + gaps[7] + gaps[8]) / 4;
    assert.ok(gaps.indexOf(Math.max(...gaps)) < 5, `the largest drop should land before 500`);
    assert.ok(late < early, `steps after 500 (${late}) should be closer than the drop before 500 (${early})`);
  }

  const blueChroma = (step: (typeof steps)[number]) => oklch(blue[step]).c;
  assert.ok(blueChroma(500) > blueChroma(50));
  assert.ok(blueChroma(500) > blueChroma(900));
  assert.ok(blueChroma(900) > blueChroma(50));

  const yellow900 = oklch(yellow[900]);
  const blue900 = oklch(blue[900]);
  assert.ok(hueDelta(yellow900.h, oklch(yellow[50]).h) <= 15);
  assert.ok(yellow900.l > blue900.l + 12, `yellow 900 L ${yellow900.l} should be clearly above blue 900 L ${blue900.l}`);
  assert.ok(oklch(coolGray[900]).l + 12 < blue900.l);
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

test("dark yellow stays yellow and lighter than blue", () => {
  const reference = oklch(yellow[50]).h;
  for (const step of steps) {
    const measured = oklch(darkYellow[step]);
    assert.ok(
      hueDelta(measured.h, reference) <= 15,
      `dark yellow ${step} hue ${measured.h} drifted ${hueDelta(measured.h, reference)}°`,
    );
    assert.notEqual(darkYellow[step], yellow[step]);
  }
  for (const step of [400, 500, 600] as const) {
    const yellowL = oklch(darkYellow[step]).l;
    const blueL = oklch(darkColors.blue[step]).l;
    assert.ok(yellowL > blueL + 8, `dark yellow ${step} L ${yellowL} should stay lighter than dark blue ${blueL}`);
  }
});

test("gray keeps a dense pale end for surfaces and borders", () => {
  const levels = steps.map((step) => oklch(coolGray[step]).l);
  assert.ok(levels[0] >= 97.5, `cool-gray 50 L ${levels[0]} should be near white`);
  assert.ok(levels.filter((level) => level >= 93).length >= 3, `cool-gray needs three steps at L 93 or above`);
  assert.ok(levels[0] - levels[1] < levels[1] - levels[2], `cool-gray 50–200 should open up gradually`);
  assert.ok(levels[9] <= 25, `cool-gray 900 L ${levels[9]} should stay a dark text gray`);
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
      for (const [hex, dark] of [[colors[family][step], false], [darkColors[family][step], true]] as const) {
        const measured = oklch(hex);
        const limit = dark ? darkChromaLimit(family, step) : chromaLimit(family, step);
        assert.ok(
          measured.c <= limit + 0.015,
          `${family} ${step} ${hex} chroma ${measured.c} exceeds source ${limit}`,
        );
        if (family === "neutral-gray" || family === "cool-gray" || measured.c <= 0.02) continue;
        if (!dark && family === "yellow") continue;
        const intent = dark ? darkHueIntent(family, step) : hueIntent(family, step);
        const drift = hueDelta(measured.h, intent);
        assert.ok(drift <= 8, `${family} ${step} ${hex} hue drifted ${drift}°`);
      }
    }
  }
});

test("dark scale rises from a tinted dark 50 to a pale 900", () => {
  for (const family of families) {
    const levels = steps.map((step) => oklch(darkColors[family][step]).l);
    for (let index = 1; index < steps.length; index += 1) {
      assert.ok(levels[index] > levels[index - 1], `dark ${family} ${steps[index]} does not rise above ${steps[index - 1]}`);
    }
    assert.ok(levels[0] <= 33, `dark ${family} 50 L ${levels[0]} is not a dark surface`);
    assert.ok(levels[9] >= 90, `dark ${family} 900 L ${levels[9]} is not a pale tint`);
    for (const step of steps) {
      assert.notEqual(darkColors[family][step], colors[family][step]);
    }
  }

  for (const step of steps) {
    assert.ok(Math.abs(oklch(darkCoolGray[step]).l - darkLightness[step]) <= 0.4);
  }

  const chromatic = families.filter((family) => family !== "cool-gray" && family !== "neutral-gray");
  for (const family of chromatic) {
    const light = oklch(colors[family][500]).l;
    const dark = oklch(darkColors[family][500]).l;
    assert.ok(Math.abs(dark - light) <= 4, `dark ${family} 500 L ${dark} strays from light 500 L ${light}`);
  }
  for (const step of [50, 100, 200] as const) {
    const target = oklch(darkColors.blue[step]).l;
    for (const family of chromatic) {
      const { l } = oklch(darkColors[family][step]);
      assert.ok(Math.abs(l - target) <= 0.4, `dark ${family} ${step} L ${l} misses shared ${target}`);
    }
  }
});

test("dark peak chroma is at least 90% of light peak chroma", () => {
  const chromatic = families.filter((family) => family !== "cool-gray" && family !== "neutral-gray");
  for (const family of chromatic) {
    const peak = (scale: Record<(typeof steps)[number], string>) => {
      const chroma = steps.map((step) => oklch(scale[step]).c);
      const mid = Math.max(chroma[4], chroma[5], chroma[6]);
      assert.equal(Math.max(...chroma), mid, `${family} chroma should peak in 400–600`);
      return mid;
    };
    const ratio = peak(darkColors[family]) / peak(colors[family]);
    assert.ok(ratio >= 0.9, `${family} dark/light peak chroma ${ratio.toFixed(3)}`);
  }
});

test("steps after 500 stay apart and keep their chroma", () => {
  const chromatic = families.filter((family) => family !== "cool-gray" && family !== "neutral-gray");
  for (const family of chromatic) {
    for (const [label, scale, sign] of [["light", colors[family], 1], ["dark", darkColors[family], -1]] as const) {
      const levels = steps.map((step) => oklch(scale[step]).l);
      for (let index = 6; index < steps.length; index += 1) {
        const gap = (levels[index - 1] - levels[index]) * sign;
        assert.ok(gap >= 3.4, `${label} ${family} ${steps[index]} is only ${gap.toFixed(2)} L from ${steps[index - 1]}`);
      }
      const span = (levels[5] - levels[9]) * sign;
      assert.ok(span >= 15.5, `${label} ${family} 500→900 spans only ${span.toFixed(2)} L`);
    }

    const chroma = steps.map((step) => oklch(colors[family][step]).c);
    const peak = Math.max(chroma[4], chroma[5], chroma[6]);
    assert.equal(Math.max(...chroma), peak, `${family} chroma should peak in 400–600`);
    assert.ok(chroma[9] >= peak * 0.62, `${family} 900 chroma ${chroma[9]} fell below 62% of peak ${peak}`);
  }
});

test("blue, red, and orange reach the reference peak chroma", () => {
  // Lowest peak among SEED, Toss TDS, and Montage for the same hue.
  const floor = { blue: 0.198, red: 0.219, orange: 0.176 } as const;
  for (const [family, minimum] of Object.entries(floor) as Array<[keyof typeof floor, number]>) {
    const peak = Math.max(...steps.map((step) => oklch(colors[family][step]).c));
    assert.ok(peak >= minimum, `${family} peak chroma ${peak.toFixed(3)} is below ${minimum}`);
  }
});

test("dark step 50 is a tinted dark surface", () => {
  for (const family of families) {
    const { l, c } = oklch(darkColors[family][50]);
    assert.ok(l >= 20 && l <= 33, `dark ${family} 50 L ${l} is not a dark surface`);
    if (family !== "cool-gray" && family !== "neutral-gray") {
      assert.ok(c >= 0.02, `dark ${family} 50 chroma ${c} is too gray to carry its family`);
    }
  }
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
  assert.equal(built.coolGray[500], coolGray[500]);
  assert.equal(built.darkCoolGray[500], darkCoolGray[500]);
  assert.equal(built.neutralGray[500], neutralGray[500]);
  assert.equal("gray" in built, false);
  assert.equal(built.darkYellow[500], darkColors.yellow[500]);
  assert.equal(built.yellowLightnessOffset[900], yellowLightnessOffset[900]);
  assert.equal(built.yellowLightnessOffset[50], 0);
  assert.equal(built.darkLightness[50], darkLightness[50]);
  assert.equal(
    readFileSync(new URL("../dist/colors.css", import.meta.url), "utf8"),
    readFileSync(new URL("../src/colors.css", import.meta.url), "utf8"),
  );
});
