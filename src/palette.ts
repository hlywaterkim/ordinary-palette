export const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

export type ColorStep = (typeof steps)[number];
export type ColorScale = Record<ColorStep, string>;

export const gray = {
  50: "#f6f9fb",
  100: "#ecf0f3",
  200: "#dbe1e5",
  300: "#c5ccd0",
  400: "#acb4b8",
  500: "#90999e",
  600: "#787f83",
  700: "#61676a",
  800: "#4b5052",
  900: "#373a3c",
  950: "#252728",
} as const satisfies ColorScale;

export const red = {
  50: "#fff7f5",
  100: "#ffebe7",
  200: "#ffd7d1",
  300: "#ffbab2",
  400: "#fa9890",
  500: "#e87671",
  600: "#c2605e",
  700: "#9b4f4f",
  800: "#773f40",
  900: "#542f31",
  950: "#382022",
} as const satisfies ColorScale;

export const orange = {
  50: "#fff7f1",
  100: "#ffecdf",
  200: "#ffd8c0",
  300: "#fdbe97",
  400: "#f29f6b",
  500: "#df7f40",
  600: "#bc6833",
  700: "#97552f",
  800: "#744329",
  900: "#523222",
  950: "#372118",
} as const satisfies ColorScale;

export const yellow = {
  50: "#fcf9ed",
  100: "#f6f0d8",
  200: "#ede0b5",
  300: "#e0ca86",
  400: "#ceb050",
  500: "#b99400",
  600: "#9b7b00",
  700: "#7d6207",
  800: "#614c12",
  900: "#463816",
  950: "#2f2610",
} as const satisfies ColorScale;

export const green = {
  50: "#f0fcf4",
  100: "#dff5e5",
  200: "#c3eacc",
  300: "#9dd9aa",
  400: "#73c485",
  500: "#48aa61",
  600: "#3b8e4e",
  700: "#36723f",
  800: "#2f5831",
  900: "#274026",
  950: "#1b2b19",
} as const satisfies ColorScale;

export const teal = {
  50: "#edfcfa",
  100: "#d8f6f1",
  200: "#b4ebe2",
  300: "#80dbcd",
  400: "#3ac6b4",
  500: "#00ab98",
  600: "#008f7e",
  700: "#007565",
  800: "#005a4c",
  900: "#114137",
  950: "#0e2c25",
} as const satisfies ColorScale;

export const blue = {
  50: "#f3f9ff",
  100: "#e2f1ff",
  200: "#c4e4ff",
  300: "#97d1ff",
  400: "#66baf7",
  500: "#2d9fe5",
  600: "#1e85c0",
  700: "#1c6c98",
  800: "#1b5473",
  900: "#193d51",
  950: "#122936",
} as const satisfies ColorScale;

export const indigo = {
  50: "#f7f8ff",
  100: "#ebefff",
  200: "#d7dfff",
  300: "#bac9ff",
  400: "#99afff",
  500: "#7a93f1",
  600: "#637aca",
  700: "#4f63a1",
  800: "#3d4d7b",
  900: "#2d3957",
  950: "#1e273a",
} as const satisfies ColorScale;

export const violet = {
  50: "#fbf7ff",
  100: "#f5ecff",
  200: "#ebd9ff",
  300: "#dbc0fe",
  400: "#c7a3f5",
  500: "#ae84e4",
  600: "#916dc0",
  700: "#735a9a",
  800: "#584776",
  900: "#3f3554",
  950: "#292438",
} as const satisfies ColorScale;

export const pink = {
  50: "#fff6f9",
  100: "#ffeaf2",
  200: "#ffd5e7",
  300: "#fcb7d8",
  400: "#f097c5",
  500: "#dc76ae",
  600: "#b86192",
  700: "#925077",
  800: "#6f3f5d",
  900: "#4f3044",
  950: "#34202e",
} as const satisfies ColorScale;

export const black = "#000000";
export const white = "#ffffff";

export const families = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "indigo",
  "violet",
  "pink",
] as const;

export type ColorFamily = (typeof families)[number];

export const colors = {
  gray,
  red,
  orange,
  yellow,
  green,
  teal,
  blue,
  indigo,
  violet,
  pink,
  black,
  white,
} as const;

export type Colors = typeof colors;
