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
  600: "#ca1476",
  700: "#a80061",
  800: "#85004b",
  900: "#650038",
} as const satisfies ColorScale;

export const red = {
  50: "#fcf0ee",
  100: "#ffdfd9",
  200: "#fdc1b6",
  300: "#ff9383",
  400: "#ff5e4c",
  500: "#ee3828",
  600: "#d11003",
  700: "#ad0200",
  800: "#870600",
  900: "#660200",
} as const satisfies ColorScale;

// Orange sits near #ff7700 at 500 (hue 50, chroma about 0.19). Pale steps lean toward apricot (hue 60), dark steps toward 43.
export const orange = {
  50: "#fff0e5",
  100: "#ffe1ca",
  200: "#ffc494",
  300: "#faac74",
  400: "#f38539",
  500: "#e26a00",
  600: "#c25500",
  700: "#a44200",
  800: "#843300",
  900: "#692400",
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
  300: "#add060",
  400: "#8db90e",
  500: "#79a300",
  600: "#618900",
  700: "#4f7200",
  800: "#3c5b00",
  900: "#2c4600",
} as const satisfies ColorScale;

export const green = {
  50: "#ecf6ee",
  100: "#d0f1da",
  200: "#a6e3b9",
  300: "#78d297",
  400: "#4abd78",
  500: "#26a95e",
  600: "#00904d",
  700: "#00763e",
  800: "#005d30",
  900: "#004824",
} as const satisfies ColorScale;

// Cyan at hue 195: aqua like #00ffff at the pale end, teal like #008080 at the dark end. Lighter than the other
// families from 300, because this hue only holds chroma at high lightness in sRGB.
export const cyan = {
  50: "#e3f8f8",
  100: "#c0f3f2",
  200: "#86e5e5",
  300: "#48d8da",
  400: "#08bec0",
  500: "#00a7a7",
  600: "#008c8c",
  700: "#007474",
  800: "#005c5c",
  900: "#004747",
} as const satisfies ColorScale;

// Sky blue between cyan and blue. Hue runs 232–242, and from 300 it stays lighter than blue.
export const lightBlue = {
  50: "#e7f6fd",
  100: "#ccedff",
  200: "#9adcff",
  300: "#64cbff",
  400: "#06b4f6",
  500: "#009ddc",
  600: "#0083bd",
  700: "#006c9f",
  800: "#005581",
  900: "#004166",
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
  600: "#126be0",
  700: "#0056bd",
  800: "#004395",
  900: "#003272",
} as const satisfies ColorScale;

// Purple sits at hue 288, just past indigo toward violet, so it stays apart from blue.
export const purple = {
  50: "#f2f3fb",
  100: "#e6e5fa",
  200: "#cfcbfd",
  300: "#b0a6fb",
  400: "#9581fa",
  500: "#8163f1",
  600: "#6a4ad6",
  700: "#5634b7",
  800: "#431f97",
  900: "#320979",
} as const satisfies ColorScale;

// Warm brown between orange and gray (hue 52–62), with low chroma so it reads as wood and earth, not orange.
export const brown = {
  50: "#f9f2eb",
  100: "#f5e4d6",
  200: "#e9ccb4",
  300: "#d3a784",
  400: "#bc865c",
  500: "#aa7045",
  600: "#915930",
  700: "#774521",
  800: "#5e3214",
  900: "#462208",
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
  200: "#75274a",
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
  200: "#79291f",
  300: "#a53126",
  400: "#d03627",
  500: "#f23c2c",
  600: "#ff6351",
  700: "#ff9282",
  800: "#ffbaad",
  900: "#ffe0da",
} as const satisfies ColorScale;

export const darkOrange = {
  50: "#3c251c",
  100: "#532c1c",
  200: "#6f351a",
  300: "#9b491f",
  400: "#c45b17",
  500: "#e66d0a",
  600: "#f48437",
  700: "#faa465",
  800: "#fcc497",
  900: "#ffe2cc",
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
  100: "#2d3e18",
  200: "#385111",
  300: "#4f710c",
  400: "#658e00",
  500: "#7ca600",
  600: "#8fb82b",
  700: "#a9ca65",
  800: "#c5db9a",
  900: "#e1eecd",
} as const satisfies ColorScale;

export const darkGreen = {
  50: "#1e3023",
  100: "#1e402a",
  200: "#1d5433",
  300: "#237444",
  400: "#229354",
  500: "#2bac61",
  600: "#4cbe79",
  700: "#7bcf97",
  800: "#a8e0b9",
  900: "#d4f0dd",
} as const satisfies ColorScale;

export const darkCyan = {
  50: "#1b302f",
  100: "#173f3f",
  200: "#0c5252",
  300: "#007373",
  400: "#009191",
  500: "#00aaaa",
  600: "#32bcbe",
  700: "#6dcecf",
  800: "#a1dede",
  900: "#d1efee",
} as const satisfies ColorScale;

export const darkLightBlue = {
  50: "#1c2d3b",
  100: "#1c3b52",
  200: "#174c6e",
  300: "#156b99",
  400: "#0087c3",
  500: "#00a0e0",
  600: "#2cb3f1",
  700: "#6ac7f7",
  800: "#9edafa",
  900: "#d0edfd",
} as const satisfies ColorScale;

export const darkBlue = {
  50: "#1d2c41",
  100: "#1f385d",
  200: "#20477f",
  300: "#275eaf",
  400: "#2b74de",
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
  500: "#8466f5",
  600: "#9782ff",
  700: "#afa3ff",
  800: "#c9c4ff",
  900: "#e6e5ff",
} as const satisfies ColorScale;

export const darkBrown = {
  50: "#342922",
  100: "#463328",
  200: "#5d402f",
  300: "#7a5339",
  400: "#976440",
  500: "#ad7348",
  600: "#c08a60",
  700: "#d2a784",
  800: "#e3c5ad",
  900: "#f4e5d8",
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
    "400": 51.77,
    "500": 49.96,
    "600": 47.4,
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
    "300": 59.95,
    "400": 58.23,
    "500": 56.07,
    "600": 54.93,
    "700": 53.71,
    "800": 52.34,
    "900": 52.1
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
    "50": 0.0139,
    "100": 0.0391,
    "200": 0.0784,
    "300": 0.1354,
    "400": 0.2029,
    "500": 0.2201,
    "600": 0.2171,
    "700": 0.2065,
    "800": 0.1824,
    "900": 0.1596
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
    "50": 0.0236,
    "100": 0.0591,
    "200": 0.0993,
    "300": 0.145,
    "400": 0.1802,
    "500": 0.1828,
    "600": 0.1648,
    "700": 0.1441,
    "800": 0.1336,
    "900": 0.123
  },
  "green": {
    "50": 0.0149,
    "100": 0.0463,
    "200": 0.0851,
    "300": 0.1215,
    "400": 0.1452,
    "500": 0.1558,
    "600": 0.15,
    "700": 0.1359,
    "800": 0.1232,
    "900": 0.1122
  },
  "cyan": {
    "50": 0.022,
    "100": 0.0519,
    "200": 0.0904,
    "300": 0.1197,
    "400": 0.1229,
    "500": 0.1229,
    "600": 0.1086,
    "700": 0.0938,
    "800": 0.0853,
    "900": 0.0767
  },
  "light-blue": {
    "50": 0.0185,
    "100": 0.0424,
    "200": 0.0824,
    "300": 0.1206,
    "400": 0.1509,
    "500": 0.1499,
    "600": 0.1396,
    "700": 0.1267,
    "800": 0.1179,
    "900": 0.1081
  },
  "blue": {
    "50": 0.0185,
    "100": 0.0363,
    "200": 0.0701,
    "300": 0.1154,
    "400": 0.1612,
    "500": 0.201,
    "600": 0.1944,
    "700": 0.1861,
    "800": 0.1716,
    "900": 0.1548
  },
  "purple": {
    "50": 0.0107,
    "100": 0.0283,
    "200": 0.069,
    "300": 0.1204,
    "400": 0.1735,
    "500": 0.2039,
    "600": 0.2031,
    "700": 0.1931,
    "800": 0.1789,
    "900": 0.1631
  },
  "brown": {
    "50": 0.012,
    "100": 0.0264,
    "200": 0.046,
    "300": 0.0704,
    "400": 0.0882,
    "500": 0.0945,
    "600": 0.0924,
    "700": 0.0853,
    "800": 0.0763,
    "900": 0.0663
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
    "600": 355.89,
    "700": 356.06,
    "800": 356.45,
    "900": 355.77
  },
  "red": {
    "50": 29.69,
    "100": 29.69,
    "200": 29.99,
    "300": 29.38,
    "400": 29.79,
    "500": 29.7,
    "600": 29.45,
    "700": 29.37,
    "800": 30.41,
    "900": 30.37
  },
  "orange": {
    "50": 42.59,
    "100": 42.59,
    "200": 44.69,
    "300": 45.06,
    "400": 47.53,
    "500": 49.96,
    "600": 51.62,
    "700": 55.91,
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
    "50": 129.55,
    "100": 129.55,
    "200": 128.87,
    "300": 127.78,
    "400": 127.34,
    "500": 125.85,
    "600": 125.11,
    "700": 124.03,
    "800": 123.83,
    "900": 124.14
  },
  "green": {
    "50": 153.75,
    "100": 153.75,
    "200": 153.65,
    "300": 153.46,
    "400": 153.46,
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
    "600": 196.14,
    "700": 196.4,
    "800": 195.61,
    "900": 194.8
  },
  "light-blue": {
    "50": 242.39,
    "100": 242.39,
    "200": 241.04,
    "300": 239.43,
    "400": 238.26,
    "500": 236.07,
    "600": 234.08,
    "700": 233.04,
    "800": 232.11,
    "900": 231.71
  },
  "blue": {
    "50": 257.73,
    "100": 257.73,
    "200": 257.9,
    "300": 258.12,
    "400": 258.26,
    "500": 257.96,
    "600": 256.06,
    "700": 254.2,
    "800": 250.59,
    "900": 248.22
  },
  "purple": {
    "50": 288.35,
    "100": 288.07,
    "200": 288.07,
    "300": 287.86,
    "400": 287.75,
    "500": 288.47,
    "600": 288.46,
    "700": 288.61,
    "800": 288.53,
    "900": 288.02
  },
  "brown": {
    "50": 52.43,
    "100": 52.11,
    "200": 52.11,
    "300": 54.16,
    "400": 55.18,
    "500": 56.32,
    "600": 58.39,
    "700": 59.95,
    "800": 61.77,
    "900": 61.99
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
    "50": 0.0383,
    "100": 0.0627,
    "200": 0.0905,
    "300": 0.1218,
    "400": 0.1532,
    "500": 0.1741,
    "600": 0.1619,
    "700": 0.1288,
    "800": 0.087,
    "900": 0.0435
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
    "50": 0.0396,
    "100": 0.0649,
    "200": 0.0937,
    "300": 0.1261,
    "400": 0.1586,
    "500": 0.1802,
    "600": 0.1676,
    "700": 0.1333,
    "800": 0.0901,
    "900": 0.045
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
    "50": 0.0271,
    "100": 0.0443,
    "200": 0.064,
    "300": 0.0861,
    "400": 0.1082,
    "500": 0.123,
    "600": 0.1144,
    "700": 0.091,
    "800": 0.0615,
    "900": 0.0307
  },
  "light-blue": {
    "50": 0.0333,
    "100": 0.0544,
    "200": 0.0786,
    "300": 0.1059,
    "400": 0.1331,
    "500": 0.1512,
    "600": 0.1406,
    "700": 0.1119,
    "800": 0.0756,
    "900": 0.0378
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
  },
  "brown": {
    "50": 0.0207,
    "100": 0.0339,
    "200": 0.0489,
    "300": 0.0658,
    "400": 0.0828,
    "500": 0.0941,
    "600": 0.0875,
    "700": 0.0696,
    "800": 0.047,
    "900": 0.0235
  }
} as const;
