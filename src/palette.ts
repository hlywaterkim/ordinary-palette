export const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

export type ColorStep = (typeof steps)[number];
export type ColorScale = Record<ColorStep, string>;

export const opacitySteps = ["00", "05", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"] as const;

export type OpacityStep = (typeof opacitySteps)[number];
export type OpacityScale = Record<OpacityStep, string>;

/** Light-scale yellow OKLCH L minus blue L. Zero on steps 50–200, where every color family shares lightness. Positive from 300, where yellow stays lighter than blue. */
export const yellowLightnessOffset = {
  50: 0,
  100: 0,
  200: 0,
  300: 6.8,
  400: 11.3,
  500: 14.3,
  600: 16.3,
  700: 17.8,
  800: 18.8,
  900: 19.2,
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

export const orange = {
  50: "#fdf0eb",
  100: "#fee0d4",
  200: "#fec2aa",
  300: "#ffaf90",
  400: "#ff8f60",
  500: "#f87338",
  600: "#e26120",
  700: "#cb5311",
  800: "#b64810",
  900: "#a23e14",
} as const satisfies ColorScale;

// Steps 50–200 share the color families' pale lightness. From 300, yellow stays lighter than blue.
// From 500, hue leans toward amber but stays within 15° of step 50. Chroma peaks around 500 and eases, so 900 stays gold.
export const yellow = {
  50: "#fbf2e3",
  100: "#f7e5c5",
  200: "#eccd97",
  300: "#f1c576",
  400: "#ebb856",
  500: "#e2aa3a",
  600: "#d89c2d",
  700: "#cb8f2b",
  800: "#bd822d",
  900: "#af762e",
} as const satisfies ColorScale;

export const lime = {
  50: "#f3f5e7",
  100: "#e7ebc9",
  200: "#d0d89f",
  300: "#bcc970",
  400: "#a4b44b",
  500: "#9a9e18",
  600: "#888b13",
  700: "#7b790f",
  800: "#6e690c",
  900: "#625b09",
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

export const teal = {
  50: "#ecf6f1",
  100: "#d3efe3",
  200: "#acdfca",
  300: "#7ccaac",
  400: "#4fb491",
  500: "#26a07c",
  600: "#1e8c6b",
  700: "#187a5d",
  800: "#126a50",
  900: "#0d5b44",
} as const satisfies ColorScale;

export const cloudyBlue = {
  50: "#edf4fd",
  100: "#d9e9ff",
  200: "#b6d4fe",
  300: "#92baf5",
  400: "#73a1e5",
  500: "#598cd5",
  600: "#4979c1",
  700: "#3c69ab",
  800: "#325b97",
  900: "#294f84",
} as const satisfies ColorScale;

export const blue = {
  50: "#e8f6fc",
  100: "#cdedfe",
  200: "#a1daff",
  300: "#75bdff",
  400: "#49a0ff",
  500: "#2c84fe",
  600: "#1871e8",
  700: "#0761d0",
  800: "#0053b6",
  900: "#0047a1",
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
// Step 500 sits about 1 L above light 500, so the vivid step reads the same on a dark page.
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
  50: "#3c251c",
  100: "#532c1b",
  200: "#70341a",
  300: "#a24c28",
  400: "#d3622e",
  500: "#fc763c",
  600: "#ff9060",
  700: "#ffac89",
  800: "#ffc6b0",
  900: "#ffe0d6",
} as const satisfies ColorScale;

// Dark yellow 500 stays lighter than dark blue 500. Hue follows the light yellow step nearest in lightness.
export const darkYellow = {
  50: "#35291a",
  100: "#493319",
  200: "#614016",
  300: "#956528",
  400: "#c28b31",
  500: "#e5ad3e",
  600: "#edba57",
  700: "#f2c980",
  800: "#f5daa9",
  900: "#f7ead2",
} as const satisfies ColorScale;

export const darkLime = {
  50: "#2e2c1a",
  100: "#3c3917",
  200: "#4e4912",
  300: "#6d6915",
  400: "#858818",
  500: "#9da11e",
  600: "#a5b54a",
  700: "#bac675",
  800: "#d1d8a3",
  900: "#e8ebd0",
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

export const darkTeal = {
  50: "#1f3028",
  100: "#203f34",
  200: "#215241",
  300: "#277058",
  400: "#278c6c",
  500: "#2ba37f",
  600: "#50b692",
  700: "#7dc9ac",
  800: "#aadbc7",
  900: "#d6efe4",
} as const satisfies ColorScale;

export const darkCloudyBlue = {
  50: "#222c39",
  100: "#29394f",
  200: "#31496a",
  300: "#426292",
  400: "#507ab9",
  500: "#5c8fd8",
  600: "#74a2e8",
  700: "#93b9f2",
  800: "#b6d1f8",
  900: "#dbe9fd",
} as const satisfies ColorScale;

export const darkBlue = {
  50: "#1e2c41",
  100: "#20385d",
  200: "#21477f",
  300: "#285eae",
  400: "#2b74dd",
  500: "#3388ff",
  600: "#4da2ff",
  700: "#74bcff",
  800: "#99d7ff",
  900: "#cdeeff",
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
  "lime",
  "green",
  "teal",
  "cloudy-blue",
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
  lime,
  green,
  teal,
  "cloudy-blue": cloudyBlue,
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
  lime: darkLime,
  green: darkGreen,
  teal: darkTeal,
  "cloudy-blue": darkCloudyBlue,
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
    "50": 42.38,
    "100": 43.08,
    "200": 42.81,
    "300": 42,
    "400": 43.04,
    "500": 42.42,
    "600": 43.02,
    "700": 43.34,
    "800": 42.32,
    "900": 40.27
  },
  "yellow": {
    "50": 80.69,
    "100": 82.03,
    "200": 81.17,
    "300": 81.04,
    "400": 81.44,
    "500": 80.77,
    "600": 77.86,
    "700": 75.23,
    "800": 71.91,
    "900": 68.84
  },
  "lime": {
    "50": 113.34,
    "100": 112.73,
    "200": 114.5,
    "300": 115.85,
    "400": 117.01,
    "500": 111.54,
    "600": 111.25,
    "700": 108.44,
    "800": 106.16,
    "900": 104.06
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
  "teal": {
    "50": 164.8,
    "100": 167.95,
    "200": 167.79,
    "300": 167.58,
    "400": 167.63,
    "500": 168.06,
    "600": 167.46,
    "700": 167.64,
    "800": 167.43,
    "900": 167.29
  },
  "cloudy-blue": {
    "50": 254.6,
    "100": 256.34,
    "200": 256.82,
    "300": 257.96,
    "400": 257.99,
    "500": 257.42,
    "600": 258.3,
    "700": 257.94,
    "800": 257.92,
    "900": 257.11
  },
  "blue": {
    "50": 225.19,
    "100": 230.98,
    "200": 237.31,
    "300": 247.35,
    "400": 252.97,
    "500": 257.95,
    "600": 258.29,
    "700": 258.27,
    "800": 257.92,
    "900": 258.59
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
    "50": 0.0156,
    "100": 0.0371,
    "200": 0.0767,
    "300": 0.123,
    "400": 0.1664,
    "500": 0.1781,
    "600": 0.1764,
    "700": 0.1673,
    "800": 0.1553,
    "900": 0.1424
  },
  "yellow": {
    "50": 0.0221,
    "100": 0.0464,
    "200": 0.0781,
    "300": 0.1096,
    "400": 0.1289,
    "500": 0.1394,
    "600": 0.1387,
    "700": 0.1314,
    "800": 0.1216,
    "900": 0.112
  },
  "lime": {
    "50": 0.0186,
    "100": 0.045,
    "200": 0.0755,
    "300": 0.1146,
    "400": 0.1313,
    "500": 0.1426,
    "600": 0.13,
    "700": 0.1165,
    "800": 0.1045,
    "900": 0.0942
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
  "teal": {
    "50": 0.0125,
    "100": 0.0335,
    "200": 0.0602,
    "300": 0.0891,
    "400": 0.1086,
    "500": 0.1175,
    "600": 0.1081,
    "700": 0.0981,
    "800": 0.0895,
    "900": 0.081
  },
  "cloudy-blue": {
    "50": 0.0142,
    "100": 0.0345,
    "200": 0.067,
    "300": 0.0952,
    "400": 0.1122,
    "500": 0.1234,
    "600": 0.1233,
    "700": 0.1161,
    "800": 0.1081,
    "900": 0.0985
  },
  "blue": {
    "50": 0.0169,
    "100": 0.0407,
    "200": 0.0779,
    "300": 0.1379,
    "400": 0.1844,
    "500": 0.2,
    "600": 0.198,
    "700": 0.188,
    "800": 0.174,
    "900": 0.16
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

/** Dark-scale hue before gamut fitting. Each step takes the hue of the light step nearest in lightness for yellow, lime, and blue. */
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
    "50": 42.38,
    "100": 43.08,
    "200": 42.81,
    "300": 42,
    "400": 43.04,
    "500": 42.42,
    "600": 43.02,
    "700": 43.34,
    "800": 42.32,
    "900": 40.27
  },
  "yellow": {
    "50": 68.84,
    "100": 68.84,
    "200": 68.84,
    "300": 68.84,
    "400": 75.23,
    "500": 80.77,
    "600": 81.44,
    "700": 81.17,
    "800": 82.03,
    "900": 82.03
  },
  "lime": {
    "50": 104.06,
    "100": 104.06,
    "200": 104.06,
    "300": 106.16,
    "400": 111.25,
    "500": 111.54,
    "600": 117.01,
    "700": 115.85,
    "800": 114.5,
    "900": 112.73
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
  "teal": {
    "50": 164.8,
    "100": 167.95,
    "200": 167.79,
    "300": 167.58,
    "400": 167.63,
    "500": 168.06,
    "600": 167.46,
    "700": 167.64,
    "800": 167.43,
    "900": 167.29
  },
  "cloudy-blue": {
    "50": 254.6,
    "100": 256.34,
    "200": 256.82,
    "300": 257.96,
    "400": 257.99,
    "500": 257.42,
    "600": 258.3,
    "700": 257.94,
    "800": 257.92,
    "900": 257.11
  },
  "blue": {
    "50": 258.48,
    "100": 258.48,
    "200": 258.48,
    "300": 258.15,
    "400": 258.19,
    "500": 257.96,
    "600": 252.91,
    "700": 247.58,
    "800": 237.31,
    "900": 230.98
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
    "50": 0.0392,
    "100": 0.0641,
    "200": 0.0926,
    "300": 0.1247,
    "400": 0.1567,
    "500": 0.1781,
    "600": 0.1657,
    "700": 0.1318,
    "800": 0.0891,
    "900": 0.0445
  },
  "yellow": {
    "50": 0.0307,
    "100": 0.0502,
    "200": 0.0725,
    "300": 0.0976,
    "400": 0.1227,
    "500": 0.1394,
    "600": 0.1297,
    "700": 0.1032,
    "800": 0.0697,
    "900": 0.0349
  },
  "lime": {
    "50": 0.0314,
    "100": 0.0513,
    "200": 0.0742,
    "300": 0.0998,
    "400": 0.1255,
    "500": 0.1426,
    "600": 0.1326,
    "700": 0.1055,
    "800": 0.0713,
    "900": 0.0357
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
  "teal": {
    "50": 0.0258,
    "100": 0.0423,
    "200": 0.0611,
    "300": 0.0822,
    "400": 0.1034,
    "500": 0.1175,
    "600": 0.1093,
    "700": 0.0869,
    "800": 0.0587,
    "900": 0.0294
  },
  "cloudy-blue": {
    "50": 0.0272,
    "100": 0.0444,
    "200": 0.0642,
    "300": 0.0864,
    "400": 0.1086,
    "500": 0.1234,
    "600": 0.1148,
    "700": 0.0913,
    "800": 0.0617,
    "900": 0.0309
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
