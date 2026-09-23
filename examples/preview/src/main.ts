import Color from "colorjs.io";
import "../../../src/colors.css";
import {
  blackOpacity,
  colors,
  darkColors,
  families,
  opacitySteps,
  steps,
  whiteOpacity,
  yellowLightnessOffset,
} from "../../../src/palette.ts";
import "./styles.css";

const app = document.querySelector("#app");
if (!app) {
  throw new Error("Missing #app");
}

const page = document.createElement("main");
page.className = "page";

const eyebrow = document.createElement("p");
eyebrow.className = "eyebrow";
eyebrow.textContent = "Palette";

const title = document.createElement("h1");
title.textContent = "Ordinary Palette";

const lede = document.createElement("p");
lede.className = "lede";
lede.textContent =
  "Lightness falls from step 50 to step 900. The large drop is before 500, and later steps sit closer. Chroma is lowest at 50, highest around 400–600, then eases. Steps 50–200 share lightness. From 400, yellow stays lighter than blue. Neutral-gray is cool-gray's lightness at chroma 0. The dark scale repeats that shape, darker than light. Click a swatch to copy its color.";

const status = document.createElement("p");
status.className = "status";
status.setAttribute("role", "status");
status.setAttribute("aria-live", "polite");

const banner = document.createElement("p");
banner.className = "banner";
banner.hidden = true;

page.append(eyebrow, title, lede, status, banner);

const familyList = document.createElement("div");
familyList.className = "families";

function luminance(hex: string): number {
  const channel = (pair: string) => {
    const value = Number.parseInt(pair, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  return (
    0.2126 * channel(hex.slice(1, 3)) +
    0.7152 * channel(hex.slice(3, 5)) +
    0.0722 * channel(hex.slice(5, 7))
  );
}

function ink(hex: string): string {
  return luminance(hex) > 0.42 ? "#241c16" : "#f7f4ef";
}

function needsHairline(hex: string): boolean {
  const body = hex.slice(1);
  if (body.length !== 6 && body.length !== 8) return false;
  const channels = [0, 2, 4].map((index) => Number.parseInt(body.slice(index, index + 2), 16));
  const alpha = body.length === 8 ? Number.parseInt(body.slice(6, 8), 16) / 255 : 1;
  const composited = channels.map((channel) => Math.round(channel * alpha + 255 * (1 - alpha)));
  const min = Math.min(...composited);
  const max = Math.max(...composited);
  // Near-white and almost no hue. Tinted chips keep a wider channel spread, so they stay borderless.
  return 255 - min <= 12 && max - min <= 4;
}

async function copyHex(label: string, hex: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(hex);
    status.textContent = `Copied ${label}, ${hex}.`;
  } catch {
    status.textContent = `Could not copy ${label}. The hex is ${hex}.`;
  }
}

function oklchL(hex: string): number {
  return new Color(hex).to("oklch").get("oklch.l") * 100;
}

function swatch(
  visible: string,
  label: string,
  variable: string,
  hex: string,
  extraClass = "",
  note = "",
): HTMLButtonElement {
  const lightness = oklchL(hex);
  const lightnessLabel = note ? `L ${lightness.toFixed(1)} ${note}` : `L ${lightness.toFixed(1)}`;
  const button = document.createElement("button");
  button.type = "button";
  const classes = ["swatch"];
  if (extraClass) classes.push(extraClass);
  if (!classes.includes("alpha") && needsHairline(hex)) classes.push("edge");
  button.className = classes.join(" ");
  button.style.background = `var(${variable})`;
  button.style.color = ink(hex);
  button.setAttribute("aria-label", `${label}, ${hex}, ${lightnessLabel}`);
  button.title = variable;

  const step = document.createElement("span");
  step.className = "step";
  step.textContent = visible;

  const value = document.createElement("span");
  value.className = "hex";
  value.textContent = hex;

  const measured = document.createElement("span");
  measured.className = "lightness";
  measured.textContent = lightnessLabel;

  button.append(step, value, measured);
  button.addEventListener("click", () => {
    void copyHex(label, hex);
  });
  return button;
}

function rgbToHex(color: string): string | null {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  return `#${match
    .slice(1, 4)
    .map((part) => Number(part).toString(16).padStart(2, "0"))
    .join("")}`;
}

const mismatches: string[] = [];

function renderScale(title: string, scale: typeof colors, prefix: string): void {
  const block = document.createElement("section");
  block.className = "scale";

  const scaleTitle = document.createElement("h2");
  scaleTitle.className = "scale-title";
  scaleTitle.textContent = title;
  block.append(scaleTitle);

  for (const family of families) {
    const section = document.createElement("section");
    section.className = "family";

    const heading = document.createElement("h3");
    heading.textContent = family;

    const row = document.createElement("div");
    row.className = "swatches";

    const missing = steps.filter((step) => !/^#[0-9a-f]{6}$/.test(scale[family][step]));
    if (missing.length > 0) {
      const error = document.createElement("p");
      error.className = "banner";
      error.textContent = `${title} ${family} is missing steps ${missing.join(", ")}.`;
      section.append(heading, error);
      block.append(section);
      continue;
    }

    for (const step of steps) {
      const offset = yellowLightnessOffset[step];
      const note = family === "yellow" && prefix === "" && offset > 0 ? `(+${offset})` : "";
      row.append(
        swatch(
          String(step),
          `${title} ${family} ${step}`,
          `--color-${prefix}${family}-${step}`,
          scale[family][step],
          "",
          note,
        ),
      );
    }

    section.append(heading, row);
    block.append(section);
  }

  familyList.append(block);
}

renderScale("Light", colors, "");
renderScale("Dark", darkColors, "dark-");

page.append(familyList);

const opacityRows: Array<[string, typeof whiteOpacity, string]> = [
  ["white-opacity", whiteOpacity, "on-dark"],
  ["black-opacity", blackOpacity, "on-light"],
];

for (const [name, scale, tone] of opacityRows) {
  const section = document.createElement("section");
  section.className = `family ${tone}`;
  const heading = document.createElement("h2");
  heading.textContent = name;
  const row = document.createElement("div");
  row.className = "swatches";
  for (const step of opacitySteps) {
    const hex = scale[step];
    const button = swatch(step, `${name} ${step}`, `--color-${name}-${step}`, hex, "alpha");
    const percent = Math.round((Number.parseInt(hex.slice(7), 16) / 255) * 100);
    const measured = button.querySelector(".lightness");
    if (measured) measured.textContent = `${percent}%`;
    row.append(button);
  }
  section.append(heading, row);
  familyList.append(section);
}

const usage = document.createElement("section");
usage.className = "usage";
const usageTitle = document.createElement("h2");
usageTitle.textContent = "Use a step directly";
const snippet = document.createElement("pre");
snippet.textContent = `import { coolGray, neutralGray, darkCoolGray } from "ordinary-palette";

coolGray[500];
neutralGray[500];
darkCoolGray[500];
var(--color-cool-gray-500);
var(--color-neutral-gray-500);
var(--color-dark-neutral-gray-500);`;
usage.append(usageTitle, snippet);
page.append(usage);
app.append(page);

for (const button of page.querySelectorAll<HTMLButtonElement>(".swatch")) {
  const painted = rgbToHex(getComputedStyle(button).backgroundColor);
  if (button.classList.contains("alpha")) continue;
  const hex = button.querySelector(".hex")?.textContent ?? "";
  if (painted !== hex) {
    const variable = button.title || button.getAttribute("aria-label") || "swatch";
    mismatches.push(`${variable} paints ${painted ?? "nothing"} instead of ${hex}`);
  }
}

if (mismatches.length > 0) {
  banner.hidden = false;
  banner.textContent = mismatches.slice(0, 3).join(" ");
}
