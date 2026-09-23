export const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

export type ColorStep = (typeof steps)[number];
export type ColorScale = Record<ColorStep, string>;

export const opacitySteps = ["00", "05", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"] as const;

export type OpacityStep = (typeof opacitySteps)[number];
export type OpacityScale = Record<OpacityStep, string>;

/** Light-scale yellow OKLCH L minus cool-gray L. Zero on steps 50–200, where every family shares lightness. Positive from 300, where yellow stays lighter than blue. */
export const yellowLightnessOffset = {
  50: 0,
  100: 0,
  200: 0,
  300: 9.2,
  400: 18,
  500: 25.9,
  600: 28.7,
  700: 30.9,
  800: 32.9,
  900: 35.8,
} as const;

/** Dark-scale yellow OKLCH L minus dark cool-gray lightness. From 300, dark yellow sits about 10 L below light yellow, so it stays lighter than blue. */
export const darkYellowLightnessOffset = {
  50: 0,
  100: 0.1,
  200: 0,
  300: 6,
  400: 13.5,
  500: 20.7,
  600: 24.7,
  700: 28.7,
  800: 32.7,
  900: 37.1,
} as const;

/**
 * Dark steps whose OKLCH L is raised above that family's own dark lightness so chroma can reach
 * 0.9× the light step without moving hue. The number is that raised L on a 0–100 scale.
 * Only sRGB-narrow hues are listed. Their 500 and 900 are raised first, and 600–800 are spaced
 * between them in the light scale's proportions, so the dark tail keeps its spread.
 * cool-gray is not listed. neutral-gray stays chroma 0.
 */
export const darkChromaLightnessExceptions = {
  lime: { 500: 59, 600: 53.7, 700: 48.9, 800: 44.5, 900: 40.6 },
  green: { 600: 49.5, 700: 45.4, 800: 41.6, 900: 38.2 },
  teal: { 500: 53, 600: 48.2, 700: 43.8, 800: 39.8, 900: 36.2 },
} as const;

/** Dark cool-gray OKLCH L. Same fall as the light cool-gray ramp, shifted darker. Chromatic families keep their own lightness. */
export const darkLightness = {
  50: 91,
  100: 87.5,
  200: 80.5,
  300: 69.5,
  400: 57.5,
  500: 45.5,
  600: 37.5,
  700: 29.5,
  800: 21.5,
  900: 13,
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
  400: "#f76755",
  500: "#e54837",
  600: "#cf3324",
  700: "#b5291e",
  800: "#9b271b",
  900: "#852319",
} as const satisfies ColorScale;

export const orange = {
  50: "#fdf0eb",
  100: "#fee0d4",
  200: "#fec2aa",
  300: "#ffaf90",
  400: "#fb9266",
  500: "#ec7d4f",
  600: "#d66b3c",
  700: "#c05d30",
  800: "#ac512a",
  900: "#994627",
} as const satisfies ColorScale;

// Steps 50–200 share cool-gray lightness. From 300, yellow stays lighter than blue.
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
  300: "#78bdfc",
  400: "#50a0f9",
  500: "#4287eb",
  600: "#3174d6",
  700: "#2564bf",
  800: "#1c56a7",
  900: "#1a4a91",
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

export const coolGray = {
  50: "#f3f3f3",
  100: "#e7e7e8",
  200: "#cfd2d4",
  300: "#aab0b5",
  400: "#838a91",
  500: "#60686e",
  600: "#4f555a",
  700: "#3f4449",
  800: "#303437",
  900: "#202325",
} as const satisfies ColorScale;

// Chroma 0 and no hue. Lightness matches cool-gray at the same step.
// #666666 only illustrates that zero-chroma character. It is not copied onto these steps.
export const neutralGray = {
  50: "#f3f3f3",
  100: "#e7e7e7",
  200: "#d1d1d1",
  300: "#afafaf",
  400: "#898989",
  500: "#676767",
  600: "#545454",
  700: "#434343",
  800: "#333333",
  900: "#222222",
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

// Dark steps 50–200 share one clear pale lightness. From 300, each family sits about 10 L below its light step.
export const darkPink = {
  50: "#e9dedf",
  100: "#eccdd0",
  200: "#ecacb2",
  300: "#e07786",
  400: "#d14764",
  500: "#bc204b",
  600: "#a5003c",
  700: "#8b0031",
  800: "#730028",
  900: "#5f001f",
} as const satisfies ColorScale;

export const darkRed = {
  50: "#eadedc",
  100: "#edcec8",
  200: "#eaafa4",
  300: "#e07768",
  400: "#d34637",
  500: "#be1b0f",
  600: "#a30900",
  700: "#890200",
  800: "#720300",
  900: "#5d0200",
} as const satisfies ColorScale;

export const darkOrange = {
  50: "#ebded9",
  100: "#eccfc3",
  200: "#ebb098",
  300: "#e09375",
  400: "#d87347",
  500: "#c65b2b",
  600: "#b14916",
  700: "#9b3b04",
  800: "#873000",
  900: "#762601",
} as const satisfies ColorScale;

// Dark yellow keeps the light yellow shape, shifted darker.
// Hue stays within 15° of light yellow step 50, and chroma stays at least 90% of the light step.
export const darkYellow = {
  50: "#e9e0d1",
  100: "#e5d4b4",
  200: "#d9bb85",
  300: "#d3a859",
  400: "#ca9832",
  500: "#bd8800",
  600: "#b17b00",
  700: "#a56e00",
  800: "#986200",
  900: "#8b5600",
} as const satisfies ColorScale;

export const darkLime = {
  50: "#e1e3d5",
  100: "#d6d9b8",
  200: "#bec58d",
  300: "#a0ac54",
  400: "#869527",
  500: "#808400",
  600: "#717300",
  700: "#666400",
  800: "#5b5600",
  900: "#514b00",
} as const satisfies ColorScale;

export const darkGreen = {
  50: "#dbe4dd",
  100: "#c2deca",
  200: "#99ceaa",
  300: "#65b380",
  400: "#369b5f",
  500: "#028544",
  600: "#00763f",
  700: "#006837",
  800: "#005c2f",
  900: "#005129",
} as const satisfies ColorScale;

export const darkTeal = {
  50: "#dae4df",
  100: "#c2ddd2",
  200: "#9accb8",
  300: "#60ad90",
  400: "#2a9573",
  500: "#007f60",
  600: "#006f53",
  700: "#006148",
  800: "#00553e",
  900: "#004a36",
} as const satisfies ColorScale;

export const darkCloudyBlue = {
  50: "#dbe2eb",
  100: "#c8d7ed",
  200: "#a4c2eb",
  300: "#779ed7",
  400: "#5682c4",
  500: "#396bb1",
  600: "#29599e",
  700: "#1d4988",
  800: "#133c75",
  900: "#0b3063",
} as const satisfies ColorScale;

export const darkBlue = {
  50: "#d6e4ea",
  100: "#bcdbec",
  200: "#8fc7ec",
  300: "#5ca0de",
  400: "#2f81d7",
  500: "#1f65c6",
  600: "#0852b1",
  700: "#004398",
  800: "#00377e",
  900: "#002c69",
} as const satisfies ColorScale;

export const darkPurple = {
  50: "#dfe1e8",
  100: "#d2d5e7",
  200: "#b5bceb",
  300: "#878fde",
  400: "#666ada",
  500: "#4f4cc5",
  600: "#403ab0",
  700: "#342a9a",
  800: "#2a1e83",
  900: "#21136e",
} as const satisfies ColorScale;

export const darkCoolGray = {
  50: "#dfe1e4",
  100: "#d4d6d8",
  200: "#bdc0c2",
  300: "#989ea3",
  400: "#737a80",
  500: "#51585e",
  600: "#3c4247",
  700: "#282d32",
  800: "#171a1d",
  900: "#060709",
} as const satisfies ColorScale;

export const darkNeutralGray = {
  50: "#e1e1e1",
  100: "#d6d6d6",
  200: "#bfbfbf",
  300: "#9d9d9d",
  400: "#797979",
  500: "#575757",
  600: "#414141",
  700: "#2c2c2c",
  800: "#191919",
  900: "#070707",
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
    "600": 12.12,
    "700": 12.08,
    "800": 11.78,
    "900": 12.38
  },
  "red": {
    "50": 28.87,
    "100": 30.37,
    "200": 30.41,
    "300": 29.37,
    "400": 29.58,
    "500": 29.8,
    "600": 29.97,
    "700": 29.48,
    "800": 29.73,
    "900": 29.82
  },
  "orange": {
    "50": 42.38,
    "100": 43.08,
    "200": 42.81,
    "300": 42,
    "400": 43.04,
    "500": 42.42,
    "600": 42.73,
    "700": 42.97,
    "800": 42.25,
    "900": 40.14
  },
  "yellow": {
    "50": 80.69,
    "100": 82.03,
    "200": 81.17,
    "300": 81.04,
    "400": 81.44,
    "500": 81,
    "600": 78,
    "700": 75,
    "800": 72,
    "900": 69
  },
  "lime": {
    "50": 113.34,
    "100": 112.73,
    "200": 114.5,
    "300": 115.85,
    "400": 117.01,
    "500": 111.54,
    "600": 111.23,
    "700": 108,
    "800": 106,
    "900": 104
  },
  "green": {
    "50": 152.6,
    "100": 154.06,
    "200": 154.62,
    "300": 153.86,
    "400": 153.75,
    "500": 152.56,
    "600": 153.78,
    "700": 153.79,
    "800": 153.43,
    "900": 153.76
  },
  "teal": {
    "50": 164.8,
    "100": 167.95,
    "200": 167.79,
    "300": 167.58,
    "400": 167.63,
    "500": 168.06,
    "600": 167.61,
    "700": 167.79,
    "800": 167.51,
    "900": 167.4
  },
  "cloudy-blue": {
    "50": 254.6,
    "100": 256.34,
    "200": 256.82,
    "300": 257.96,
    "400": 257.99,
    "500": 257.42,
    "600": 257.9,
    "700": 257.69,
    "800": 257.77,
    "900": 257.46
  },
  "blue": {
    "50": 225.19,
    "100": 230.98,
    "200": 237.31,
    "300": 247.35,
    "400": 252.97,
    "500": 257.95,
    "600": 258.27,
    "700": 258.17,
    "800": 257.96,
    "900": 258.35
  },
  "purple": {
    "50": 273.36,
    "100": 278.73,
    "200": 278.39,
    "300": 278.43,
    "400": 278.3,
    "500": 278.35,
    "600": 278.08,
    "700": 278.15,
    "800": 278.42,
    "900": 278.49
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
    "600": 0.1871,
    "700": 0.1776,
    "800": 0.156,
    "900": 0.1362
  },
  "red": {
    "50": 0.0133,
    "100": 0.0365,
    "200": 0.0711,
    "300": 0.1332,
    "400": 0.1803,
    "500": 0.1964,
    "600": 0.1944,
    "700": 0.178,
    "800": 0.1544,
    "900": 0.1341
  },
  "orange": {
    "50": 0.0156,
    "100": 0.0371,
    "200": 0.0767,
    "300": 0.1035,
    "400": 0.14,
    "500": 0.1498,
    "600": 0.1483,
    "700": 0.1408,
    "800": 0.1303,
    "900": 0.1199
  },
  "yellow": {
    "50": 0.0221,
    "100": 0.0464,
    "200": 0.0781,
    "300": 0.1096,
    "400": 0.1289,
    "500": 0.1399,
    "600": 0.1385,
    "700": 0.1315,
    "800": 0.1217,
    "900": 0.1119
  },
  "lime": {
    "50": 0.0186,
    "100": 0.045,
    "200": 0.0755,
    "300": 0.1146,
    "400": 0.1313,
    "500": 0.1426,
    "600": 0.1299,
    "700": 0.1159,
    "800": 0.1043,
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
    "700": 0.1264,
    "800": 0.1166,
    "900": 0.1064
  },
  "teal": {
    "50": 0.0125,
    "100": 0.0335,
    "200": 0.0602,
    "300": 0.0891,
    "400": 0.1086,
    "500": 0.1175,
    "600": 0.1078,
    "700": 0.0977,
    "800": 0.0891,
    "900": 0.0811
  },
  "cloudy-blue": {
    "50": 0.0142,
    "100": 0.0345,
    "200": 0.067,
    "300": 0.0952,
    "400": 0.1122,
    "500": 0.1234,
    "600": 0.1222,
    "700": 0.116,
    "800": 0.1074,
    "900": 0.0987
  },
  "blue": {
    "50": 0.0169,
    "100": 0.0407,
    "200": 0.0779,
    "300": 0.1145,
    "400": 0.1532,
    "500": 0.1661,
    "600": 0.1645,
    "700": 0.1562,
    "800": 0.1437,
    "900": 0.1276
  },
  "purple": {
    "50": 0.0096,
    "100": 0.0259,
    "200": 0.0671,
    "300": 0.1177,
    "400": 0.1675,
    "500": 0.1829,
    "600": 0.1811,
    "700": 0.172,
    "800": 0.1592,
    "900": 0.1464
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
