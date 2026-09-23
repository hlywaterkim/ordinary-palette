export const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

export type ColorStep = (typeof steps)[number];
export type ColorScale = Record<ColorStep, string>;

export const opacitySteps = ["00", "05", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"] as const;

export type OpacityStep = (typeof opacitySteps)[number];
export type OpacityScale = Record<OpacityStep, string>;

/** Light-scale yellow OKLCH L minus blue L. Zero on step 50, which every color family shares. Positive from 100, where yellow stays lighter than blue. */
export const yellowLightnessOffset = {
  50: 0,
  100: 1.9,
  200: 5.8,
  300: 10,
  400: 14.7,
  500: 19.5,
  600: 21.6,
  700: 22.4,
  800: 22.4,
  900: 19.8,
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
// Every chromatic family except yellow shares one lightness curve, within about 1 L of blue on each step.
// From 500, each step falls about 7.5 L and keeps what chroma sRGB allows,
// so 700–900 stay apart and each family keeps its own color instead of settling into brown.
// Pink sits at hue 356, a true pink, so it stays apart from red (ΔE OK above 0.1 at 500).
export const pink = {
  50: "#feeff4",
  100: "#fcdee8",
  200: "#f9bfd3",
  300: "#ff95be",
  400: "#ff61a7",
  500: "#e7388d",
  600: "#ca1476",
  700: "#a80061",
  800: "#85004b",
  900: "#650038",
} as const satisfies ColorScale;

export const red = {
  50: "#feefed",
  100: "#ffdfd9",
  200: "#fcc1b6",
  300: "#ff9a8b",
  400: "#ff6a58",
  500: "#ee3828",
  600: "#d11003",
  700: "#ad0200",
  800: "#870600",
  900: "#660200",
} as const satisfies ColorScale;

// Orange sits near #ff7700 at 500 (hue 50, chroma about 0.19). Pale steps lean toward apricot (hue 60), dark steps toward 43.
export const orange = {
  50: "#fcf1e8",
  100: "#fae2d0",
  200: "#f5c8a4",
  300: "#f7aa72",
  400: "#f3833c",
  500: "#de6100",
  600: "#bb4f00",
  700: "#9c3e00",
  800: "#7c2f00",
  900: "#602100",
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
  50: "#f0f5e9",
  100: "#e2ecd2",
  200: "#c8daa7",
  300: "#aacd5d",
  400: "#8cb809",
  500: "#739c00",
  600: "#5d8300",
  700: "#4a6b00",
  800: "#375500",
  900: "#284100",
} as const satisfies ColorScale;

export const green = {
  50: "#ebf6ed",
  100: "#d5efdd",
  200: "#afe0be",
  300: "#7bd59a",
  400: "#4dbf7a",
  500: "#21a65b",
  600: "#008b4b",
  700: "#00723c",
  800: "#005a2e",
  900: "#004422",
} as const satisfies ColorScale;

// Cyan at hue 195: aqua like #00ffff at the pale end, teal like #008080 at the dark end. Lighter than the other
// families from 300, because this hue only holds chroma at high lightness in sRGB.
export const cyan = {
  50: "#e7f7f7",
  100: "#cdf0ef",
  200: "#9be1e1",
  300: "#44d5d7",
  400: "#18bcbe",
  500: "#00a0a0",
  600: "#008686",
  700: "#006d6d",
  800: "#005656",
  900: "#004141",
} as const satisfies ColorScale;

// Sky blue between cyan and blue. Hue runs 232–242, and from 300 it stays lighter than blue.
export const lightBlue = {
  50: "#e8f6fc",
  100: "#d0ecfb",
  200: "#a4dbf8",
  300: "#64cbff",
  400: "#01b3f5",
  500: "#0097d3",
  600: "#007db5",
  700: "#006697",
  800: "#004f79",
  900: "#003c5e",
} as const satisfies ColorScale;

// Pale steps hold hue near 245–251 so they stay apart from light-blue.
// 500 is the main step: 600 and 700 stay just under its chroma so 600 does not read as the brand blue.
export const blue = {
  50: "#eaf5fe",
  100: "#d5eaff",
  200: "#b0d6ff",
  300: "#8abeff",
  400: "#5fa4ff",
  500: "#2b84ff",
  600: "#126be0",
  700: "#0056bd",
  800: "#004395",
  900: "#003272",
} as const satisfies ColorScale;

// Purple sits at hue 288, just past indigo toward violet, so it stays apart from blue.
export const purple = {
  50: "#f1f3ff",
  100: "#e6e4ff",
  200: "#cfcbfe",
  300: "#b4abff",
  400: "#9d8bff",
  500: "#8568f6",
  600: "#6e4fdb",
  700: "#5a39bc",
  800: "#47259c",
  900: "#36117e",
} as const satisfies ColorScale;

// Warm brown between orange and gray (hue 52–62), with low chroma so it reads as wood and earth, not orange.
export const brown = {
  50: "#f8f2ec",
  100: "#f3e5d9",
  200: "#e6cdb9",
  300: "#d3b090",
  400: "#c1956f",
  500: "#aa7a53",
  600: "#91633e",
  700: "#784f2e",
  800: "#5f3b20",
  900: "#482b14",
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
  50: "#3b232c",
  100: "#512939",
  200: "#6b3249",
  300: "#9a2b5f",
  400: "#c22d76",
  500: "#eb3c90",
  600: "#ff66a9",
  700: "#ff96bf",
  800: "#ffbcd4",
  900: "#ffdee9",
} as const satisfies ColorScale;

export const darkRed = {
  50: "#3d241f",
  100: "#542b24",
  200: "#6e342b",
  300: "#a02c21",
  400: "#c92e20",
  500: "#f23c2c",
  600: "#ff705e",
  700: "#ff9c8d",
  800: "#ffc0b4",
  900: "#ffe0da",
} as const satisfies ColorScale;

export const darkOrange = {
  50: "#3c251b",
  100: "#522c1c",
  200: "#6d371e",
  300: "#934115",
  400: "#ba4f02",
  500: "#e2640a",
  600: "#f78339",
  700: "#fda665",
  800: "#fec698",
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
  100: "#2d3e1a",
  200: "#39501a",
  300: "#486900",
  400: "#5d8300",
  500: "#769f00",
  600: "#8fb832",
  700: "#abcb67",
  800: "#c7dd9b",
  900: "#e1eecd",
} as const satisfies ColorScale;

export const darkGreen = {
  50: "#1b3122",
  100: "#1a4129",
  200: "#1a5531",
  300: "#1a6e3f",
  400: "#108b4d",
  500: "#26a95e",
  600: "#4fc17c",
  700: "#7ed39b",
  800: "#abe2bc",
  900: "#d4f0dd",
} as const satisfies ColorScale;

export const darkCyan = {
  50: "#0e3231",
  100: "#004141",
  200: "#005353",
  300: "#006b6b",
  400: "#008585",
  500: "#00a3a3",
  600: "#3abcbe",
  700: "#72cfd0",
  800: "#a5e0df",
  900: "#d2efee",
} as const satisfies ColorScale;

export const darkLightBlue = {
  50: "#182e3e",
  100: "#163b55",
  200: "#104c71",
  300: "#086392",
  400: "#007db5",
  500: "#009ad7",
  600: "#34b4f0",
  700: "#6cc9f9",
  800: "#a0dcfc",
  900: "#d0edfd",
} as const satisfies ColorScale;

export const darkBlue = {
  50: "#1f2c3f",
  100: "#233858",
  200: "#294875",
  300: "#2259a9",
  400: "#246ed7",
  500: "#3388ff",
  600: "#63a6ff",
  700: "#8cbfff",
  800: "#b0d6ff",
  900: "#d6ebff",
} as const satisfies ColorScale;

export const darkPurple = {
  50: "#2a283e",
  100: "#373256",
  200: "#463f72",
  300: "#5a49a5",
  400: "#6f58d1",
  500: "#886bfa",
  600: "#a08fff",
  700: "#b6aeff",
  800: "#cecaff",
  900: "#e6e5ff",
} as const satisfies ColorScale;

export const darkBrown = {
  50: "#342921",
  100: "#443429",
  200: "#594231",
  300: "#73533b",
  400: "#906646",
  500: "#ad7d56",
  600: "#c59872",
  700: "#d6b392",
  800: "#e6ccb7",
  900: "#f2e5da",
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
  "brown",
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
  brown,
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
  brown: darkBrown,
  "cool-gray": darkCoolGray,
  "neutral-gray": darkNeutralGray,
} as const;

export type Colors = typeof colors;
export type DarkColors = typeof darkColors;

/** Primitive hue used when mapping. Gamut fitting may lower chroma and must not change this hue. */
export const sourceHue = {
  "pink": {
    "50": 355,
    "100": 355.77,
    "200": 356.45,
    "300": 356.06,
    "400": 355.89,
    "500": 356.2,
    "600": 356.13,
    "700": 355.72,
    "800": 355.9,
    "900": 356.13
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
    "400": 50,
    "500": 47,
    "600": 46,
    "700": 44.9,
    "800": 44.37,
    "900": 42.79
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
    "600": 127.33,
    "700": 127.74,
    "800": 128.95,
    "900": 129.85
  },
  "green": {
    "50": 151.77,
    "100": 155,
    "200": 154.23,
    "300": 153.93,
    "400": 153.92,
    "500": 152.61,
    "600": 153.64,
    "700": 153.64,
    "800": 153.58,
    "900": 153.62
  },
  "cyan": {
    "50": 196.79,
    "100": 194.8,
    "200": 195.61,
    "300": 196.44,
    "400": 196.25,
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
    "600": 238.26,
    "700": 239.77,
    "800": 241.15,
    "900": 242.06
  },
  "blue": {
    "50": 242.96,
    "100": 248.22,
    "200": 250.59,
    "300": 254.2,
    "400": 256.06,
    "500": 257.96,
    "600": 258.14,
    "700": 258.09,
    "800": 258,
    "900": 257.89
  },
  "purple": {
    "50": 280.48,
    "100": 288.02,
    "200": 288.53,
    "300": 288.61,
    "400": 288.46,
    "500": 288.47,
    "600": 287.84,
    "700": 287.9,
    "800": 288.28,
    "900": 288.21
  },
  "brown": {
    "50": 67.68,
    "100": 61.99,
    "200": 61.77,
    "300": 63.95,
    "400": 62.23,
    "500": 60.07,
    "600": 58.93,
    "700": 57.71,
    "800": 56.34,
    "900": 56.1
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
    "50": 0.017,
    "100": 0.036,
    "200": 0.07,
    "300": 0.1354,
    "400": 0.2029,
    "500": 0.2201,
    "600": 0.2171,
    "700": 0.2065,
    "800": 0.1824,
    "900": 0.1596
  },
  "red": {
    "50": 0.017,
    "100": 0.036,
    "200": 0.07,
    "300": 0.1332,
    "400": 0.1992,
    "500": 0.2197,
    "600": 0.2182,
    "700": 0.2071,
    "800": 0.1841,
    "900": 0.1664
  },
  "orange": {
    "50": 0.017,
    "100": 0.036,
    "200": 0.07,
    "300": 0.1163,
    "400": 0.16,
    "500": 0.1867,
    "600": 0.1761,
    "700": 0.1648,
    "800": 0.1518,
    "900": 0.1414
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
    "50": 0.017,
    "100": 0.036,
    "200": 0.07,
    "300": 0.145,
    "400": 0.1802,
    "500": 0.1828,
    "600": 0.1648,
    "700": 0.1441,
    "800": 0.1336,
    "900": 0.123
  },
  "green": {
    "50": 0.017,
    "100": 0.036,
    "200": 0.07,
    "300": 0.1215,
    "400": 0.1452,
    "500": 0.1558,
    "600": 0.15,
    "700": 0.1359,
    "800": 0.1232,
    "900": 0.1122
  },
  "cyan": {
    "50": 0.017,
    "100": 0.036,
    "200": 0.07,
    "300": 0.1197,
    "400": 0.12,
    "500": 0.1229,
    "600": 0.1086,
    "700": 0.0938,
    "800": 0.0853,
    "900": 0.0767
  },
  "light-blue": {
    "50": 0.017,
    "100": 0.036,
    "200": 0.07,
    "300": 0.1206,
    "400": 0.1509,
    "500": 0.1499,
    "600": 0.1396,
    "700": 0.1267,
    "800": 0.1179,
    "900": 0.1081
  },
  "blue": {
    "50": 0.017,
    "100": 0.036,
    "200": 0.07,
    "300": 0.1154,
    "400": 0.1612,
    "500": 0.201,
    "600": 0.1944,
    "700": 0.1861,
    "800": 0.1716,
    "900": 0.1548
  },
  "purple": {
    "50": 0.017,
    "100": 0.036,
    "200": 0.07,
    "300": 0.1204,
    "400": 0.1735,
    "500": 0.2039,
    "600": 0.2031,
    "700": 0.1931,
    "800": 0.1789,
    "900": 0.1631
  },
  "brown": {
    "50": 0.0102,
    "100": 0.0225,
    "200": 0.0391,
    "300": 0.0599,
    "400": 0.075,
    "500": 0.0803,
    "600": 0.0786,
    "700": 0.0725,
    "800": 0.0648,
    "900": 0.0564
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
    "50": 355.74,
    "100": 355.74,
    "200": 356,
    "300": 355.64,
    "400": 356.14,
    "500": 356.2,
    "600": 356,
    "700": 355.97,
    "800": 356.15,
    "900": 355.66
  },
  "red": {
    "50": 29.69,
    "100": 29.69,
    "200": 29.99,
    "300": 29.38,
    "400": 29.79,
    "500": 29.7,
    "600": 29.4,
    "700": 29.19,
    "800": 30.6,
    "900": 30.37
  },
  "orange": {
    "50": 43.17,
    "100": 43.17,
    "200": 44.42,
    "300": 44.85,
    "400": 46.27,
    "500": 46.99,
    "600": 49.87,
    "700": 56.24,
    "800": 60.34,
    "900": 59.2
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
    "50": 129.88,
    "100": 129.88,
    "200": 129.24,
    "300": 127.74,
    "400": 127.19,
    "500": 126.07,
    "600": 125.11,
    "700": 124.09,
    "800": 123.66,
    "900": 124.27
  },
  "green": {
    "50": 153.96,
    "100": 153.96,
    "200": 153.52,
    "300": 153.58,
    "400": 153.76,
    "500": 152.55,
    "600": 153.86,
    "700": 153.99,
    "800": 154.46,
    "900": 155.4
  },
  "cyan": {
    "50": 194.77,
    "100": 194.77,
    "200": 194.77,
    "300": 194.77,
    "400": 194.77,
    "500": 194.77,
    "600": 196.22,
    "700": 196.38,
    "800": 195.93,
    "900": 194.42
  },
  "light-blue": {
    "50": 241.9,
    "100": 241.9,
    "200": 241.45,
    "300": 239.71,
    "400": 238.45,
    "500": 235.72,
    "600": 234.09,
    "700": 233.04,
    "800": 231.56,
    "900": 231.11
  },
  "blue": {
    "50": 257.73,
    "100": 257.73,
    "200": 257.9,
    "300": 258.12,
    "400": 258.26,
    "500": 257.96,
    "600": 256,
    "700": 254.45,
    "800": 250.59,
    "900": 248.22
  },
  "purple": {
    "50": 288.64,
    "100": 288.64,
    "200": 288.2,
    "300": 287.97,
    "400": 287.76,
    "500": 288.38,
    "600": 288.52,
    "700": 288.24,
    "800": 288.42,
    "900": 289.07
  },
  "brown": {
    "50": 57.37,
    "100": 57.37,
    "200": 56.26,
    "300": 58.5,
    "400": 58.84,
    "500": 59.63,
    "600": 61.98,
    "700": 64.22,
    "800": 60.93,
    "900": 63.2
  }
} as const;

/** Dark-scale chroma before gamut fitting: a share of the family's light peak, highest at 500. */
export const darkSourceChroma = {
  "pink": {
    "50": 0.04,
    "100": 0.062,
    "200": 0.085,
    "300": 0.154,
    "400": 0.1937,
    "500": 0.2201,
    "600": 0.2047,
    "700": 0.1628,
    "800": 0.11,
    "900": 0.055
  },
  "red": {
    "50": 0.04,
    "100": 0.062,
    "200": 0.085,
    "300": 0.1538,
    "400": 0.1933,
    "500": 0.2197,
    "600": 0.2043,
    "700": 0.1626,
    "800": 0.1098,
    "900": 0.0549
  },
  "orange": {
    "50": 0.04,
    "100": 0.062,
    "200": 0.085,
    "300": 0.1238,
    "400": 0.1556,
    "500": 0.1768,
    "600": 0.1644,
    "700": 0.1308,
    "800": 0.0884,
    "900": 0.0442
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
    "50": 0.04,
    "100": 0.062,
    "200": 0.085,
    "300": 0.1263,
    "400": 0.1588,
    "500": 0.1804,
    "600": 0.1678,
    "700": 0.1335,
    "800": 0.0902,
    "900": 0.0451
  },
  "green": {
    "50": 0.04,
    "100": 0.062,
    "200": 0.085,
    "300": 0.1092,
    "400": 0.1373,
    "500": 0.156,
    "600": 0.1451,
    "700": 0.1155,
    "800": 0.078,
    "900": 0.039
  },
  "cyan": {
    "50": 0.04,
    "100": 0.062,
    "200": 0.085,
    "300": 0.0839,
    "400": 0.1055,
    "500": 0.1199,
    "600": 0.1115,
    "700": 0.0887,
    "800": 0.0599,
    "900": 0.03
  },
  "light-blue": {
    "50": 0.04,
    "100": 0.062,
    "200": 0.085,
    "300": 0.1059,
    "400": 0.1331,
    "500": 0.1513,
    "600": 0.1407,
    "700": 0.112,
    "800": 0.0756,
    "900": 0.0378
  },
  "blue": {
    "50": 0.04,
    "100": 0.062,
    "200": 0.085,
    "300": 0.1407,
    "400": 0.1769,
    "500": 0.201,
    "600": 0.187,
    "700": 0.1488,
    "800": 0.1005,
    "900": 0.0503
  },
  "purple": {
    "50": 0.04,
    "100": 0.062,
    "200": 0.085,
    "300": 0.1424,
    "400": 0.179,
    "500": 0.2034,
    "600": 0.1891,
    "700": 0.1505,
    "800": 0.1017,
    "900": 0.0508
  },
  "brown": {
    "50": 0.022,
    "100": 0.0291,
    "200": 0.042,
    "300": 0.0565,
    "400": 0.071,
    "500": 0.0807,
    "600": 0.0751,
    "700": 0.0597,
    "800": 0.0404,
    "900": 0.0202
  }
} as const;
