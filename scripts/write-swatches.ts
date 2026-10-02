import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { colors, darkColors, families, steps } from "../src/palette.ts";
import {
  OWN_CHROMATIC,
  TAILWIND_FAMILIES,
  TAILWIND_STEPS,
  ownSpread,
  tailwindHex,
  tailwindLightness,
  tailwindSpread,
  tailwindVersion,
} from "./tailwind-compare.ts";
import { ASSETS_URL, contrast, lightnessChroma, simulate, VISION_LABEL, type Vision } from "./usage-table.ts";

// SVG swatches for the README. GitHub strips inline styles, so the README shows color through these images.
// They are built into docs/ (ignored by git) and published on the assets branch by scripts/update-assets.sh,
// so main holds only the palette.

export { ASSETS_URL };

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FONT = "ui-sans-serif, system-ui, -apple-system, 'Apple SD Gothic Neo', sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const DARK_INK = "#1c2023";
const LIGHT_INK = "#f7f8fa";

type Scale = Record<(typeof steps)[number], string>;

function ink(fill: string): string {
  return contrast(fill, DARK_INK) >= contrast(fill, LIGHT_INK) ? DARK_INK : LIGHT_INK;
}

/**
 * Path data for a rounded rectangle with Figma-style corner smoothing (0.6 is Figma's iOS preset, Apple's squircle).
 * A short circular arc sits between two Bézier curves that ease the curvature in over (1 + smoothing) × radius along
 * each edge. Same construction as the cover and as figma-squircle.
 */
function squircle(x: number, y: number, width: number, height: number, radius: number, smoothing = 0.6): string {
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const budget = Math.min(width, height) / 2;
  const r = Math.min(radius, budget);
  const sm = Math.max(0, Math.min(smoothing, budget / r - 1));
  const p = Math.min((1 + sm) * r, budget);
  const arcMeasure = 90 * (1 - sm);
  const arc = Math.sin(rad(arcMeasure / 2)) * r * Math.SQRT2;
  const alpha = (90 - arcMeasure) / 2;
  const p3ToP4 = r * Math.tan(rad(alpha / 2));
  const beta = 45 * sm;
  const c = p3ToP4 * Math.cos(rad(beta));
  const d = c * Math.tan(rad(beta));
  const b = (p - arc - c - d) / 3;
  const a = 2 * b;
  const n = (v: number) => String(Math.round(v * 100) / 100);
  const rel = (...v: number[]) => v.map(n).join(" ");
  return [
    `M${rel(x + width - p, y)}`,
    `c${rel(a, 0, a + b, 0, a + b + c, d)}`,
    `a${rel(r, r)} 0 0 1 ${rel(arc, arc)}`,
    `c${rel(d, c, d, b + c, d, a + b + c)}`,
    `L${rel(x + width, y + height - p)}`,
    `c${rel(0, a, 0, a + b, -d, a + b + c)}`,
    `a${rel(r, r)} 0 0 1 ${rel(-arc, arc)}`,
    `c${rel(-c, d, -(b + c), d, -(a + b + c), d)}`,
    `L${rel(x + p, y + height)}`,
    `c${rel(-a, 0, -(a + b), 0, -(a + b + c), -d)}`,
    `a${rel(r, r)} 0 0 1 ${rel(-arc, -arc)}`,
    `c${rel(-d, -c, -d, -(b + c), -d, -(a + b + c))}`,
    `L${rel(x, y + p)}`,
    `c${rel(0, -a, 0, -(a + b), d, -(a + b + c))}`,
    `a${rel(r, r)} 0 0 1 ${rel(arc, -arc)}`,
    `c${rel(c, -d, b + c, -d, a + b + c, -d)}`,
    "Z",
  ].join("");
}

/** A filled rounded rectangle with smoothed corners; children (like a <title>) go inside the path. */
function roundedRect(x: number, y: number, width: number, height: number, radius: number, fill: string, inner = ""): string {
  const d = squircle(x, y, width, height, radius);
  return inner ? `<path d="${d}" fill="${fill}">${inner}</path>` : `<path d="${d}" fill="${fill}"/>`;
}

function svg(width: number, height: number, body: string, background: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n${roundedRect(0, 0, width, height, 12, background)}\n${body}</svg>\n`;
}

function paletteGrid(scales: Record<string, Scale>, background: string, label: string): string {
  const left = 112;
  const cell = 74;
  const rowHeight = 52;
  const top = 44;
  const gap = 4;
  const width = left + steps.length * cell + 16;
  const height = top + families.length * rowHeight + 12;
  const labelInk = ink(background);
  const parts = [
    `<text x="16" y="26" font-family="${FONT}" font-size="13" font-weight="700" fill="${labelInk}">${label}</text>`,
    ...steps.map(
      (step, index) =>
        `<text x="${left + index * cell + (cell - gap) / 2}" y="26" text-anchor="middle" font-family="${MONO}" font-size="11" fill="${labelInk}" opacity="0.7">${step}</text>`,
    ),
  ];
  families.forEach((family, row) => {
    const y = top + row * rowHeight;
    parts.push(
      `<text x="16" y="${y + rowHeight / 2 + 2}" font-family="${FONT}" font-size="12" font-weight="600" fill="${labelInk}">${family}</text>`,
    );
    steps.forEach((step, index) => {
      const fill = scales[family][step];
      const x = left + index * cell;
      parts.push(
        roundedRect(x, y, cell - gap, rowHeight - gap, 6, fill),
        `<text x="${x + 7}" y="${y + rowHeight - gap - 9}" font-family="${MONO}" font-size="10" fill="${ink(fill)}">${fill}</text>`,
      );
    });
  });
  return svg(width, height, `${parts.join("\n")}\n`, background);
}

function familyStrip(family: (typeof families)[number]): string {
  const cell = 28;
  const height = 22;
  const body = steps
    .map((step, index) => {
      const x = index * cell;
      const last = index === steps.length - 1;
      return `<rect x="${x}" y="0" width="${last ? cell : cell + 1}" height="${height}" fill="${colors[family][step]}"/>`;
    })
    .join("\n");
  const width = steps.length * cell;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n<clipPath id="r"><path d="${squircle(0, 0, width, height, 5)}"/></clipPath>\n<g clip-path="url(#r)">\n${body}\n</g>\n</svg>\n`;
}

function visionStrip(): string {
  const chromatic = families.filter((family) => family !== "cool-gray" && family !== "neutral-gray");
  const rows: Array<[string, Vision | undefined]> = [
    ["정상 시각", undefined],
    ...(Object.keys(VISION_LABEL) as Vision[]).map((vision): [string, Vision] => [VISION_LABEL[vision], vision]),
  ];
  const left = 124;
  const cell = 60;
  const rowHeight = 40;
  const top = 12;
  const width = left + chromatic.length * cell + 16;
  const height = top + rows.length * rowHeight + 28;
  const parts: string[] = [];
  rows.forEach(([label, vision], row) => {
    const y = top + row * rowHeight;
    parts.push(`<text x="16" y="${y + rowHeight / 2 + 2}" font-family="${FONT}" font-size="12" font-weight="600" fill="${DARK_INK}">${label}</text>`);
    chromatic.forEach((family, index) => {
      const hex = colors[family][500];
      parts.push(roundedRect(left + index * cell, y, cell - 4, rowHeight - 4, 6, vision ? simulate(hex, vision) : hex));
    });
  });
  chromatic.forEach((family, index) => {
    parts.push(
      `<text x="${left + index * cell + (cell - 4) / 2}" y="${top + rows.length * rowHeight + 14}" text-anchor="middle" font-family="${MONO}" font-size="9" fill="${DARK_INK}" opacity="0.7">${family}</text>`,
    );
  });
  return svg(width, height, `${parts.join("\n")}\n`, "#ffffff");
}

type Metric = "l" | "c";

/** Line chart of OKLCH lightness or chroma across steps, one line per family in its own 500 color. */
function curveChart(scales: Record<string, Scale>, metric: Metric, dark: boolean): string {
  const width = 720;
  const plot = { left: 52, right: 700, top: 48, bottom: 330 };
  const background = dark ? darkColors["cool-gray"][50] : "#ffffff";
  const textInk = dark ? darkColors["cool-gray"][800] : colors["cool-gray"][800];
  const mutedInk = dark ? darkColors["cool-gray"][600] : colors["cool-gray"][600];
  const grid = dark ? darkColors["cool-gray"][200] : colors["cool-gray"][100];
  const axis = dark ? darkColors["cool-gray"][300] : colors["cool-gray"][300];
  const [min, max, ticks, format] =
    metric === "l"
      ? [20, 100, [20, 40, 60, 80, 100], (v: number) => String(v)]
      : [0, 0.25, [0, 0.05, 0.1, 0.15, 0.2, 0.25], (v: number) => v.toFixed(2)];
  const x = (index: number) => plot.left + (index * (plot.right - plot.left)) / (steps.length - 1);
  const y = (value: number) => plot.bottom - ((value - min) / (max - min)) * (plot.bottom - plot.top);
  const title = `${dark ? "다크" : "라이트"} · ${metric === "l" ? "명도 (OKLCH L)" : "채도 (OKLCH C)"}`;
  const parts: string[] = [
    `<text x="${plot.left}" y="26" font-family="${FONT}" font-size="14" font-weight="700" fill="${textInk}">${title}</text>`,
  ];
  for (const tick of ticks) {
    parts.push(
      `<line x1="${plot.left}" x2="${plot.right}" y1="${y(tick)}" y2="${y(tick)}" stroke="${grid}" stroke-width="1"/>`,
      `<text x="${plot.left - 8}" y="${y(tick) + 4}" text-anchor="end" font-family="${MONO}" font-size="10" fill="${mutedInk}">${format(tick)}</text>`,
    );
  }
  parts.push(`<line x1="${plot.left}" x2="${plot.right}" y1="${plot.bottom}" y2="${plot.bottom}" stroke="${axis}" stroke-width="1"/>`);
  steps.forEach((step, index) => {
    parts.push(`<text x="${x(index)}" y="${plot.bottom + 18}" text-anchor="middle" font-family="${MONO}" font-size="10" fill="${mutedInk}">${step}</text>`);
  });
  for (const family of families) {
    const values = steps.map((step) => lightnessChroma(scales[family][step])[metric]);
    const stroke = scales[family][500];
    const points = values.map((value, index) => `${x(index).toFixed(1)},${y(value).toFixed(1)}`).join(" ");
    parts.push(`<polyline points="${points}" fill="none" stroke="${stroke}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`);
    values.forEach((value, index) => {
      const label = `${family} ${steps[index]} · ${metric === "l" ? `L ${value.toFixed(1)}` : `C ${value.toFixed(3)}`}`;
      parts.push(`<circle cx="${x(index).toFixed(1)}" cy="${y(value).toFixed(1)}" r="7" fill="transparent"><title>${label}</title></circle>`);
    });
  }
  const perRow = 7;
  const legendTop = plot.bottom + 44;
  families.forEach((family, index) => {
    const lx = plot.left + (index % perRow) * 92;
    const ly = legendTop + Math.floor(index / perRow) * 20;
    parts.push(
      `<line x1="${lx}" x2="${lx + 16}" y1="${ly}" y2="${ly}" stroke="${scales[family][500]}" stroke-width="3" stroke-linecap="round"/>`,
      `<text x="${lx + 22}" y="${ly + 4}" font-family="${FONT}" font-size="11" fill="${textInk}">${family}</text>`,
    );
  });
  const height = legendTop + Math.ceil(families.length / perRow) * 20 + 8;
  return svg(width, height, `${parts.join("\n")}\n`, background);
}

type Line = { name: string; color: string; values: number[]; dashed?: boolean };

/** One lightness panel: a line per family, steps along the bottom, a legend underneath. Returns the SVG parts and its height. */
function lightnessPanel(title: string, stepLabels: readonly number[], lines: Line[], top: number): { parts: string[]; height: number } {
  const plot = { left: 52, right: 700, top: top + 30, bottom: top + 230 };
  const [min, max] = [20, 100];
  const x = (index: number) => plot.left + (index * (plot.right - plot.left)) / (stepLabels.length - 1);
  const y = (value: number) => plot.bottom - ((value - min) / (max - min)) * (plot.bottom - plot.top);
  const parts: string[] = [
    `<text x="${plot.left}" y="${top + 14}" font-family="${FONT}" font-size="14" font-weight="700" fill="${colors["cool-gray"][800]}">${title}</text>`,
  ];
  for (const tick of [20, 40, 60, 80, 100]) {
    parts.push(
      `<line x1="${plot.left}" x2="${plot.right}" y1="${y(tick)}" y2="${y(tick)}" stroke="${colors["cool-gray"][100]}" stroke-width="1"/>`,
      `<text x="${plot.left - 8}" y="${y(tick) + 4}" text-anchor="end" font-family="${MONO}" font-size="10" fill="${colors["cool-gray"][600]}">${tick}</text>`,
    );
  }
  parts.push(`<line x1="${plot.left}" x2="${plot.right}" y1="${plot.bottom}" y2="${plot.bottom}" stroke="${colors["cool-gray"][300]}" stroke-width="1"/>`);
  stepLabels.forEach((step, index) => {
    parts.push(`<text x="${x(index)}" y="${plot.bottom + 18}" text-anchor="middle" font-family="${MONO}" font-size="10" fill="${colors["cool-gray"][600]}">${step}</text>`);
  });
  for (const line of lines) {
    const points = line.values.map((value, index) => `${x(index).toFixed(1)},${y(value).toFixed(1)}`).join(" ");
    const dash = line.dashed ? ' stroke-dasharray="5 4"' : "";
    parts.push(`<polyline points="${points}" fill="none" stroke="${line.color}" stroke-width="2"${dash} stroke-linejoin="round" stroke-linecap="round"/>`);
    line.values.forEach((value, index) => {
      parts.push(`<circle cx="${x(index).toFixed(1)}" cy="${y(value).toFixed(1)}" r="7" fill="transparent"><title>${line.name} ${stepLabels[index]} · L ${value.toFixed(1)}</title></circle>`);
    });
  }
  const perRow = 7;
  const legendTop = plot.bottom + 44;
  lines.forEach((line, index) => {
    const lx = plot.left + (index % perRow) * 92;
    const ly = legendTop + Math.floor(index / perRow) * 20;
    const dash = line.dashed ? ' stroke-dasharray="4 3"' : "";
    parts.push(
      `<line x1="${lx}" x2="${lx + 16}" y1="${ly}" y2="${ly}" stroke="${line.color}" stroke-width="3"${dash} stroke-linecap="round"/>`,
      `<text x="${lx + 22}" y="${ly + 4}" font-family="${FONT}" font-size="11" fill="${colors["cool-gray"][800]}">${line.name}</text>`,
    );
  });
  return { parts, height: legendTop + Math.ceil(lines.length / perRow) * 20 - top };
}

/** Lightness of Tailwind CSS v4 and of this palette, stacked on one axis, with the per-step gap as bars underneath. */
function tailwindComparison(): string {
  const width = 720;
  const tailwindLines: Line[] = TAILWIND_FAMILIES.map((family) => ({
    name: family,
    color: tailwindHex(family, 500),
    values: TAILWIND_STEPS.map((step) => tailwindLightness(family, step)),
  }));
  const ownLines: Line[] = OWN_CHROMATIC.map((family) => ({
    name: family,
    color: colors[family][500],
    values: steps.map((step) => lightnessChroma(colors[family][step]).l),
    dashed: family === "yellow",
  }));
  const parts: string[] = [];
  const first = lightnessPanel(`Tailwind CSS v${tailwindVersion()} · lightness (OKLCH L)`, TAILWIND_STEPS, tailwindLines, 20);
  parts.push(...first.parts);
  const secondTop = 20 + first.height + 28;
  const second = lightnessPanel("Ordinary Palette · lightness (OKLCH L), yellow is brighter on purpose", steps, ownLines, secondTop);
  parts.push(...second.parts);

  const barTop = secondTop + second.height + 28;
  const plot = { left: 52, right: 700, top: barTop + 36, bottom: barTop + 196 };
  const maxGap = 20;
  const y = (value: number) => plot.bottom - (value / maxGap) * (plot.bottom - plot.top);
  const slot = (plot.right - plot.left) / steps.length;
  const barWidth = 18;
  parts.push(
    `<text x="${plot.left}" y="${barTop + 14}" font-family="${FONT}" font-size="14" font-weight="700" fill="${colors["cool-gray"][800]}">Lightness gap between colors at each step, without yellow (L)</text>`,
  );
  for (const tick of [0, 5, 10, 15, 20]) {
    parts.push(
      `<line x1="${plot.left}" x2="${plot.right}" y1="${y(tick)}" y2="${y(tick)}" stroke="${colors["cool-gray"][tick === 0 ? 300 : 100]}" stroke-width="1"/>`,
      `<text x="${plot.left - 8}" y="${y(tick) + 4}" text-anchor="end" font-family="${MONO}" font-size="10" fill="${colors["cool-gray"][600]}">${tick}</text>`,
    );
  }
  const bars: Array<[string, (step: (typeof steps)[number]) => number, number]> = [
    ["Tailwind CSS", (step) => tailwindSpread(step), -barWidth - 1],
    ["Ordinary Palette", (step) => ownSpread(step), 1],
  ];
  const barColors = [colors["cool-gray"][400], colors.blue[500]];
  steps.forEach((step, index) => {
    const center = plot.left + slot * (index + 0.5);
    parts.push(`<text x="${center}" y="${plot.bottom + 18}" text-anchor="middle" font-family="${MONO}" font-size="10" fill="${colors["cool-gray"][600]}">${step}</text>`);
    bars.forEach(([name, gap, offset], barIndex) => {
      const value = gap(step);
      parts.push(
        roundedRect(center + offset, y(value), barWidth, plot.bottom - y(value), 2, barColors[barIndex], `<title>${name} ${step} · ${value.toFixed(1)} L</title>`),
        `<text x="${(center + offset + barWidth / 2).toFixed(1)}" y="${(y(value) - 4).toFixed(1)}" text-anchor="middle" font-family="${MONO}" font-size="9" fill="${colors["cool-gray"][700]}">${value.toFixed(1)}</text>`,
      );
    });
  });
  const legendY = plot.bottom + 44;
  bars.forEach(([name], index) => {
    const lx = plot.left + index * 130;
    parts.push(
      roundedRect(lx, legendY - 8, 12, 12, 2, barColors[index]),
      `<text x="${lx + 18}" y="${legendY + 2}" font-family="${FONT}" font-size="11" fill="${colors["cool-gray"][800]}">${name}</text>`,
    );
  });
  return svg(width, legendY + 24, `${parts.join("\n")}\n`, "#ffffff");
}

/** Every README swatch file, keyed by path relative to the repository root. */
export function swatchFiles(): Record<string, string> {
  const files: Record<string, string> = {
    "docs/palette-light.svg": paletteGrid(colors, "#ffffff", "라이트 스케일"),
    "docs/palette-dark.svg": paletteGrid(darkColors, darkColors["cool-gray"][50], "다크 스케일"),
    "docs/color-vision.svg": visionStrip(),
    "docs/curve-light-lightness.svg": curveChart(colors, "l", false),
    "docs/curve-dark-lightness.svg": curveChart(darkColors, "l", true),
    "docs/compare-tailwind-lightness.svg": tailwindComparison(),
  };
  for (const family of families) files[`docs/families/${family}.svg`] = familyStrip(family);
  return files;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  for (const [path, content] of Object.entries(swatchFiles())) {
    const target = resolve(root, path);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, content, "utf8");
  }
}
