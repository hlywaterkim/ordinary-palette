import "../../../src/colors.css";
import { black, colors, families, steps, white } from "../../../src/palette.ts";
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
title.textContent = "Opensource Color";

const lede = document.createElement("p");
lede.className = "lede";
lede.textContent =
  "Ten pigment families, eleven steps each. Step 50 is the lightest and step 950 is the darkest. Black and white sit beside the scales. Click a swatch to copy its hex.";

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

async function copyHex(label: string, hex: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(hex);
    status.textContent = `Copied ${label}, ${hex}.`;
  } catch {
    status.textContent = `Could not copy ${label}. The hex is ${hex}.`;
  }
}

function swatch(
  visible: string,
  label: string,
  variable: string,
  hex: string,
  extraClass = "",
): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "button";
  button.className = extraClass ? `swatch ${extraClass}` : "swatch";
  button.style.background = `var(${variable})`;
  button.style.color = ink(hex);
  button.setAttribute("aria-label", `${label}, ${hex}`);
  button.title = variable;

  const step = document.createElement("span");
  step.className = "step";
  step.textContent = visible;

  const value = document.createElement("span");
  value.className = "hex";
  value.textContent = hex;

  button.append(step, value);
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

for (const family of families) {
  const section = document.createElement("section");
  section.className = "family";

  const heading = document.createElement("h2");
  heading.textContent = family;

  const row = document.createElement("div");
  row.className = "swatches";

  const missing = steps.filter((step) => !/^#[0-9a-f]{6}$/.test(colors[family][step]));
  if (missing.length > 0) {
    const error = document.createElement("p");
    error.className = "banner";
    error.textContent = `${family} is missing steps ${missing.join(", ")}.`;
    section.append(heading, error);
    familyList.append(section);
    continue;
  }

  for (const step of steps) {
    row.append(swatch(String(step), `${family} ${step}`, `--color-${family}-${step}`, colors[family][step]));
  }

  section.append(heading, row);
  familyList.append(section);
}

page.append(familyList);

const neutrals = document.createElement("section");
neutrals.className = "neutrals";
neutrals.append(
  swatch("black", "black", "--color-black", black, "neutral"),
  swatch("white", "white", "--color-white", white, "neutral"),
);
page.append(neutrals);

const usage = document.createElement("section");
usage.className = "usage";
const usageTitle = document.createElement("h2");
usageTitle.textContent = "Use a step directly";
const snippet = document.createElement("pre");
snippet.textContent = `import { blue } from "opensource-color";

blue[500];
var(--color-blue-500);`;
usage.append(usageTitle, snippet);
page.append(usage);
app.append(page);

for (const button of page.querySelectorAll<HTMLButtonElement>(".swatch")) {
  const painted = rgbToHex(getComputedStyle(button).backgroundColor);
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
