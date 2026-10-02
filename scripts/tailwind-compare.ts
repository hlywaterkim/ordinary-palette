import Color from "colorjs.io";
import { readFileSync } from "node:fs";
import { colors, families, steps } from "../src/palette.ts";
import { contrast, lightnessChroma } from "./usage-table.ts";

// Compares the shared lightness curve with Tailwind CSS v4's default colors. Tailwind's values are read from the
// installed devDependency at build time, so no Tailwind color is copied into this repository.

type Step = (typeof steps)[number];

/** Tailwind's chromatic families (its gray scales are left out, as ours are). */
export const TAILWIND_FAMILIES = [
  "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan",
  "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose",
] as const;
export const TAILWIND_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export type TailwindFamily = (typeof TAILWIND_FAMILIES)[number];
export type TailwindStep = (typeof TAILWIND_STEPS)[number];

export const OWN_CHROMATIC = families.filter((family) => family !== "cool-gray" && family !== "neutral-gray");

const theme = readFileSync(new URL("../node_modules/tailwindcss/theme.css", import.meta.url), "utf8");
const tailwindColors = new Map<string, string>();
for (const [, name, step, value] of theme.matchAll(/--color-([a-z]+)-(\d+): (oklch\([^)]*\));/g)) {
  tailwindColors.set(`${name}-${step}`, value);
}

function tailwindValue(family: TailwindFamily, step: TailwindStep): string {
  const value = tailwindColors.get(`${family}-${step}`);
  if (!value) throw new Error(`tailwindcss theme.css has no ${family}-${step}`);
  return value;
}

/** OKLCH lightness (0–100) as Tailwind authored it. */
export function tailwindLightness(family: TailwindFamily, step: TailwindStep): number {
  return new Color(tailwindValue(family, step)).to("oklch").l * 100;
}

/** The sRGB hex a browser without wide gamut would show. */
export function tailwindHex(family: TailwindFamily, step: TailwindStep): string {
  return new Color(tailwindValue(family, step)).to("srgb").toGamut({ method: "css" }).toString({ format: "hex" });
}

export function tailwindVersion(): string {
  return (JSON.parse(readFileSync(new URL("../node_modules/tailwindcss/package.json", import.meta.url), "utf8")) as { version: string }).version;
}

function spread(values: number[]): number {
  return Math.max(...values) - Math.min(...values);
}

/** Lightness gap between the lightest and darkest family at a step, without yellow (ours is brighter on purpose). */
export function tailwindSpread(step: TailwindStep): number {
  return spread(TAILWIND_FAMILIES.filter((family) => family !== "yellow").map((family) => tailwindLightness(family, step)));
}

export function ownSpread(step: Step): number {
  return spread(OWN_CHROMATIC.filter((family) => family !== "yellow").map((family) => lightnessChroma(colors[family][step]).l));
}

const withoutYellow = <T extends string>(list: readonly T[]) => list.filter((family) => family !== "yellow");

function whiteTextCount(step: Step): [number, number] {
  const tailwind = withoutYellow(TAILWIND_FAMILIES).filter((family) => contrast(tailwindHex(family, step), "#ffffff") >= 4.5).length;
  const own = withoutYellow(OWN_CHROMATIC).filter((family) => contrast(colors[family][step], "#ffffff") >= 4.5).length;
  return [tailwind, own];
}

type Language = "ko" | "en";

/** The Markdown the README shows under the comparison chart, measured from both palettes. */
export function compareTable(language: Language): string {
  const ko = language === "ko";
  const rows = steps.map((step) => `| ${step} | ${tailwindSpread(step).toFixed(1)} | ${ownSpread(step).toFixed(1)} |`);
  const [tailwind, own] = whiteTextCount(600);
  const total = [withoutYellow(TAILWIND_FAMILIES).length, withoutYellow(OWN_CHROMATIC).length];
  return [
    ko ? "| 스텝 | Tailwind CSS | Ordinary Palette |" : "| Step | Tailwind CSS | Ordinary Palette |",
    "| --- | --- | --- |",
    ...rows,
    "",
    ko
      ? "표는 같은 스텝에서 가장 밝은 색과 가장 어두운 색의 명도(OKLCH L) 차이입니다. yellow는 둘 다 뺐고, 작을수록 컬러가 바뀌어도 같은 밝기로 보입니다."
      : "The table shows the lightness (OKLCH L) gap between the lightest and darkest color at each step. Yellow is left out of both, and a smaller gap means the same step looks equally bright across colors.",
    "",
    ko
      ? `그래서 같은 스텝의 대비도 비슷합니다. 600 위에 흰 글자를 올렸을 때 4.5:1을 넘는 컬러는 Tailwind ${tailwind}/${total[0]}개, Ordinary ${own}/${total[1]}개입니다(yellow 제외).`
      : `That keeps contrast steady across colors too. White text on a 600 fill reaches 4.5:1 in ${tailwind} of ${total[0]} Tailwind colors and ${own} of ${total[1]} Ordinary colors (yellow excluded).`,
    "",
  ].join("\n");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.stdout.write(`${compareTable("ko")}\n${compareTable("en")}`);
}
