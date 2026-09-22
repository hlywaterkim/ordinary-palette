# Opensource Color

An open-source color palette for interface work. Ten families run from step 50 (lightest) to step 950 (darkest). Black and white ship as single values. The scale is raw color only: there are no semantic roles such as primary, surface, or text.

## Install

```bash
npm install opensource-color
```

## JavaScript

```ts
import { blue, colors, white } from "opensource-color";

colors.blue[500];
blue[600];
white;
```

Each family is also a named export: `gray`, `red`, `orange`, `yellow`, `green`, `teal`, `blue`, `indigo`, `violet`, and `pink`.

## CSS

```css
@import "opensource-color/colors.css";

.notice {
  background: var(--color-blue-500);
  color: var(--color-white);
}
```

Custom properties are named `--color-<family>-<step>`, plus `--color-black` and `--color-white`.

## JSON

```ts
import palette from "opensource-color/colors.json" with { type: "json" };

palette.teal["500"];
```

## Families

| Family | Step 500 |
| --- | --- |
| gray | `#90999e` |
| red | `#e87671` |
| orange | `#df7f40` |
| yellow | `#b99400` |
| green | `#48aa61` |
| teal | `#00ab98` |
| blue | `#2d9fe5` |
| indigo | `#7a93f1` |
| violet | `#ae84e4` |
| pink | `#dc76ae` |
| black | `#000000` |
| white | `#ffffff` |

Steps on every family: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950.

## Develop

```bash
npm install
npm test
npm run preview
```

`npm test` builds the package, then checks that every family has all 11 steps, every value is `#RRGGBB`, and each step is darker than the one before it. The preview gallery runs at <http://127.0.0.1:43123> and lists every family, step, and hex.

## License

MIT
