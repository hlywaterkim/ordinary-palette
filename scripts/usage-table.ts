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

type Family = (typeof families)[number];
export type Vision = "protan" | "deutan" | "tritan";

export const VISION_LABEL: Record<Vision, string> = {
  protan: "적색약 (protan)",
  deutan: "녹색약 (deutan)",
  tritan: "청색약 (tritan)",
};

// Machado, Oliveira & Fernandes (2009), severity 1.0, applied in linear sRGB.
const VISION_MATRIX: Record<Vision, number[]> = {
  protan: [0.152286, 1.052583, -0.204868, 0.114503, 0.786281, 0.099216, -0.003882, -0.048116, 1.051998],
  deutan: [0.367322, 0.860646, -0.227968, 0.280085, 0.672501, 0.047413, -0.01182, 0.04294, 0.968881],
  tritan: [1.255528, -0.076749, -0.178779, -0.078411, 0.930809, 0.147602, 0.004733, 0.691367, 0.3039],
};

function linearRgb(hex: string): number[] {
  return [1, 3, 5].map((index) => {
    const value = Number.parseInt(hex.slice(index, index + 2), 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
}

function oklab([r, g, b]: number[]): number[] {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function seen(hex: string, vision?: Vision): number[] {
  const rgb = linearRgb(hex);
  if (!vision) return rgb;
  const m = VISION_MATRIX[vision];
  return [0, 1, 2].map((row) => Math.min(1, Math.max(0, m[row * 3] * rgb[0] + m[row * 3 + 1] * rgb[1] + m[row * 3 + 2] * rgb[2])));
}

/** The hex a viewer with the given vision sees for a color. */
export function simulate(hex: string, vision: Vision): string {
  const encode = (value: number) => (value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055);
  return `#${seen(hex, vision)
    .map((value) => Math.round(encode(value) * 255).toString(16).padStart(2, "0"))
    .join("")}`;
}

/** OKLab distance between two colors as a viewer with the given vision sees them. */
export function visionDistance(a: string, b: string, vision?: Vision): number {
  const [x, y] = [oklab(seen(a, vision)), oklab(seen(b, vision))];
  return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]);
}

const chromaticFamilies = families.filter((family) => family !== "cool-gray" && family !== "neutral-gray");
const visions = Object.keys(VISION_MATRIX) as Vision[];

function ratio(a: string, b: string): string {
  return `${contrast(a, b).toFixed(1)}:1`;
}

/** "쓸 때 알아둘 점" examples with live contrast numbers. */
export function cautionExamples(): string {
  const ink = colors["cool-gray"][900];
  const lightFamilies = (["orange", "yellow", "light-green", "cyan", "light-blue"] as const).filter((f) => chromaticFamilies.includes(f));
  const fillRows = lightFamilies.map((f) => `| ${f} 500 \`${colors[f][500]}\` | ✅ 어두운 글자 ${ratio(colors[f][500], ink)} | ❌ 흰 글자 ${ratio(colors[f][500], WHITE)} |`);
  const mid = (["pink", "red", "purple"] as const).map(
    (f) => `| ${f} | ⚠️ 500 \`${colors[f][500]}\` + 흰 글자 ${ratio(colors[f][500], WHITE)} | ✅ 600 \`${colors[f][600]}\` + 흰 글자 ${ratio(colors[f][600], WHITE)} |`,
  );
  const icon = lightFamilies.filter((f) => f !== "yellow").map(
    (f) => `| ${f} | ❌ 500 ${ratio(colors[f][500], WHITE)} | ✅ 600 ${ratio(colors[f][600], WHITE)} |`,
  );
  const yellowRows = ([500, 700, 800, 900] as const).map(
    (s) => `| yellow ${s} \`${colors.yellow[s]}\` | ${contrast(colors.yellow[s], WHITE) >= 4.5 ? "✅" : "❌"} ${ratio(colors.yellow[s], WHITE)} | ${contrast(colors.yellow[s], colors.yellow[100]) >= 4.5 ? "✅" : "❌"} ${ratio(colors.yellow[s], colors.yellow[100])} |`,
  );
  const tint = ["pink/red", "light-blue/blue", "cyan/light-blue"].map((pair) => {
    const [a, b] = pair.split("/") as [Family, Family];
    return `| ${pair} | 100끼리 ΔE ${visionDistance(colors[a][100], colors[b][100]).toFixed(3)} | 500끼리 ΔE ${visionDistance(colors[a][500], colors[b][500]).toFixed(3)} |`;
  });
  return [
    "**1. 밝은 가족의 500 채움색에는 어두운 글자를 올립니다.** 어두운 글자는 cool-gray 900입니다.",
    "",
    "| 채움색 | 어두운 글자 | 흰 글자 |",
    "| --- | --- | --- |",
    ...fillRows,
    "",
    "**2. pink·red·purple의 흰 글자 버튼은 600부터 씁니다.** 500은 크고 굵은 글자(3:1)에만 씁니다.",
    "",
    "| 가족 | 500 | 600 |",
    "| --- | --- | --- |",
    ...mid,
    "",
    "**3. 흰 배경 위 단독 아이콘은 600 이상을 씁니다.** 아이콘은 3:1이 기준입니다.",
    "",
    "| 가족 | 500 아이콘 | 600 아이콘 |",
    "| --- | --- | --- |",
    ...icon,
    "",
    "**4. yellow를 글자로 쓸 때는 900만 씁니다.**",
    "",
    "| 글자 | 흰 배경 위 | yellow 100 위 |",
    "| --- | --- | --- |",
    ...yellowRows,
    "",
    "**5. 50·100 틴트만으로 카테고리를 구분하지 않습니다.** 옅은 틴트는 가족끼리 거의 같아 보입니다(ΔE 0.03 미만). 틴트 위에 700–800 글자나 아이콘을 함께 올립니다.",
    "",
    "| 가족 | 틴트 | 채움색 |",
    "| --- | --- | --- |",
    ...tint,
    "",
  ].join("\n");
}

/** Pairs that color-vision simulations pull together at 500, plus a chart order that stays apart. */
export function visionTable(): string {
  const threshold = 0.07;
  const closePairs = (vision?: Vision) => {
    const close: string[] = [];
    for (let i = 0; i < chromaticFamilies.length; i += 1) {
      for (let j = i + 1; j < chromaticFamilies.length; j += 1) {
        const [a, b] = [chromaticFamilies[i], chromaticFamilies[j]];
        const distance = visionDistance(colors[a][500], colors[b][500], vision);
        if (distance < threshold) close.push(`${a}/${b} ${distance.toFixed(3)}`);
      }
    }
    return close.join(", ") || "없음";
  };
  const rows = [`| 정상 시각 | ${closePairs()} |`, ...visions.map((vision) => `| ${VISION_LABEL[vision]} | ${closePairs(vision)} |`)];
  const worst = (a: Family, b: Family) =>
    Math.min(visionDistance(colors[a][500], colors[b][500]), ...visions.map((v) => visionDistance(colors[a][500], colors[b][500], v)));
  const order: Family[] = ["blue"];
  while (order.length < 6) {
    const next = chromaticFamilies
      .filter((f) => !order.includes(f))
      .map((f) => ({ f, score: Math.min(...order.map((o) => worst(f, o))) }))
      .sort((x, y) => y.score - x.score)[0];
    order.push(next.f);
  }
  const floor = (count: number) => {
    const picked = order.slice(0, count);
    return Math.min(...picked.flatMap((a, i) => picked.slice(i + 1).map((b) => worst(a, b)))).toFixed(3);
  };
  return [
    "| 시뮬레이션 | 500에서 헷갈리는 조합 (ΔE OK 0.07 미만) |",
    "| --- | --- |",
    ...rows,
    "",
    `차트처럼 색만으로 구분해야 할 때 쓰기 좋은 500 순서: ${order.join(" → ")}. 앞에서부터 고르면 정상 시각과 세 가지 시뮬레이션 모두에서 서로 떨어진 최소 거리가 4색 ΔE ${floor(4)}, 5색 ${floor(5)}, 6색 ${floor(6)}입니다. 0.07보다 작아지는 개수부터는 색 외에 모양이나 라벨을 함께 씁니다.`,
    "",
  ].join("\n");
}

/** Element-to-step examples for a sample screen, with contrast against what sits behind each element. */
export function screenTable(): string {
  const light = colors;
  const dark = darkColors;
  type Row = [string, string, string, string, string];
  const rows: Row[] = [
    ["페이지 배경", "white", WHITE, "dark cool-gray 50", dark["cool-gray"][50]],
    ["카드 배경", "cool-gray 50", light["cool-gray"][50], "dark cool-gray 100", dark["cool-gray"][100]],
    ["카드 테두리", "cool-gray 200", light["cool-gray"][200], "dark cool-gray 200", dark["cool-gray"][200]],
    ["제목", "cool-gray 900", light["cool-gray"][900], "dark cool-gray 900", dark["cool-gray"][900]],
    ["본문", "cool-gray 700", light["cool-gray"][700], "dark cool-gray 800", dark["cool-gray"][800]],
    ["보조 글자", "cool-gray 600", light["cool-gray"][600], "dark cool-gray 700", dark["cool-gray"][700]],
    ["입력창 테두리", "cool-gray 500", light["cool-gray"][500], "dark cool-gray 500", dark["cool-gray"][500]],
    ["링크", "blue 700", light.blue[700], "dark blue 700", dark.blue[700]],
    ["오류 문구", "red 600", light.red[600], "dark red 700", dark.red[700]],
  ];
  const lines = rows.map(([role, ls, lh, ds, dh]) => {
    const behindLight = role === "페이지 배경" || role === "카드 배경" ? "" : ` (${ratio(lh, light["cool-gray"][50])})`;
    const behindDark = role === "페이지 배경" || role === "카드 배경" ? "" : ` (${ratio(dh, dark["cool-gray"][100])})`;
    return `| ${role} | ${ls} \`${lh}\`${behindLight} | ${ds} \`${dh}\`${behindDark} |`;
  });
  const pairs: Array<[string, string, string, string, string, string, string]> = [
    ["기본 버튼", "blue 600 + 흰 글자", light.blue[600], WHITE, "dark blue 500 + 어두운 글자", dark.blue[500], dark["cool-gray"][50]],
    ["성공 뱃지", "green 100 + green 800", light.green[100], light.green[800], "dark green 100 + dark green 700", dark.green[100], dark.green[700]],
    ["경고 배너", "yellow 100 + yellow 900", light.yellow[100], light.yellow[900], "dark yellow 100 + dark yellow 700", dark.yellow[100], dark.yellow[700]],
    ["오류 배너", "red 100 + red 800", light.red[100], light.red[800], "dark red 100 + dark red 700", dark.red[100], dark.red[700]],
  ];
  const pairLines = pairs.map(([role, l, lb, lt, d, db, dt]) => `| ${role} | ${l} (${ratio(lb, lt)}) | ${d} (${ratio(db, dt)}) |`);
  return [
    "| 요소 | 라이트 (카드 배경 대비) | 다크 (카드 배경 대비) |",
    "| --- | --- | --- |",
    ...lines,
    ...pairLines,
    "",
  ].join("\n");
}

/** Every generated block the README must contain. */
export function guideBlocks(): string[] {
  return [usageTables(), cautionExamples(), visionTable(), screenTable()];
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [usage, caution, vision, screen] = guideBlocks();
  process.stdout.write(`<!-- usage -->\n${usage}\n<!-- caution -->\n${caution}\n<!-- vision -->\n${vision}\n<!-- screen -->\n${screen}`);
}
