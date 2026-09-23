# Ordinary Palette

A natural color palette for ordinary interface work: backgrounds, text, and borders. Twelve families run from step 50 to step 900. Lightness falls the whole way: step 50 stays the lightest, the large drop lands before step 500, and the steps after 500 sit closer together while staying clearly apart, about 5 L each. Chroma starts low, is highest around steps 400–600, then eases without collapsing, so 600–900 keep each family's color. Blue, red, and orange reach the lowest peak chroma found in SEED, Toss TDS, and Montage for the same hue. The other families stay a little quieter. Color families share one lightness on steps 50–200. Gray starts lighter, at L 98, and keeps three steps at L 93 or above for surfaces and borders. From step 400, yellow stays lighter than blue, and yellow 900 keeps its chroma, leaning toward amber within 15° of step 50's hue. Cool-gray still ends at a dark 900. Neutral-gray is cool-gray's lightness at chroma 0. The dark scale runs the other way, so each step keeps its role in both modes: dark 50 is a tinted dark surface, dark 500 sits at about the lightness of light 500, and dark 900 is a pale tint for text. It does not reuse the light hex values. White and black ship as opacity scales. The scale is raw color only: there are no semantic roles such as primary, surface, or text.

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

Each light family is also a named export: `pink`, `red`, `orange`, `yellow`, `lime`, `green`, `teal`, `lightBlue`, `blue`, `purple`, `coolGray`, and `neutralGray`. Dark families export as `darkPink`, `darkRed`, `darkOrange`, `darkYellow`, `darkLime`, `darkGreen`, `darkTeal`, `darkLightBlue`, `darkBlue`, `darkPurple`, `darkCoolGray`, and `darkNeutralGray`, and together as `darkColors`. Opacity scales export as `whiteOpacity` and `blackOpacity`. `yellowLightnessOffset` and `darkLightness` export the documented lightness numbers.

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

palette.teal["500"];
palette.dark.blue["500"];
```

## Families

| Family | Light 500 | Dark 500 |
| --- | --- | --- |
| pink | `#e34a6a` | `#e74d6d` |
| red | `#ee3828` | `#f23c2b` |
| orange | `#f87338` | `#fc763c` |
| yellow | `#e8a800` | `#ebab0e` |
| lime | `#9a9e18` | `#9da11e` |
| green | `#3ca764` | `#40aa67` |
| teal | `#26a07c` | `#2ba37f` |
| light-blue | `#04abee` | `#11aef1` |
| blue | `#2c84fe` | `#3388ff` |
| purple | `#6c6feb` | `#6f72ee` |
| cool-gray | `#838a91` | `#797e83` |
| neutral-gray | `#898989` | `#7d7d7d` |

Steps on every color family, light and dark: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900.

Light yellow matches blue on steps 50–200. From step 300 it is lighter than blue by this OKLCH L offset: 300 +6.9, 400 +11.3, 500 +14.3, 600 +16.4, 700 +17.9, 800 +18.8, 900 +19.2. Yellow carries more chroma than the other warm families, so its pale steps read yellow rather than beige. Light-blue is a sky blue (hue 232–242) that stays lighter than blue from step 300.

Neutral-gray uses chroma 0 at cool-gray's lightness. `#666666` is only an example of that character, not a step in the scale.

Dark cool-gray lightness rises: 50 = 22, 100 = 27, 200 = 33, 300 = 40, 400 = 49, 500 = 59, 600 = 70, 700 = 81, 800 = 90, 900 = 97. Dark chromatic steps 50–200 share L 29, 34, and 40. Dark 500 sits about 1 L above light 500, and dark 900 is a pale tint near L 93. Dark chroma peaks at 500 and is at least 90% of the light peak.

Opacity steps, for both `white-opacity` and `black-opacity`: 00, 05, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.

## Develop

```bash
npm install
npm test
npm run preview
```

`npm test` builds the package, then checks steps 50–900, `#RRGGBB` solids, lightness falling from 50 to 900 with the larger drop before 500, steps after 500 at least 3.4 L apart with 900 keeping 62% of peak chroma, a dark scale that rises from a tinted dark 50 to a pale 900, shared lightness on color steps 50–200, a dense pale gray end, blue, red, and orange at reference peak chroma, blue chroma higher at 500 than at 50 and 900, yellow 900 within 15° of yellow 50 and clearly lighter than blue 900, dark peak chroma at least 0.9× light peak chroma, neutral-gray at chroma 0, and chroma-only gamut mapping. The preview gallery runs at <http://127.0.0.1:43123> and lists both scales, each hex, and measured OKLCH L.

## License

MIT
