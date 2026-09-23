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
  return onDark >= onLight ? `어두운 글자 ${onDark.toFixed(1)}:1` : `흰 글자 ${onLight.toFixed(1)}:1`;
}

/** Markdown tables for the README usage guide section (스텝 사용 가이드), measured with WCAG 2 contrast. */
export function usageTables(): string {
  const chromatic = families.filter((family) => family !== "cool-gray" && family !== "neutral-gray");
  const lightInk = colors["cool-gray"][900];
  const darkSurface = darkColors["cool-gray"][50];
  const darkInk = darkColors["cool-gray"][50];

  const light = [
    "| 가족 | 흰 배경 위 글자 | 흰 글자를 올리는 채움색 | 500 채움색에 맞는 글자 | 100 틴트 위 뱃지 글자 | 흰 배경 위 아이콘 |",
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
    "| 가족 | 다크 50 위 글자 | 500 채움색에 맞는 글자 | 다크 100 틴트 위 뱃지 글자 |",
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

  return `${light.join("\n")}\n\n다크 스케일 (다크 cool-gray 50 배경):\n\n${dark.join("\n")}\n`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.stdout.write(usageTables());
}
