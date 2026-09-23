# Ordinary Palette

A natural color palette for ordinary interface work: backgrounds, text, and borders. Twelve families run from step 50 to step 900. Lightness falls the whole way: step 50 stays the lightest, the large drop lands before step 500, and the steps after 500 sit closer together. Chroma starts low, is highest around steps 400–600, then eases without collapsing. Steps 50–200 share one lightness. From step 400, yellow stays lighter than blue, and yellow 900 keeps its chroma and hue. Cool-gray still ends at a dark 900. Neutral-gray is cool-gray's lightness at chroma 0. The dark scale repeats that shape, darker than the light scale, and does not reuse the light hex values. White and black ship as opacity scales. The scale is raw color only: there are no semantic roles such as primary, surface, or text.

## Install

```bash
npm install ordinary-palette
```

## JavaScript

```ts
import { blue, colors, darkBlue, whiteOpacity } from "ordinary-palette";

colors.blue[500];
colors["cloudy-blue"][500];
darkBlue[500];
whiteOpacity["40"];
```

Each light family is also a named export: `pink`, `red`, `orange`, `yellow`, `lime`, `green`, `teal`, `cloudyBlue`, `blue`, `purple`, `coolGray`, and `neutralGray`. Dark families export as `darkPink`, `darkRed`, `darkOrange`, `darkYellow`, `darkLime`, `darkGreen`, `darkTeal`, `darkCloudyBlue`, `darkBlue`, `darkPurple`, `darkCoolGray`, and `darkNeutralGray`, and together as `darkColors`. Opacity scales export as `whiteOpacity` and `blackOpacity`. `yellowLightnessOffset` and `darkLightness` export the documented lightness numbers.

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

Custom properties are named `--color-<family>-<step>` on the light scale and `--color-dark-<family>-<step>` on the dark scale. That includes `--color-cool-gray-500`, `--color-neutral-gray-500`, `--color-dark-cool-gray-500`, `--color-cloudy-blue-500`, `--color-white-opacity-40`, and `--color-black-opacity-05`.

## JSON

```ts
import palette from "ordinary-palette/colors.json" with { type: "json" };

palette.teal["500"];
palette.dark.blue["500"];
```

## Families

| Family | Light 500 | Dark 500 |
| --- | --- | --- |
| pink | `#e34a6a` | `#b51546` |
| red | `#e54837` | `#b60d04` |
| orange | `#ec7d4f` | `#bf5523` |
| yellow | `#e1ab39` | `#b68400` |
| lime | `#9a9e18` | `#7e8201` |
| green | `#3ca764` | `#017f41` |
| teal | `#26a07c` | `#007d5e` |
| cloudy-blue | `#598cd5` | `#3464aa` |
| blue | `#4287eb` | `#175ebf` |
| purple | `#6c6feb` | `#4a46bf` |
| cool-gray | `#60686e` | `#3d444a` |
| neutral-gray | `#676767` | `#434343` |

Steps on every color family, light and dark: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900.

Light yellow matches cool-gray on steps 50–200. From step 300 it is lighter by this OKLCH L offset: 300 +9.2, 400 +18, 500 +26, 600 +29.4, 700 +32.8, 800 +36.4, 900 +40.8.

Neutral-gray uses chroma 0 at cool-gray's lightness. `#666666` is only an example of that character, not a step in the scale.

Dark cool-gray lightness: 50 = 83.4, 100 = 79.8, 200 = 73.2, 300 = 62.4, 400 = 50, 500 = 38.2, 600 = 31.6, 700 = 25.4, 800 = 19.2, 900 = 12.4. Chromatic families keep their own lightness on that same falling shape.

Opacity steps, for both `white-opacity` and `black-opacity`: 00, 05, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.

## Develop

```bash
npm install
npm test
npm run preview
```

`npm test` builds the package, then checks steps 50–900, `#RRGGBB` solids, lightness falling from 50 to 900 with the larger drop before 500, shared lightness on steps 50–200, blue chroma higher at 500 than at 50 and 900, yellow 900 within 15° of yellow 50 and clearly lighter than blue 900, dark chroma at least 0.9× light chroma, neutral-gray at chroma 0, and chroma-only gamut mapping. The preview gallery runs at <http://127.0.0.1:43123> and lists both scales, each hex, and measured OKLCH L.

## License

MIT
