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
  500: 19.5,
  600: 19.7,
  700: 18.5,
  800: 16.1,
  900: 10.9,
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

// Chromatic families: chroma sits about 12% above the earlier quieter curve, up to what sRGB holds.
// Light-toned families (orange, light-green, cyan, light-blue) darken from 600 so white text reads on 700.
// From 500, each step falls about 5 L and keeps most of its chroma,
// so 600–900 stay apart and each family keeps its own color instead of settling into brown.
// Pink sits at hue 356, a true pink, so it stays apart from red (ΔE OK above 0.1 at 500).
export const pink = {
  50: "#fcf0f4",
  100: "#fedde8",
  200: "#fdbdd3",
  300: "#fb91ba",
  400: "#f95ba2",
  500: "#e7388d",
  600: "#d01f7b",
  700: "#b90b6c",
  800: "#a00f5d",
  900: "#8a1250",
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

// Orange sits near #ff7700 at 500 (hue 50, chroma about 0.19). Pale steps lean toward apricot (hue 60), dark steps toward 43.
export const orange = {
  50: "#fff0e5",
  100: "#ffe1ca",
  200: "#ffc494",
  300: "#ffb179",
  400: "#ff9045",
  500: "#f87500",
  600: "#de6200",
  700: "#c45000",
  800: "#ae4500",
  900: "#9a3900",
} as const satisfies ColorScale;

// Yellow shares only step 50 with the other color families. From 100 it sits lighter, so chroma
// reaches the Toss TDS level (about 0.165 at 500) inside sRGB and pale steps read yellow, not beige.
// From 500, hue leans toward amber but stays within 15° of step 50. Steps 600–900 fall faster, so 900 is a deep
// gold that carries 4.5:1 text on white and on yellow 100.
export const yellow = {
  50: "#fdf3da",
  100: "#ffecbd",
  200: "#ffe29b",
  300: "#ffd576",
  400: "#ffc84c",
  500: "#feb700",
  600: "#e9a400",
  700: "#d28f00",
  800: "#b57a00",
  900: "#916000",
} as const satisfies ColorScale;

// Yellow-green 연두 between yellow and green (hue 124–130). From 300 it stays lighter than green.
export const lightGreen = {
  50: "#eff6e5",
  100: "#dfefc4",
  200: "#c4dd94",
  300: "#b1d464",
  400: "#9ac72b",
  500: "#88b700",
  600: "#6f9c00",
  700: "#5a8100",
  800: "#4c7200",
  900: "#406400",
} as const satisfies ColorScale;

export const green = {
  50: "#ecf6ee",
  100: "#d0f1da",
  200: "#a6e3b9",
  300: "#78d297",
  400: "#4abd78",
  500: "#26a95e",
  600: "#009651",
  700: "#008346",
  800: "#00723c",
  900: "#006434",
} as const satisfies ColorScale;

// Cyan at hue 195: aqua like #00ffff at the pale end, teal like #008080 at the dark end. Lighter than the other
// families from 300, because this hue only holds chroma at high lightness in sRGB.
export const cyan = {
  50: "#e3f8f8",
  100: "#c0f3f2",
  200: "#86e5e5",
  300: "#51dfe1",
  400: "#31ced0",
  500: "#00bcbc",
  600: "#009f9f",
  700: "#008282",
  800: "#007272",
  900: "#006262",
} as const satisfies ColorScale;

// Sky blue between cyan and blue. Hue runs 232–242, and from 300 it stays lighter than blue.
export const lightBlue = {
  50: "#e7f6fd",
  100: "#ccedff",
  200: "#9adcff",
  300: "#64cbff",
  400: "#1fbcfe",
  500: "#00abee",
  600: "#0092d2",
  700: "#007bb5",
  800: "#006ba1",
  900: "#005c8d",
} as const satisfies ColorScale;

// Pale steps hold hue near 245–251 so they stay apart from light-blue.
// 500 is the main step: 600 and 700 stay just under its chroma so 600 does not read as the brand blue.
export const blue = {
  50: "#e9f5ff",
  100: "#d5eaff",
  200: "#b0d6ff",
  300: "#82baff",
  400: "#549eff",
  500: "#2b84ff",
  600: "#1a71e6",
  700: "#0861cf",
  800: "#0053b6",
  900: "#00489f",
} as const satisfies ColorScale;

// Purple sits at hue 288, just past indigo toward violet, so it stays apart from blue.
export const purple = {
  50: "#f2f3fb",
  100: "#e6e5fa",
  200: "#cfcbfd",
  300: "#b0a6fb",
  400: "#9581fa",
  500: "#8163f1",
  600: "#6f50dc",
  700: "#6041c4",
  800: "#5335ac",
  900: "#472c96",
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
  50: "#3e212c",
  100: "#572439",
  200: "#752749",
  300: "#9f3064",
  400: "#c9357c",
  500: "#eb3c90",
  600: "#fc5ca4",
  700: "#ff8cb9",
  800: "#ffb6d0",
  900: "#ffdee9",
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
  50: "#3d241b",
  100: "#542b1a",
  200: "#713317",
  300: "#a44b1e",
  400: "#d56216",
  500: "#fc780b",
  600: "#ff9148",
  700: "#ffae73",
  800: "#ffc89c",
  900: "#ffe2cb",
} as const satisfies ColorScale;

// Dark yellow 500 stays lighter than dark blue 500. Hue follows the light yellow step nearest in lightness.
export const darkYellow = {
  50: "#362915",
  100: "#4a330d",
  200: "#614000",
  300: "#986600",
  400: "#cc8b00",
  500: "#f2ae00",
  600: "#fcba32",
  700: "#fbcd6d",
  800: "#f9dfa0",
  900: "#fcefd0",
} as const satisfies ColorScale;

export const darkLightGreen = {
  50: "#252f1a",
  100: "#2d3f17",
  200: "#365111",
  300: "#537817",
  400: "#709c0f",
  500: "#8bba0d",
  600: "#9cc73b",
  700: "#b3d46d",
  800: "#cae19e",
  900: "#e1eecd",
} as const satisfies ColorScale;

export const darkGreen = {
  50: "#1e3023",
  100: "#1e402a",
  200: "#1d5433",
  300: "#237444",
  400: "#219354",
  500: "#2bac61",
  600: "#4cbe79",
  700: "#7bcf97",
  800: "#a8e0b9",
  900: "#d4f0dd",
} as const satisfies ColorScale;

export const darkCyan = {
  50: "#1b302f",
  100: "#183f3f",
  200: "#0c5252",
  300: "#117a7a",
  400: "#059f9f",
  500: "#0fbfbf",
  600: "#44ccce",
  700: "#78d8d9",
  800: "#a7e3e3",
  900: "#d1efee",
} as const satisfies ColorScale;

export const darkLightBlue = {
  50: "#1c2d3b",
  100: "#1c3b52",
  200: "#194c6e",
  300: "#216f9f",
  400: "#1891cd",
  500: "#07aef2",
  600: "#3cbefc",
  700: "#72ceff",
  800: "#a2defe",
  900: "#d0edfd",
} as const satisfies ColorScale;

export const darkBlue = {
  50: "#1d2c41",
  100: "#1f385d",
  200: "#20477f",
  300: "#275eaf",
  400: "#2a74de",
  500: "#3388ff",
  600: "#58a0ff",
  700: "#81b9ff",
  800: "#a9d3ff",
  900: "#d6ebff",
} as const satisfies ColorScale;

export const darkPurple = {
  50: "#2a2840",
  100: "#37315b",
  200: "#463c7d",
  300: "#5c4ca8",
  400: "#715ad3",
  500: "#8466f4",
  600: "#9782ff",
  700: "#afa3ff",
  800: "#c9c4ff",
  900: "#e6e5ff",
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
    "50": 356,
    "100": 356,
    "200": 356,
    "300": 356,
    "400": 356,
    "500": 356,
    "600": 356,
    "700": 356,
    "800": 356,
    "900": 356
  },
  "red": {
    "50": 28.87,
    "100": 30.37,
    "200": 30.41,
    "300": 29.37,
    "400": 29.45,
    "500": 29.7,
    "600": 29.8,
    "700": 29.36,
    "800": 29.95,
    "900": 29.78
  },
  "orange": {
    "50": 58.79,
    "100": 59.67,
    "200": 60.28,
    "300": 56,
    "400": 51.77,
    "500": 49.96,
    "600": 47.23,
    "700": 44.85,
    "800": 44.13,
    "900": 42.68
  },
  "yellow": {
    "50": 88.77,
    "100": 88.62,
    "200": 88.23,
    "300": 85.99,
    "400": 84.19,
    "500": 80.39,
    "600": 77.97,
    "700": 75.85,
    "800": 74.95,
    "900": 74.6
  },
  "light-green": {
    "50": 125.19,
    "100": 124.14,
    "200": 123.83,
    "300": 123.96,
    "400": 125.13,
    "500": 125.92,
    "600": 127.14,
    "700": 127.77,
    "800": 128.83,
    "900": 130.07
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
    "50": 196.79,
    "100": 194.8,
    "200": 195.61,
    "300": 196.44,
    "400": 196.06,
    "500": 194.77,
    "600": 194.77,
    "700": 194.77,
    "800": 194.77,
    "900": 194.77
  },
  "light-blue": {
    "50": 227.28,
    "100": 231.71,
    "200": 232.11,
    "300": 233.04,
    "400": 233.87,
    "500": 235.61,
    "600": 238.1,
    "700": 239.91,
    "800": 240.74,
    "900": 242.24
  },
  "blue": {
    "50": 242.42,
    "100": 248.22,
    "200": 250.59,
    "300": 254.2,
    "400": 256.06,
    "500": 257.96,
    "600": 258.02,
    "700": 258.03,
    "800": 258,
    "900": 257.89
  },
  "purple": {
    "50": 284.89,
    "100": 289.35,
    "200": 288.5,
    "300": 288.47,
    "400": 288.54,
    "500": 288.38,
    "600": 287.9,
    "700": 288.15,
    "800": 288.31,
    "900": 288.39
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
    "50": 0.0135,
    "100": 0.0382,
    "200": 0.0783,
    "300": 0.1356,
    "400": 0.2026,
    "500": 0.2205,
    "600": 0.2176,
    "700": 0.2068,
    "800": 0.1826,
    "900": 0.1591
  },
  "red": {
    "50": 0.0133,
    "100": 0.0365,
    "200": 0.0711,
    "300": 0.1332,
    "400": 0.1992,
    "500": 0.2197,
    "600": 0.2182,
    "700": 0.2071,
    "800": 0.1841,
    "900": 0.1664
  },
  "orange": {
    "50": 0.0219,
    "100": 0.0452,
    "200": 0.0921,
    "300": 0.1163,
    "400": 0.16,
    "500": 0.1867,
    "600": 0.1782,
    "700": 0.1693,
    "800": 0.1573,
    "900": 0.1483
  },
  "yellow": {
    "50": 0.0345,
    "100": 0.064,
    "200": 0.0946,
    "300": 0.1231,
    "400": 0.1497,
    "500": 0.1705,
    "600": 0.165,
    "700": 0.16,
    "800": 0.155,
    "900": 0.15
  },
  "light-green": {
    "50": 0.0236,
    "100": 0.0591,
    "200": 0.0993,
    "300": 0.145,
    "400": 0.1802,
    "500": 0.1828,
    "600": 0.1722,
    "700": 0.1585,
    "800": 0.1483,
    "900": 0.1378
  },
  "green": {
    "50": 0.0152,
    "100": 0.0464,
    "200": 0.0846,
    "300": 0.1221,
    "400": 0.1458,
    "500": 0.1565,
    "600": 0.1544,
    "700": 0.1425,
    "800": 0.1304,
    "900": 0.119
  },
  "cyan": {
    "50": 0.022,
    "100": 0.0519,
    "200": 0.0904,
    "300": 0.1197,
    "400": 0.123,
    "500": 0.1229,
    "600": 0.1126,
    "700": 0.1025,
    "800": 0.0932,
    "900": 0.0837
  },
  "light-blue": {
    "50": 0.0185,
    "100": 0.0424,
    "200": 0.0824,
    "300": 0.1206,
    "400": 0.1509,
    "500": 0.1499,
    "600": 0.1433,
    "700": 0.1352,
    "800": 0.1254,
    "900": 0.1166
  },
  "blue": {
    "50": 0.0194,
    "100": 0.0407,
    "200": 0.0785,
    "300": 0.1293,
    "400": 0.1805,
    "500": 0.2235,
    "600": 0.194,
    "700": 0.186,
    "800": 0.1922,
    "900": 0.1734
  },
  "purple": {
    "50": 0.0109,
    "100": 0.0286,
    "200": 0.0684,
    "300": 0.1205,
    "400": 0.1729,
    "500": 0.204,
    "600": 0.2024,
    "700": 0.1935,
    "800": 0.1791,
    "900": 0.163
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
    "50": 356.13,
    "100": 356.13,
    "200": 356.13,
    "300": 355.72,
    "400": 356.13,
    "500": 356.2,
    "600": 355.89,
    "700": 356.06,
    "800": 356.45,
    "900": 355.77
  },
  "red": {
    "50": 29.78,
    "100": 29.78,
    "200": 29.78,
    "300": 29.36,
    "400": 29.8,
    "500": 29.7,
    "600": 29.45,
    "700": 29.37,
    "800": 30.41,
    "900": 30.37
  },
  "orange": {
    "50": 42.79,
    "100": 42.79,
    "200": 42.79,
    "300": 44.37,
    "400": 47.4,
    "500": 49.96,
    "600": 51.77,
    "700": 56,
    "800": 60.28,
    "900": 59.67
  },
  "yellow": {
    "50": 75.77,
    "100": 75.77,
    "200": 75.77,
    "300": 75.77,
    "400": 75.77,
    "500": 80.39,
    "600": 80.39,
    "700": 84.19,
    "800": 88.23,
    "900": 88.62
  },
  "light-green": {
    "50": 129.85,
    "100": 129.85,
    "200": 129.85,
    "300": 128.95,
    "400": 127.33,
    "500": 125.92,
    "600": 125.13,
    "700": 123.96,
    "800": 123.83,
    "900": 124.14
  },
  "green": {
    "50": 153.62,
    "100": 153.62,
    "200": 153.62,
    "300": 153.58,
    "400": 153.64,
    "500": 152.61,
    "600": 153.92,
    "700": 153.93,
    "800": 154.23,
    "900": 155
  },
  "cyan": {
    "50": 194.77,
    "100": 194.77,
    "200": 194.77,
    "300": 194.77,
    "400": 194.77,
    "500": 194.77,
    "600": 196.25,
    "700": 196.44,
    "800": 195.61,
    "900": 194.8
  },
  "light-blue": {
    "50": 242.06,
    "100": 242.06,
    "200": 242.06,
    "300": 241.15,
    "400": 238.26,
    "500": 235.61,
    "600": 233.87,
    "700": 233.04,
    "800": 232.11,
    "900": 231.71
  },
  "blue": {
    "50": 257.89,
    "100": 257.89,
    "200": 257.89,
    "300": 258.09,
    "400": 258.14,
    "500": 257.96,
    "600": 256.06,
    "700": 254.2,
    "800": 250.59,
    "900": 248.22
  },
  "purple": {
    "50": 288.21,
    "100": 288.21,
    "200": 288.21,
    "300": 287.9,
    "400": 287.84,
    "500": 288.47,
    "600": 288.46,
    "700": 288.61,
    "800": 288.53,
    "900": 288.02
  }
} as const;

/** Dark-scale chroma before gamut fitting: a share of the family's light peak, highest at 500. */
export const darkSourceChroma = {
  "pink": {
    "50": 0.0484,
    "100": 0.0792,
    "200": 0.1144,
    "300": 0.154,
    "400": 0.1937,
    "500": 0.2201,
    "600": 0.2047,
    "700": 0.1628,
    "800": 0.11,
    "900": 0.055
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
    "50": 0.0411,
    "100": 0.0672,
    "200": 0.0971,
    "300": 0.1307,
    "400": 0.1643,
    "500": 0.1867,
    "600": 0.1736,
    "700": 0.1382,
    "800": 0.0934,
    "900": 0.0467
  },
  "yellow": {
    "50": 0.0375,
    "100": 0.0614,
    "200": 0.0887,
    "300": 0.1194,
    "400": 0.1501,
    "500": 0.1705,
    "600": 0.1586,
    "700": 0.1262,
    "800": 0.0853,
    "900": 0.0426
  },
  "light-green": {
    "50": 0.0402,
    "100": 0.0658,
    "200": 0.0951,
    "300": 0.128,
    "400": 0.1609,
    "500": 0.1828,
    "600": 0.17,
    "700": 0.1353,
    "800": 0.0914,
    "900": 0.0457
  },
  "green": {
    "50": 0.0343,
    "100": 0.0561,
    "200": 0.081,
    "300": 0.1091,
    "400": 0.1371,
    "500": 0.1558,
    "600": 0.1449,
    "700": 0.1153,
    "800": 0.0779,
    "900": 0.039
  },
  "cyan": {
    "50": 0.027,
    "100": 0.0443,
    "200": 0.0639,
    "300": 0.0861,
    "400": 0.1082,
    "500": 0.1229,
    "600": 0.1143,
    "700": 0.091,
    "800": 0.0615,
    "900": 0.0307
  },
  "light-blue": {
    "50": 0.0332,
    "100": 0.0543,
    "200": 0.0785,
    "300": 0.1057,
    "400": 0.1328,
    "500": 0.1509,
    "600": 0.1404,
    "700": 0.1117,
    "800": 0.0755,
    "900": 0.0377
  },
  "blue": {
    "50": 0.0442,
    "100": 0.0724,
    "200": 0.1045,
    "300": 0.1407,
    "400": 0.1769,
    "500": 0.201,
    "600": 0.187,
    "700": 0.1488,
    "800": 0.1005,
    "900": 0.0503
  },
  "purple": {
    "50": 0.0449,
    "100": 0.0734,
    "200": 0.106,
    "300": 0.1427,
    "400": 0.1794,
    "500": 0.2039,
    "600": 0.1896,
    "700": 0.1509,
    "800": 0.1019,
    "900": 0.051
  }
} as const;
