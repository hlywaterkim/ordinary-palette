import { colors, darkColors, families, steps } from "../src/palette.ts";

type Step = (typeof steps)[number];

const WHITE = "#ffffff";

function luminance(hex: string): number {
  const channel = (index: number) => {
    const value = Number.parseInt(hex.slice(index, index + 2), 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(1) + 0.7152 * channel(3) + 0.0722 * channel(5);
}

export function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

function firstStep(test: (step: Step) => boolean): string {
  const step = steps.find(test);
  return step === undefined ? "—" : String(step);
}

function inkOn(fill: string, dark: string, light: string): string {
  const onDark = contrast(fill, dark);
  const onLight = contrast(fill, light);
  return onDark >= onLight ? `dark ink ${onDark.toFixed(1)}:1` : `white ${onLight.toFixed(1)}:1`;
}

/** Markdown tables for the README "Using the steps" section, measured with WCAG 2 contrast. */
export function usageTables(): string {
  const chromatic = families.filter((family) => family !== "cool-gray" && family !== "neutral-gray");
  const lightInk = colors["cool-gray"][900];
  const darkSurface = darkColors["cool-gray"][50];
  const darkInk = darkColors["cool-gray"][50];

  const light = [
    "| Family | Text on white | White text on fill | 500 fill takes | Tint badge on 100 | Icon on white |",
    "| --- | --- | --- | --- | --- | --- |",
    ...chromatic.map((family) => {
      const scale = colors[family];
      return [
        family,
        firstStep((step) => contrast(scale[step], WHITE) >= 4.5),
        firstStep((step) => contrast(WHITE, scale[step]) >= 4.5),
        inkOn(scale[500], lightInk, WHITE),
        firstStep((step) => step > 100 && contrast(scale[step], scale[100]) >= 4.5),
        firstStep((step) => contrast(scale[step], WHITE) >= 3),
      ].join(" | ");
    }).map((row) => `| ${row} |`),
  ];

  const dark = [
    "| Family | Text on dark 50 | 500 fill takes | Tint badge on dark 100 |",
    "| --- | --- | --- | --- |",
    ...chromatic.map((family) => {
      const scale = darkColors[family];
      return [
        family,
        firstStep((step) => contrast(scale[step], darkSurface) >= 4.5),
        inkOn(scale[500], darkInk, WHITE),
        firstStep((step) => step > 100 && contrast(scale[step], scale[100]) >= 4.5),
      ].join(" | ");
    }).map((row) => `| ${row} |`),
  ];

  return `${light.join("\n")}\n\nDark scale, on a dark cool-gray 50 page:\n\n${dark.join("\n")}\n`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.stdout.write(usageTables());
}
