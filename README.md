# Ordinary Palette

A natural color palette for ordinary interface work: backgrounds, text, and borders. Twelve families run from step 50 to step 900. On the light scale, every family matches cool-gray's OKLCH lightness at that step. Neutral-gray is that same lightness with chroma 0 and no hue. Yellow is the exception: it is lifted by a documented offset so bright yellow is not heavier than the other families and dark yellow still reads as yellow. The dark scale uses its own lightness targets and wider gaps, and it does not reuse the light hex values. White and black ship as opacity scales. The scale is raw color only: there are no semantic roles such as primary, surface, or text.

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
| pink | `#fe2867` | `#cf014d` |
| red | `#ff3626` | `#c90901` |
| orange | `#ea5b00` | `#cc4e02` |
| yellow | `#d39900` | `#b78500` |
| lime | `#939701` | `#7f8302` |
| green | `#01ab59` | `#01944c` |
| teal | `#00a87f` | `#01926e` |
| cloudy-blue | `#538fe6` | `#2357a0` |
| blue | `#3c8cff` | `#0253b5` |
| purple | `#787dff` | `#4846b5` |
| cool-gray | `#84919d` | `#4f5a65` |
| neutral-gray | `#8f8f8f` | `#585858` |

Steps on every color family, light and dark: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900.

Light yellow leaves cool-gray's lightness by this OKLCH L offset: 50 +1.4, 100 +2, 200 +2.8, 300 +3.6, 400 +5, 500 +7, 600 +11, 700 +15, 800 +19, 900 +24.

Neutral-gray uses chroma 0 at cool-gray's lightness. `#666666` is only an example of that character, not a step in the scale.

Dark lightness targets: 50 = 94, 100 = 84.44, 200 = 74.89, 300 = 65.33, 400 = 55.78, 500 = 46.22, 600 = 36.67, 700 = 27.11, 800 = 17.56, 900 = 8.

Opacity steps, for both `white-opacity` and `black-opacity`: 00, 05, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.

## Develop

```bash
npm install
npm test
npm run preview
```

`npm test` builds the package, then checks steps 50–900, `#RRGGBB` solids, shared light OKLCH L within 0.4 of cool-gray (yellow exempt, with its explicit offset), light yellow hue within 15° of step 50, dark yellow's own lightness offset, dark chroma at least 0.9× light chroma, neutral-gray at chroma 0, chroma-only gamut mapping, and dark L targets that differ from the light scale and have stronger contrast. The preview gallery runs at <http://127.0.0.1:43123> and lists both scales, each hex, and measured OKLCH L.

## License

MIT
