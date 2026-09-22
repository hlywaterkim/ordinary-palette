import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { black, colors, families, steps, white } from "../src/palette.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function stylesheet(): string {
  const lines = [":root {"];
  for (const family of families) {
    for (const step of steps) {
      lines.push(`  --color-${family}-${step}: ${colors[family][step]};`);
    }
  }
  lines.push(`  --color-black: ${black};`);
  lines.push(`  --color-white: ${white};`);
  lines.push("}");
  return `${lines.join("\n")}\n`;
}

async function emit(directory: string): Promise<void> {
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, "colors.css"), stylesheet(), "utf8");
  await writeFile(resolve(directory, "colors.json"), `${JSON.stringify(colors, null, 2)}\n`, "utf8");
}

await emit(resolve(root, "src"));
await emit(resolve(root, "dist"));
