export const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

export type ColorStep = (typeof steps)[number];
export type ColorScale = Record<ColorStep, string>;

export const opacitySteps = ["00", "05", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"] as const;

export type OpacityStep = (typeof opacitySteps)[number];
export type OpacityScale = Record<OpacityStep, string>;

/** Light-scale yellow OKLCH L minus blue L. Zero on steps 50–200, where every color family shares lightness. Positive from 300, where yellow stays lighter than blue. */
export const yellowLightnessOffset = {
  50: 0,
  100: 1.9,
  200: 5.8,
  300: 11.3,
  400: 16.4,
  500: 19.6,
  600: 21.5,
  700: 23,
  800: 24.1,
  900: 24.4,
} as const;

/**
 * Dark cool-gray OKLCH L. The dark scale runs the other way: step 50 is the darkest surface tint and
 * step 900 the lightest, so a step keeps its role (50 background, 900 text) in both modes.
 */
export const darkLightness = {
  50: 22,
  100: 27,
  200: 33,
  300: 40,
  400: 49,
  500: 59,
  600: 70,
  700: 81,
  800: 90,
  900: 97,
} as const;

// Chromatic families: from 500, each step falls about 5 L and keeps most of its chroma,
// so 600–900 stay apart and each family keeps its own color instead of settling into brown.
export const pink = {
  50: "#fbf0f1",
  100: "#fedee1",
  200: "#ffbec4",
  300: "#ff93a1",
  400: "#f56881",
  500: "#e34a6a",
  600: "#cd3659",
  700: "#b6284c",
  800: "#9d2442",
  900: "#872138",
} as const satisfies ColorScale;

export const red = {
  50: "#fcf0ee",
  100: "#ffdfd9",
  200: "#fdc1b6",
  300: "#ff9383",
  400: "#ff5e4c",
  500: "#ee3828",
  600: "#d81d0f",
  700: "#c00401",
  800: "#a60900",
  900: "#900500",
} as const satisfies ColorScale;

// Orange reaches Toss TDS chroma from 500. Pale steps lean toward apricot (hue 60) so they carry more chroma in sRGB.
export const orange = {
  50: "#fff0e5",
  100: "#ffe1ca",
  200: "#ffc494",
  300: "#ffb17b",
  400: "#ff904d",
  500: "#f9732f",
  600: "#e55e1b",
  700: "#cf4f02",
  800: "#b94400",
  900: "#a73900",
} as const satisfies ColorScale;

// Yellow shares only step 50 with the other color families. From 100 it sits lighter, so chroma
// reaches the Toss TDS level (about 0.165 at 500) inside sRGB and pale steps read yellow, not beige.
// From 500, hue leans toward amber but stays within 15° of step 50. Chroma peaks around 500 and eases, so 900 stays gold.
export const yellow = {
  50: "#fcf3dd",
  100: "#ffecbd",
  200: "#ffe29b",
  300: "#ffd576",
  400: "#ffc84c",
  500: "#fcb81e",
  600: "#f1a900",
  700: "#e49c00",
  800: "#d59000",
  900: "#c68400",
} as const satisfies ColorScale;

// Fresh leaf green between yellow and green (hue 132–139). From 300 it stays lighter than green.
export const lightGreen = {
  50: "#eef6e9",
  100: "#dbefcd",
  200: "#bbdfa2",
  300: "#a3d67d",
  400: "#88ca5a",
  500: "#72bb41",
  600: "#61aa36",
  700: "#52972f",
  800: "#46872b",
  900: "#3a7727",
} as const satisfies ColorScale;

export const green = {
  50: "#edf6ef",
  100: "#d3f0db",
  200: "#abe1bc",
  300: "#81d09b",
  400: "#59bb7d",
  500: "#3ca764",
  600: "#219455",
  700: "#198249",
  800: "#12713e",
  900: "#0c6336",
} as const satisfies ColorScale;

// Cyan between green and light-blue (hue 202–210).
export const cyan = {
  50: "#e8f7f8",
  100: "#c9f0f4",
  200: "#9ae0e8",
  300: "#62cdda",
  400: "#1cbbcb",
  500: "#00a5b5",
  600: "#0092a2",
  700: "#00808f",
  800: "#00707e",
  900: "#00616d",
} as const satisfies ColorScale;

// Sky blue between cyan and blue. Hue runs 232–242, and from 300 it stays lighter than blue.
export const lightBlue = {
  50: "#e9f6fc",
  100: "#ccedff",
  200: "#a0dbfb",
  300: "#71caf8",
  400: "#41bbf6",
  500: "#04abee",
  600: "#0098da",
  700: "#0086c5",
  800: "#0076b0",
  900: "#00669c",
} as const satisfies ColorScale;

// Pale steps hold hue near 245–251 so they stay apart from light-blue.
export const blue = {
  50: "#eaf5fe",
  100: "#d5eaff",
  200: "#b0d6ff",
  300: "#82baff",
  400: "#549eff",
  500: "#2c84fe",
  600: "#1671e8",
  700: "#0561d0",
  800: "#0053b6",
  900: "#00489f",
} as const satisfies ColorScale;

export const purple = {
  50: "#f1f3fa",
  100: "#e3e6f9",
  200: "#c7cefe",
  300: "#a2abfd",
  400: "#8289fc",
  500: "#6c6feb",
  600: "#5b5dd5",
  700: "#4e4dbe",
  800: "#4341a7",
  900: "#383691",
} as const satisfies ColorScale;

// Gray keeps a denser pale end than the color families (L 98, 96.5, 93.5) for surfaces and borders.
export const coolGray = {
  50: "#f7f8fa",
  100: "#f2f4f5",
  200: "#e7eaed",
  300: "#d2d6db",
  400: "#afb5bb",
  500: "#838a91",
  600: "#61686f",
  700: "#454b51",
  800: "#2e3338",
  900: "#1c2023",
} as const satisfies ColorScale;

// Chroma 0 and no hue. Lightness matches cool-gray at the same step.
// #666666 only illustrates that zero-chroma character. It is not copied onto these steps.
export const neutralGray = {
  50: "#f8f8f8",
  100: "#f3f3f3",
  200: "#e9e9e9",
  300: "#d6d6d6",
  400: "#b4b4b4",
  500: "#898989",
  600: "#676767",
  700: "#4a4a4a",
  800: "#333333",
  900: "#1f1f1f",
} as const satisfies ColorScale;

export const whiteOpacity = {
  "00": "#ffffff00",
  "05": "#ffffff0d",
  "10": "#ffffff1a",
  "20": "#ffffff33",
  "30": "#ffffff4d",
  "40": "#ffffff66",
  "50": "#ffffff80",
  "60": "#ffffff99",
  "70": "#ffffffb3",
  "80": "#ffffffcc",
  "90": "#ffffffe6",
  "100": "#ffffffff",
} as const satisfies OpacityScale;

export const blackOpacity = {
  "00": "#00000000",
  "05": "#0000000d",
  "10": "#0000001a",
  "20": "#00000033",
  "30": "#0000004d",
  "40": "#00000066",
  "50": "#00000080",
  "60": "#00000099",
  "70": "#000000b3",
  "80": "#000000cc",
  "90": "#000000e6",
  "100": "#000000ff",
} as const satisfies OpacityScale;

// Dark steps rise from a tinted dark surface at 50 to a pale tint at 900. Steps 50–200 share L 29, 34, 40.
// Step 500 sits within 4 L of light 500 (about 1 L above for most families), so the vivid step reads the same on a dark page.
export const darkPink = {
  50: "#3d2226",
  100: "#55282f",
  200: "#732d39",
  300: "#9d3a4c",
  400: "#c6435e",
  500: "#e74d6d",
  600: "#f86982",
  700: "#ff909f",
  800: "#ffb9c0",
  900: "#ffdfe1",
} as const satisfies ColorScale;

export const darkRed = {
  50: "#40221d",
  100: "#5a261e",
  200: "#79291e",
  300: "#a53126",
  400: "#d03527",
  500: "#f23c2b",
  600: "#ff6350",
  700: "#ff9282",
  800: "#ffbaae",
  900: "#ffe0da",
} as const satisfies ColorScale;

export const darkOrange = {
  50: "#3d241c",
  100: "#542b1c",
  200: "#71331b",
  300: "#a44b26",
  400: "#d5612d",
  500: "#fd7632",
  600: "#ff914f",
  700: "#ffae75",
  800: "#ffc89c",
  900: "#ffe2cb",
} as const satisfies ColorScale;

// Dark yellow 500 stays lighter than dark blue 500. Hue follows the light yellow step nearest in lightness.
export const darkYellow = {
  50: "#362916",
  100: "#4a3310",
  200: "#623f00",
  300: "#996504",
  400: "#ce8a00",
  500: "#f5ac06",
  600: "#fabb3c",
  700: "#face71",
  800: "#f9e0a3",
  900: "#fbefd1",
} as const satisfies ColorScale;

export const darkLightGreen = {
  50: "#22301e",
  100: "#264020",
  200: "#2c5321",
  300: "#437a32",
  400: "#5c9f3b",
  500: "#75be45",
  600: "#89cb5b",
  700: "#a5d77f",
  800: "#c0e3a9",
  900: "#ddefd1",
} as const satisfies ColorScale;

export const darkGreen = {
  50: "#203024",
  100: "#22402c",
  200: "#235336",
  300: "#2d7348",
  400: "#339159",
  500: "#40aa67",
  600: "#5abc7e",
  700: "#83cd9b",
  800: "#addebb",
  900: "#d7efdd",
} as const satisfies ColorScale;

export const darkCyan = {
  50: "#1b2f32",
  100: "#193e44",
  200: "#11515a",
  300: "#0d717e",
  400: "#008f9f",
  500: "#00a8b9",
  600: "#36bac9",
  700: "#70ccd7",
  800: "#a3dde4",
  900: "#d2eef1",
} as const satisfies ColorScale;

export const darkLightBlue = {
  50: "#1c2d3a",
  100: "#1c3b51",
  200: "#1a4c6e",
  300: "#226f9e",
  400: "#1a91cd",
  500: "#11aef1",
  600: "#3ebefb",
  700: "#72cefe",
  800: "#a3defe",
  900: "#d0edfd",
} as const satisfies ColorScale;

export const darkBlue = {
  50: "#1d2c41",
  100: "#1f385d",
  200: "#20477e",
  300: "#275eae",
  400: "#2a74dd",
  500: "#3388ff",
  600: "#58a0ff",
  700: "#81b9ff",
  800: "#a9d3ff",
  900: "#d6ebff",
} as const satisfies ColorScale;

export const darkPurple = {
  50: "#252a3f",
  100: "#313459",
  200: "#3d417a",
  300: "#4f53a4",
  400: "#6064ce",
  500: "#6f72ee",
  600: "#828bff",
  700: "#a0a9ff",
  800: "#c0c8ff",
  900: "#e2e6ff",
} as const satisfies ColorScale;

export const darkCoolGray = {
  50: "#161b20",
  100: "#22272c",
  200: "#31363b",
  300: "#43484e",
  400: "#5c6167",
  500: "#797e83",
  600: "#9b9fa3",
  700: "#bec1c5",
  800: "#dcdee0",
  900: "#f4f5f6",
} as const satisfies ColorScale;

export const darkNeutralGray = {
  50: "#1b1b1b",
  100: "#262626",
  200: "#353535",
  300: "#484848",
  400: "#606060",
  500: "#7d7d7d",
  600: "#9e9e9e",
  700: "#c1c1c1",
  800: "#dedede",
  900: "#f5f5f5",
} as const satisfies ColorScale;

export const families = [
  "pink",
  "red",
  "orange",
  "yellow",
  "light-green",
  "green",
  "cyan",
  "light-blue",
  "blue",
  "purple",
  "cool-gray",
  "neutral-gray",
] as const;

export type ColorFamily = (typeof families)[number];

export const colors = {
  pink,
  red,
  orange,
  yellow,
  "light-green": lightGreen,
  green,
  cyan,
  "light-blue": lightBlue,
  blue,
  purple,
  "cool-gray": coolGray,
  "neutral-gray": neutralGray,
  "white-opacity": whiteOpacity,
  "black-opacity": blackOpacity,
} as const;

export const darkColors = {
  pink: darkPink,
  red: darkRed,
  orange: darkOrange,
  yellow: darkYellow,
  "light-green": darkLightGreen,
  green: darkGreen,
  cyan: darkCyan,
  "light-blue": darkLightBlue,
  blue: darkBlue,
  purple: darkPurple,
  "cool-gray": darkCoolGray,
  "neutral-gray": darkNeutralGray,
} as const;

export type Colors = typeof colors;
export type DarkColors = typeof darkColors;

/** Primitive hue used when mapping. Gamut fitting may lower chroma and must not change this hue. */
export const sourceHue = {
  "pink": {
    "50": 10.99,
    "100": 11.38,
    "200": 12.6,
    "300": 12.24,
    "400": 11.89,
    "500": 12.1,
    "600": 12.24,
    "700": 11.95,
    "800": 11.76,
    "900": 12.49
  },
  "red": {
    "50": 28.87,
    "100": 30.37,
    "200": 30.41,
    "300": 29.37,
    "400": 29.58,
    "500": 29.8,
    "600": 29.86,
    "700": 29.35,
    "800": 29.96,
    "900": 29.74
  },
  "orange": {
    "50": 60,
    "100": 60,
    "200": 60,
    "300": 55,
    "400": 50,
    "500": 44,
    "600": 42.5,
    "700": 42.5,
    "800": 42,
    "900": 40.5
  },
  "yellow": {
    "50": 88,
    "100": 88,
    "200": 88,
    "300": 86,
    "400": 84,
    "500": 81,
    "600": 78,
    "700": 76,
    "800": 75,
    "900": 74
  },
  "light-green": {
    "50": 132,
    "100": 132,
    "200": 133,
    "300": 133,
    "400": 134,
    "500": 135,
    "600": 136,
    "700": 137,
    "800": 138,
    "900": 139
  },
  "green": {
    "50": 152.6,
    "100": 154.06,
    "200": 154.62,
    "300": 153.86,
    "400": 153.75,
    "500": 152.56,
    "600": 153.7,
    "700": 153.57,
    "800": 153.47,
    "900": 153.9
  },
  "cyan": {
    "50": 204,
    "100": 205,
    "200": 205,
    "300": 206,
    "400": 206,
    "500": 207,
    "600": 208,
    "700": 209,
    "800": 210,
    "900": 210
  },
  "light-blue": {
    "50": 230,
    "100": 231,
    "200": 232,
    "300": 233,
    "400": 234,
    "500": 236,
    "600": 238,
    "700": 240,
    "800": 241,
    "900": 242
  },
  "blue": {
    "50": 245,
    "100": 248,
    "200": 251,
    "300": 254,
    "400": 256,
    "500": 258,
    "600": 258,
    "700": 258,
    "800": 258,
    "900": 258
  },
  "purple": {
    "50": 273.36,
    "100": 278.73,
    "200": 278.39,
    "300": 278.43,
    "400": 278.3,
    "500": 278.35,
    "600": 277.84,
    "700": 278.25,
    "800": 278.46,
    "900": 278.28
  },
  "cool-gray": {
    "50": 246.56,
    "100": 246.56,
    "200": 246.56,
    "300": 246.56,
    "400": 246.56,
    "500": 246.56,
    "600": 246.56,
    "700": 246.56,
    "800": 246.56,
    "900": 246.56
  }
} as const;

/** Primitive chroma before gamut fitting. Stored colors stay at or below this chroma. */
export const sourceChroma = {
  "pink": {
    "50": 0.0119,
    "100": 0.0356,
    "200": 0.0753,
    "300": 0.1304,
    "400": 0.1737,
    "500": 0.1889,
    "600": 0.187,
    "700": 0.1774,
    "800": 0.1565,
    "900": 0.1367
  },
  "red": {
    "50": 0.0133,
    "100": 0.0365,
    "200": 0.0711,
    "300": 0.1492,
    "400": 0.202,
    "500": 0.22,
    "600": 0.2182,
    "700": 0.2071,
    "800": 0.1914,
    "900": 0.176
  },
  "orange": {
    "50": 0.0282,
    "100": 0.0708,
    "200": 0.1105,
    "300": 0.1434,
    "400": 0.1632,
    "500": 0.182,
    "600": 0.182,
    "700": 0.176,
    "800": 0.166,
    "900": 0.156
  },
  "yellow": {
    "50": 0.03,
    "100": 0.0642,
    "200": 0.0976,
    "300": 0.1262,
    "400": 0.152,
    "500": 0.165,
    "600": 0.165,
    "700": 0.16,
    "800": 0.155,
    "900": 0.15
  },
  "light-green": {
    "50": 0.02,
    "100": 0.05,
    "200": 0.09,
    "300": 0.13,
    "400": 0.16,
    "500": 0.172,
    "600": 0.166,
    "700": 0.155,
    "800": 0.142,
    "900": 0.13
  },
  "green": {
    "50": 0.0133,
    "100": 0.0414,
    "200": 0.0755,
    "300": 0.109,
    "400": 0.1302,
    "500": 0.1397,
    "600": 0.1378,
    "700": 0.1272,
    "800": 0.1164,
    "900": 0.1063
  },
  "cyan": {
    "50": 0.016,
    "100": 0.04,
    "200": 0.07,
    "300": 0.1,
    "400": 0.12,
    "500": 0.13,
    "600": 0.125,
    "700": 0.115,
    "800": 0.105,
    "900": 0.095
  },
  "light-blue": {
    "50": 0.016,
    "100": 0.042,
    "200": 0.075,
    "300": 0.108,
    "400": 0.135,
    "500": 0.15,
    "600": 0.148,
    "700": 0.14,
    "800": 0.13,
    "900": 0.12
  },
  "blue": {
    "50": 0.0169,
    "100": 0.0407,
    "200": 0.0779,
    "300": 0.1195,
    "400": 0.163,
    "500": 0.1996,
    "600": 0.1972,
    "700": 0.1875,
    "800": 0.1716,
    "900": 0.1587
  },
  "purple": {
    "50": 0.0096,
    "100": 0.0259,
    "200": 0.0671,
    "300": 0.1177,
    "400": 0.1675,
    "500": 0.1829,
    "600": 0.1802,
    "700": 0.1727,
    "800": 0.1593,
    "900": 0.1457
  },
  "cool-gray": {
    "50": 0.003,
    "100": 0.0056,
    "200": 0.0088,
    "300": 0.0119,
    "400": 0.0138,
    "500": 0.015,
    "600": 0.0132,
    "700": 0.0117,
    "800": 0.0093,
    "900": 0.007
  },
  "neutral-gray": {
    "50": 0,
    "100": 0,
    "200": 0,
    "300": 0,
    "400": 0,
    "500": 0,
    "600": 0,
    "700": 0,
    "800": 0,
    "900": 0
  }
} as const;

/** Dark-scale hue before gamut fitting. Each step takes the hue of the light step nearest in lightness for yellow, orange, light-green, cyan, light-blue, and blue. */
export const darkSourceHue = {
  "pink": {
    "50": 10.99,
    "100": 11.38,
    "200": 12.6,
    "300": 12.24,
    "400": 11.89,
    "500": 12.1,
    "600": 12.24,
    "700": 11.95,
    "800": 11.76,
    "900": 12.49
  },
  "red": {
    "50": 28.87,
    "100": 30.37,
    "200": 30.41,
    "300": 29.37,
    "400": 29.58,
    "500": 29.8,
    "600": 29.86,
    "700": 29.35,
    "800": 29.96,
    "900": 29.74
  },
  "orange": {
    "50": 40.47,
    "100": 40.47,
    "200": 40.47,
    "300": 41.95,
    "400": 42.27,
    "500": 44.15,
    "600": 49.66,
    "700": 55.1,
    "800": 60.28,
    "900": 59.67
  },
  "yellow": {
    "50": 73.92,
    "100": 73.92,
    "200": 73.92,
    "300": 73.92,
    "400": 73.92,
    "500": 77.97,
    "600": 80.64,
    "700": 84.19,
    "800": 88.23,
    "900": 88.62
  },
  "light-green": {
    "50": 139.08,
    "100": 139.08,
    "200": 139.08,
    "300": 139.08,
    "400": 136.93,
    "500": 135.03,
    "600": 134.17,
    "700": 132.92,
    "800": 132.88,
    "900": 132.35
  },
  "green": {
    "50": 152.6,
    "100": 154.06,
    "200": 154.62,
    "300": 153.86,
    "400": 153.75,
    "500": 152.56,
    "600": 153.7,
    "700": 153.57,
    "800": 153.47,
    "900": 153.9
  },
  "cyan": {
    "50": 209.43,
    "100": 209.43,
    "200": 209.43,
    "300": 209.82,
    "400": 208.37,
    "500": 206.96,
    "600": 206.05,
    "700": 206.01,
    "800": 204.95,
    "900": 204.1
  },
  "light-blue": {
    "50": 242.24,
    "100": 242.24,
    "200": 242.24,
    "300": 240.74,
    "400": 238.1,
    "500": 235.72,
    "600": 234.05,
    "700": 232.83,
    "800": 232.46,
    "900": 231.71
  },
  "blue": {
    "50": 257.89,
    "100": 257.89,
    "200": 257.89,
    "300": 258.03,
    "400": 258.02,
    "500": 257.96,
    "600": 256.06,
    "700": 254.2,
    "800": 250.59,
    "900": 248.22
  },
  "purple": {
    "50": 273.36,
    "100": 278.73,
    "200": 278.39,
    "300": 278.43,
    "400": 278.3,
    "500": 278.35,
    "600": 277.84,
    "700": 278.25,
    "800": 278.46,
    "900": 278.28
  }
} as const;

/** Dark-scale chroma before gamut fitting: a share of the family's light peak, highest at 500. */
export const darkSourceChroma = {
  "pink": {
    "50": 0.0416,
    "100": 0.068,
    "200": 0.0982,
    "300": 0.1323,
    "400": 0.1663,
    "500": 0.1889,
    "600": 0.1757,
    "700": 0.1398,
    "800": 0.0945,
    "900": 0.0472
  },
  "red": {
    "50": 0.0483,
    "100": 0.0791,
    "200": 0.1142,
    "300": 0.1538,
    "400": 0.1933,
    "500": 0.2197,
    "600": 0.2043,
    "700": 0.1626,
    "800": 0.1098,
    "900": 0.0549
  },
  "orange": {
    "50": 0.0402,
    "100": 0.0658,
    "200": 0.095,
    "300": 0.1279,
    "400": 0.1608,
    "500": 0.1827,
    "600": 0.1699,
    "700": 0.1352,
    "800": 0.0913,
    "900": 0.0457
  },
  "yellow": {
    "50": 0.0363,
    "100": 0.0594,
    "200": 0.0857,
    "300": 0.1154,
    "400": 0.1451,
    "500": 0.1649,
    "600": 0.1534,
    "700": 0.122,
    "800": 0.0825,
    "900": 0.0412
  },
  "light-green": {
    "50": 0.0378,
    "100": 0.0619,
    "200": 0.0894,
    "300": 0.1203,
    "400": 0.1512,
    "500": 0.1718,
    "600": 0.1598,
    "700": 0.1272,
    "800": 0.0859,
    "900": 0.043
  },
  "green": {
    "50": 0.0307,
    "100": 0.0503,
    "200": 0.0727,
    "300": 0.0978,
    "400": 0.123,
    "500": 0.1397,
    "600": 0.13,
    "700": 0.1034,
    "800": 0.0699,
    "900": 0.0349
  },
  "cyan": {
    "50": 0.0264,
    "100": 0.0432,
    "200": 0.0624,
    "300": 0.084,
    "400": 0.1056,
    "500": 0.12,
    "600": 0.1116,
    "700": 0.0888,
    "800": 0.06,
    "900": 0.03
  },
  "light-blue": {
    "50": 0.0329,
    "100": 0.0538,
    "200": 0.0778,
    "300": 0.1047,
    "400": 0.1316,
    "500": 0.1495,
    "600": 0.1391,
    "700": 0.1107,
    "800": 0.0748,
    "900": 0.0374
  },
  "blue": {
    "50": 0.0439,
    "100": 0.0718,
    "200": 0.1038,
    "300": 0.1397,
    "400": 0.1756,
    "500": 0.1996,
    "600": 0.1856,
    "700": 0.1477,
    "800": 0.0998,
    "900": 0.0499
  },
  "purple": {
    "50": 0.0402,
    "100": 0.0659,
    "200": 0.0951,
    "300": 0.1281,
    "400": 0.161,
    "500": 0.1829,
    "600": 0.1701,
    "700": 0.1354,
    "800": 0.0915,
    "900": 0.0457
  }
} as const;
