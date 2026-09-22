import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { colors, darkColors, families, opacitySteps, steps } from "../src/palette.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const opacityFamilies = ["white-opacity", "black-opacity"] as const;

function stylesheet(): string {
  const lines = [":root {"];
  for (const family of families) {
    for (const step of steps) {
      lines.push(`  --color-${family}-${step}: ${colors[family][step]};`);
    }
  }
  for (const family of families) {
    for (const step of steps) {
      lines.push(`  --color-dark-${family}-${step}: ${darkColors[family][step]};`);
    }
  }
  for (const family of opacityFamilies) {
    for (const step of opacitySteps) {
      lines.push(`  --color-${family}-${step}: ${colors[family][step]};`);
    }
  }
  lines.push("}");
  return `${lines.join("\n")}\n`;
}

async function emit(directory: string): Promise<void> {
  await mkdir(directory, { recursive: true });
  const payload = { ...colors, dark: darkColors };
  await writeFile(resolve(directory, "colors.css"), stylesheet(), "utf8");
  await writeFile(resolve(directory, "colors.json"), `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

await emit(resolve(root, "src"));
await emit(resolve(root, "dist"));
