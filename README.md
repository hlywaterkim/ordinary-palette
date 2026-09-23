# Ordinary Palette

A natural color palette for ordinary interface work: backgrounds, text, and borders. Twelve families run from step 50 to step 900. Lightness falls the whole way: step 50 stays the lightest, the large drop lands before step 500, and the steps after 500 sit closer together while staying clearly apart, about 5 L each. Chroma starts low, is highest around steps 400–600 (step 600 never exceeds 500, so 500 reads as the main step), then eases without collapsing, so 600–900 keep each family's color. Blue, red, and orange reach the lowest peak chroma found in SEED, Toss TDS, and Montage for the same hue. The other families stay a little quieter. Color families share one lightness on steps 50–200, except yellow, which shares only step 50 so it can carry Toss TDS-level chroma. Gray starts lighter, at L 98, and keeps three steps at L 93 or above for surfaces and borders. From step 400, yellow stays lighter than blue, and yellow 900 keeps its chroma, leaning toward amber within 15° of step 50's hue. Cool-gray still ends at a dark 900. Neutral-gray is cool-gray's lightness at chroma 0. The dark scale runs the other way, so each step keeps its role in both modes: dark 50 is a tinted dark surface, dark 500 sits at about the lightness of light 500, and dark 900 is a pale tint for text. It does not reuse the light hex values. White and black ship as opacity scales. The scale is raw color only: there are no semantic roles such as primary, surface, or text.

## Install

```bash
npm install ordinary-palette
```

## JavaScript

```ts
import { blue, colors, darkBlue, whiteOpacity } from "ordinary-palette";

colors.blue[500];
colors["light-blue"][500];
darkBlue[500];
whiteOpacity["40"];
```

Each light family is also a named export: `pink`, `red`, `orange`, `yellow`, `lightGreen`, `green`, `cyan`, `lightBlue`, `blue`, `purple`, `coolGray`, and `neutralGray`. Dark families export as `darkPink`, `darkRed`, `darkOrange`, `darkYellow`, `darkLightGreen`, `darkGreen`, `darkCyan`, `darkLightBlue`, `darkBlue`, `darkPurple`, `darkCoolGray`, and `darkNeutralGray`, and together as `darkColors`. Opacity scales export as `whiteOpacity` and `blackOpacity`. `yellowLightnessOffset` and `darkLightness` export the documented lightness numbers.

## CSS

```css
@import "ordinary-palette/colors.css";

.notice {
  background: var(--color-blue-500);
  color: var(--color-white-opacity-100);
}

.notice-dark {
  background: var(--color-dark-blue-500);
}
```

Custom properties are named `--color-<family>-<step>` on the light scale and `--color-dark-<family>-<step>` on the dark scale. That includes `--color-cool-gray-500`, `--color-neutral-gray-500`, `--color-dark-cool-gray-500`, `--color-light-blue-500`, `--color-white-opacity-40`, and `--color-black-opacity-05`.

## JSON

```ts
import palette from "ordinary-palette/colors.json" with { type: "json" };

palette.cyan["500"];
palette.dark.blue["500"];
```

## Families

| Family | Light 500 | Dark 500 |
| --- | --- | --- |
| pink | `#e7388d` | `#eb3c90` |
| red | `#ee3828` | `#f23c2b` |
| orange | `#f87500` | `#fc780b` |
| yellow | `#feb700` | `#f6ac00` |
| light-green | `#88b700` | `#8bba0d` |
| green | `#26a95e` | `#2bac61` |
| cyan | `#00bcbc` | `#0fbfbf` |
| light-blue | `#00abee` | `#07aef2` |
| blue | `#2b84ff` | `#3388ff` |
| purple | `#6b6bf7` | `#6e6efb` |
| cool-gray | `#838a91` | `#797e83` |
| neutral-gray | `#898989` | `#7d7d7d` |

Steps on every color family, light and dark: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900.

Light yellow matches blue on step 50. From step 100 it is lighter than blue by this OKLCH L offset: 100 +1.9, 200 +5.8, 300 +11.3, 400 +16.4, 500 +19.6, 600 +21.5, 700 +23, 800 +24.1, 900 +24.4.9, 400 +11.3, 500 +14.3, 600 +16.4, 700 +17.9, 800 +18.8, 900 +19.2. Orange sits near #ff7700 at step 500 (hue 50) and reaches Toss TDS chroma, as does yellow. Pale orange leans toward apricot to carry more chroma. Light-green is a yellow-green (hue 124–130) lighter than green. Cyan (hue 195) runs from an aqua like #00ffff to a teal like #008080, and sits lighter than the other families so it can hold its chroma. Light-blue is a sky blue (hue 232–242) that stays lighter than blue from step 300.

Neutral-gray uses chroma 0 at cool-gray's lightness. `#666666` is only an example of that character, not a step in the scale.

Dark cool-gray lightness rises: 50 = 22, 100 = 27, 200 = 33, 300 = 40, 400 = 49, 500 = 59, 600 = 70, 700 = 81, 800 = 90, 900 = 97. Dark chromatic steps 50–200 share L 29, 34, and 40. Dark 500 sits about 1 L above light 500, and dark 900 is a pale tint near L 93. Dark chroma peaks at 500 and is at least 90% of the light peak.

Opacity steps, for both `white-opacity` and `black-opacity`: 00, 05, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.

## Using the steps

The palette has no semantic roles, so these are measured starting points, not rules. Numbers are WCAG 2 contrast: 4.5:1 for text, 3:1 for icons and control borders.

**Gray, light scale:** page and card surfaces 50 and 100, dividers 200, visible borders 300, input and control borders that must be seen 500 (3.5:1), secondary text 600 (5.7:1), body text 800–900.

**Gray, dark scale:** surfaces dark 50–200, control borders dark 500 (4.2:1), secondary text dark 600 (6.5:1), body text dark 800–900.

**Color families, light scale.** Each cell names the first step that passes. "500 fill takes" names the ink that reads better on the 500 fill: dark ink is cool-gray 900 (dark cool-gray 50 on the dark scale).

| Family | Text on white | White text on fill | 500 fill takes | Tint badge on 100 | Icon on white |
| --- | --- | --- | --- | --- | --- |
| pink | 600 | 600 | dark ink 4.2:1 | 700 | 500 |
| red | 600 | 600 | dark ink 4.1:1 | 700 | 400 |
| orange | 700 | 700 | dark ink 5.9:1 | 800 | 600 |
| yellow | — | — | dark ink 9.4:1 | — | 900 |
| light-green | 700 | 700 | dark ink 6.9:1 | 800 | 600 |
| green | 700 | 700 | dark ink 5.4:1 | 800 | 500 |
| cyan | 700 | 700 | dark ink 7.0:1 | 800 | 600 |
| light-blue | 700 | 700 | dark ink 6.3:1 | 800 | 600 |
| blue | 600 | 600 | dark ink 4.6:1 | 700 | 500 |
| purple | 600 | 600 | white 4.1:1 | 700 | 400 |

Dark scale, on a dark cool-gray 50 page:

| Family | Text on dark 50 | 500 fill takes | Tint badge on dark 100 |
| --- | --- | --- | --- |
| pink | 500 | dark ink 4.6:1 | 700 |
| red | 500 | dark ink 4.5:1 | 700 |
| orange | 400 | dark ink 6.5:1 | 500 |
| yellow | 400 | dark ink 8.9:1 | 500 |
| light-green | 400 | dark ink 7.5:1 | 500 |
| green | 500 | dark ink 5.9:1 | 600 |
| cyan | 400 | dark ink 7.6:1 | 500 |
| light-blue | 400 | dark ink 6.9:1 | 500 |
| blue | 500 | dark ink 5.0:1 | 700 |
| purple | 600 | dark ink 4.4:1 | 700 |

- Yellow never carries text on white. Put dark ink on yellow fills, and use orange 800 or darker for warning text.
- Pink, red, and purple 500 reach only 4.1–4.4:1 with either ink. Use 600 with white for filled buttons, or keep 500 for large bold labels (3:1).
- For hover and pressed states, step one darker on the light scale (600 → 700) and one lighter on the dark scale.

The tables come from `scripts/usage-table.ts`, and `npm test` fails if they drift from the palette. Regenerate them with `node --experimental-strip-types scripts/usage-table.ts`.

## Develop

```bash
npm install
npm test
npm run preview
```

`npm test` builds the package, then checks steps 50–900, `#RRGGBB` solids, lightness falling from 50 to 900 with the larger drop before 500, steps after 500 at least 3.4 L apart with 900 keeping 62% of peak chroma, a dark scale that rises from a tinted dark 50 to a pale 900, shared lightness on color steps 50–200, a dense pale gray end, blue, red, and orange at reference peak chroma, blue chroma higher at 500 than at 50 and 900, yellow 900 within 15° of yellow 50 and clearly lighter than blue 900, dark peak chroma at least 0.9× light peak chroma, neutral-gray at chroma 0, and chroma-only gamut mapping. The preview gallery runs at <http://127.0.0.1:43123> and lists both scales, each hex, and measured OKLCH L.

## License

MIT
