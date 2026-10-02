<div align="center">

![Ordinary Palette.](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/cover.webp)

**The most ordinary, perfect palette you can use anywhere**

Every color keeps the same lightness at each step, so it's easy to build UI with

[![npm](https://img.shields.io/npm/v/ordinary-palette?style=flat-square&color=2b84ff&label=npm)](https://www.npmjs.com/package/ordinary-palette)
[![downloads](https://img.shields.io/npm/dm/ordinary-palette?style=flat-square&color=2b84ff&label=downloads)](https://www.npmjs.com/package/ordinary-palette)
[![License: MIT](https://img.shields.io/badge/license-MIT-2b84ff?style=flat-square)](LICENSE)

[한국어](README.md) | English

</div>

## Features

- **Same lightness across colors and steps:** The colored scales share one lightness curve, so blue 500 and green 500 look equally bright. 13 colors × 10 steps (50–900), in light and dark scales.
- **Each step has a purpose:** 50–200 are backgrounds. 600 is text on white and the background for a button with white text. White text on 700 and 800 text on 100 reach 4.5:1 or more (for yellow, 900 is the text step).
- **Dark keeps the same purposes:** The dark scale runs the other way, so a step does the same work in both modes. It does not reuse light hex values.
- **Checked by tests:** `npm test` checks lightness spacing, chroma, and contrast on every run.
- **Palette only:** There are no semantic tokens such as primary, surface, or text. Put your own design system on top.

## Example UI

The same UI built twice: with Tailwind CSS default colors (Before) and with Ordinary Palette (After). Both use the same step numbers (600 for buttons, 500 for charts, 800 text on a 100 background for badges).

![Before: Tailwind CSS, After: Ordinary Palette](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/example-ui-compare.webp)

- **Buttons:** White text on a 600 fill reaches 4.5:1 in all six Ordinary Palette colors. In Tailwind, green (3.2:1), cyan (3.6:1), and orange (3.6:1) fall short, so each color needs its own step or text color.
- **Lightness of the same 500:** Grayscale makes the difference visible. In Tailwind the lightest and darkest of the six colors are 11.0 L apart; in Ordinary Palette they are 3.9 L apart. Mixing 500s in bars or charts does not leave one color louder or flatter than the rest.
- **Badges:** 800 text on a 100 background reads well in both (6.4–7.5:1 in Tailwind, 6.9–8.2:1 in Ordinary Palette). There is no big difference here.

A full screen of buttons, badges, alerts, a form, and charts:

![Components built with Ordinary Palette: light](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/example-ui-light.webp)

![Components built with Ordinary Palette: dark](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/example-ui-dark.webp)

The dark scale keeps the same step structure (dark text on a 500 fill, 700 badge text).

## Install

```bash
npm install ordinary-palette
```

## Usage

### JavaScript

```ts
import { blue, colors, darkBlue, whiteOpacity } from "ordinary-palette";

colors.blue[500];
colors["light-blue"][500];
darkBlue[500];
whiteOpacity["40"];
```

Each light color is also exported by name: `pink`, `red`, `orange`, `yellow`, `lightGreen`, `green`, `teal`, `lightBlue`, `blue`, `purple`, `brown`, `coolGray`, `neutralGray`. Dark colors are `darkPink`, `darkRed`, `darkOrange`, `darkYellow`, `darkLightGreen`, `darkGreen`, `darkTeal`, `darkLightBlue`, `darkBlue`, `darkPurple`, `darkBrown`, `darkCoolGray`, `darkNeutralGray`, and all of them together are `darkColors`. The opacity scales are `whiteOpacity` and `blackOpacity`.

### CSS

```css
@import "ordinary-palette/colors.css";

.notice {
  background: var(--color-blue-600);
  color: var(--color-white-opacity-100);
}

.notice-dark {
  background: var(--color-dark-blue-500);
  color: var(--color-dark-cool-gray-50);
}
```

CSS variables are named `--color-<color>-<step>` for light and `--color-dark-<color>-<step>` for dark, for example `--color-cool-gray-500`, `--color-dark-cool-gray-500`, `--color-light-blue-500`, `--color-white-opacity-40`, and `--color-black-opacity-05`.

### JSON

```ts
import palette from "ordinary-palette/colors.json" with { type: "json" };

palette.teal["500"];
palette.dark.blue["500"];
```

## Figma

A Figma Community file and a way to import Variables will come later.

## Full palette

![Light scale: 13 colors × 50–900](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/palette-light.svg)

![Dark scale: 13 colors × 50–900](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/palette-dark.svg)

## Compared with Tailwind CSS

In Tailwind CSS (v4) every color has its own lightness curve, so the same step is not equally bright across colors. In Ordinary Palette the colored scales share one curve. The chart plots the lightness (OKLCH L) of Tailwind's 17 default colors (grays left out) and Ordinary Palette's 11 colored scales on the same axis.

![Lightness of Tailwind CSS and Ordinary Palette](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/compare-tailwind-lightness.svg)

| Step | Tailwind CSS | Ordinary Palette |
| --- | --- | --- |
| 50 | 2.5 | 0.4 |
| 100 | 3.7 | 0.3 |
| 200 | 6.8 | 0.2 |
| 300 | 11.2 | 2.5 |
| 400 | 16.8 | 4.1 |
| 500 | 18.4 | 3.9 |
| 600 | 15.5 | 4.0 |
| 700 | 9.8 | 4.0 |
| 800 | 7.5 | 4.2 |
| 900 | 5.5 | 3.9 |

The table shows the lightness (OKLCH L) gap between the lightest and darkest color at each step. Yellow is left out of both, and a smaller gap means the same step looks equally bright across colors.

That keeps contrast steady across colors too. White text on a 600 fill reaches 4.5:1 in 8 of 16 Tailwind colors and 10 of 10 Ordinary colors (yellow excluded).

In UI work this means:

- **Swapping a color keeps the contrast.** Changing a button from blue 600 to green 600 or purple 600 keeps white text at 4.5:1 or more (yellow excluded), so you do not re-pick text colors per color.
- **Several colors on one screen stay balanced.** Badges or chart bars from the same step do not leave one color looking louder or flatter than the rest.
- **Dark mode has the same structure.** The dark scale also gives the same step nearly the same lightness.

Yellow needs to be bright to look yellow, so it is deliberately lighter than the shared curve and is left out of the comparison. Equal lightness also means colors differ only in hue, which is harder to tell apart with color vision deficiency; see the [Korean README](README.md#색각-이상-시뮬레이션) for what to do when you place same-step colors side by side. Tailwind's values are read from the `tailwindcss@4.3.3` package for the comparison only and are not copied into this palette.

## How the scales are built

- **Lightness:** 50 is the lightest and 900 the darkest. Every colored scale except yellow sits within about 1 L of blue at each step (orange runs up to 3 L lighter), so the same step looks equally bright across colors. From 200 to 900, each step is a similar visual change, with a slightly larger drop before 500. 50–200 are background tints, so they sit closer together on purpose.
- **Chroma:** Low at 50, highest at 400–600, and it does not collapse at 900, so dark steps keep their own color. 600 is never more saturated than 500, so 500 reads as the main step.
- **Background steps (50–200):** They share lightness and chroma across colored scales, so a row of different 100s looks even. Yellow shares 50 only and is brighter from 100 on.
- **Grays:** Start lighter (L 98) with three steps above L 93 for surfaces and borders. cool-gray 900 is the dark body text color. neutral-gray has cool-gray's lightness with zero chroma.
- **Dark scale:** Dark 50 is a dark tinted background, dark 500 is close to light 500 in lightness, and dark 900 is a light tint for text.
- **Visual correction:** Lightness stays on the shared curve. Where colors still look off (for example, saturated blue and purple look brighter), only chroma and hue are adjusted, so contrast does not change.
- **White and black:** Available as opacity scales (`white-opacity`, `black-opacity`) with steps 00, 05, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.

![Light lightness curve](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/curve-light-lightness.svg)

![Dark lightness curve](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/curve-dark-lightness.svg)

## Colors

| Color | 50 → 900 | Character |
| --- | --- | --- |
| pink | ![pink 50–900](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/families/pink.svg) | A true pink (hue 356), kept apart from red. |
| red | ![red 50–900](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/families/red.svg) | A little redder than orange so the two stay apart. |
| orange | ![orange 50–900](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/families/orange.svg) | A vivid orange at 500. Light steps lean apricot, dark steps lean red. |
| yellow | ![yellow 50–900](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/families/yellow.svg) | Brighter than the shared curve from 100 on. 900 is a deep gold that works as text. |
| light-green | ![light-green 50–900](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/families/light-green.svg) | Yellow-green between yellow and green. Dark steps lean green so they do not look olive. |
| green | ![green 50–900](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/families/green.svg) | A clear green. |
| teal | ![teal 50–900](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/families/teal.svg) | A blue-green at hue 195, from aqua to deep teal. Dark steps are less saturated because of the sRGB limit. |
| light-blue | ![light-blue 50–900](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/families/light-blue.svg) | Sky blue between teal and blue. |
| blue | ![blue 50–900](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/families/blue.svg) | The reference color for the shared lightness curve. |
| purple | ![purple 50–900](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/families/purple.svg) | Slightly more violet than indigo. |
| brown | ![brown 50–900](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/families/brown.svg) | A low-chroma warm brown between orange and gray. |
| cool-gray | ![cool-gray 50–900](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/families/cool-gray.svg) | A slightly cool gray for surfaces, borders, and text. |
| neutral-gray | ![neutral-gray 50–900](https://raw.githubusercontent.com/hlywaterkim/ordinary-palette/assets/docs/families/neutral-gray.svg) | cool-gray's lightness with zero chroma. |

Every color has the steps 50, 100, 200, 300, 400, 500, 600, 700, 800, 900 in both light and dark.

## Step guide

The palette has no semantic tokens, and it will not add them. These are measured starting points, not rules (WCAG 2 contrast: 4.5:1 for text, 3:1 for icons and input borders).

- **Grays (light):** 50 and 100 for page and card backgrounds, 200 for dividers, 300 for visible borders, 500 for input borders, 600 for secondary text, 800–900 for body text.
- **Grays (dark):** Dark 50–200 for backgrounds, dark 500 for input borders, dark 600 for secondary text, dark 800–900 for body text.
- **Colored scales (light):** 600 for text on white and as the background for white text, 700 for badge text on a 100 tint, 500 for icons on white. For yellow, use 900 for text and 800 for icons.
- **Colored scales (dark):** Dark 500 for text on dark backgrounds.
- **Same step, similar colors:** Because the colors share lightness, some same-step pairs are hard to tell apart with color vision deficiency. Add a label or icon, or mix steps.

The full guide, with measured contrast tables, color vision simulation, and screen examples, is in the [Korean README](README.md#스텝-사용-가이드).

## Development

```bash
npm install
npm test
```

`npm test` builds the package and then checks the palette rules: step format, lightness, spacing, chroma, each color's hue, contrast, the dark scale, visual correction, and whether the README tables match the palette and the README points to every swatch image. When the `assets` branch is fetched, it also checks that those images match the palette.

## Changelog

0.2.0 is the current version, published on npm.

### Next (not published yet)

- Renamed `cyan` to `teal`: `colors.teal`, the `teal` export, `darkTeal`, `--color-teal-*`, and `--color-dark-teal-*` are the new names, and `cyan` is gone. This reverts the 0.2.0 rename of `teal` to `cyan`. The color values are unchanged.

### 0.2.0

- Renamed colors: `lime` → `light-green`, `teal` → `cyan`, `cloudy-blue` → `light-blue`.
- Added the `brown` color.
- The colored scales share one lightness curve. Yellow and the grays stay on their own.
- For every colored scale except yellow, 600 is text on white and the background for white text. Yellow text is 900.
- The 0.1.0 hex values were not kept.

### 0.1.0

- Twelve colors (`lime`, `teal`, `cloudy-blue`, no brown), steps 50–900, light and dark scales, and white/black opacity.
- JavaScript, CSS variables, and JSON.

## License

MIT
