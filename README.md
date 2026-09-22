# Ordinary Palette

A natural color palette for ordinary interface work: backgrounds, text, and borders. Ten families run from step 50 (lightest) to step 950 (darkest). Black and white ship as single values. The scale is raw color only: there are no semantic roles such as primary, surface, or text.

## Install

```bash
npm install ordinary-palette
```

## JavaScript

```ts
import { blue, colors, white } from "ordinary-palette";

colors.blue[500];
blue[600];
white;
```

Each family is also a named export: `gray`, `red`, `orange`, `yellow`, `green`, `teal`, `blue`, `indigo`, `violet`, and `pink`.

## CSS

```css
@import "ordinary-palette/colors.css";

.notice {
  background: var(--color-blue-500);
  color: var(--color-white);
}
```

Custom properties are named `--color-<family>-<step>`, plus `--color-black` and `--color-white`.

## JSON

```ts
import palette from "ordinary-palette/colors.json" with { type: "json" };

palette.teal["500"];
```

## Families

| Family | Step 500 |
| --- | --- |
| gray | `#7f7f7f` |
| red | `#a56f68` |
| orange | `#9a765c` |
| yellow | `#877f5b` |
| green | `#64896d` |
| teal | `#628783` |
| blue | `#6182a4` |
| indigo | `#757ca2` |
| violet | `#8a749d` |
| pink | `#967384` |
| black | `#000000` |
| white | `#ffffff` |

Steps on every family: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950.

## Develop

```bash
npm install
npm test
npm run preview
```

`npm test` builds the package, then checks that every family has all 11 steps, every value is `#RRGGBB`, and each step shares the same OKLCH lightness target within 0.4. The preview gallery runs at <http://127.0.0.1:43123> and lists every family, step, hex, and OKLCH L.

## License

MIT
