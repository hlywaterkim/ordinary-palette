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
  500: 26,
  600: 29.4,
  700: 32.8,
  800: 36.4,
  900: 40.8,
} as const;

/** Dark-scale yellow OKLCH L minus dark cool-gray lightness. Matches the light yellow offset, so yellow stays lighter than blue. */
export const darkYellowLightnessOffset = {
  50: 0,
  100: 0,
  200: 0,
  300: 9.2,
  400: 18,
  500: 26,
  600: 29.4,
  700: 32.8,
  800: 36.4,
  900: 40.8,
} as const;

/**
 * Dark steps whose OKLCH L is raised above that family's own dark lightness so chroma can reach
 * 0.9× the light step without moving hue. The number is that raised L on a 0–100 scale.
 * cool-gray is not listed. neutral-gray stays chroma 0.
 */
export const darkChromaLightnessExceptions = {
  lime: { 500: 58, 600: 56, 700: 52, 800: 46.6, 900: 40.4 },
  teal: { 500: 52.2, 600: 49.6, 700: 43.2 },
} as const;

/** Dark cool-gray OKLCH L. Same fall as the light cool-gray ramp, shifted darker. Chromatic families keep their own lightness. */
export const darkLightness = {
  50: 83.4,
  100: 79.8,
  200: 73.2,
  300: 62.4,
  400: 50,
  500: 38.2,
  600: 31.6,
  700: 25.4,
  800: 19.2,
  900: 12.4,
} as const;

export const pink = {
  50: "#fbf0f1",
  100: "#fedee1",
  200: "#ffbec4",
  300: "#ff93a1",
  400: "#f56881",
  500: "#e34a6a",
  600: "#cd405e",
  700: "#b63e56",
  800: "#a03c4f",
  900: "#8b3e4a",
} as const satisfies ColorScale;

export const red = {
  50: "#fcf0ee",
  100: "#ffdfd9",
  200: "#fdc1b6",
  300: "#ff9383",
  400: "#f76755",
  500: "#e54837",
  600: "#cf3e2e",
  700: "#b73b2e",
  800: "#9c3e32",
  900: "#8c392e",
} as const satisfies ColorScale;

export const orange = {
  50: "#fdf0eb",
  100: "#fee0d4",
  200: "#fec2aa",
  300: "#ffaf90",
  400: "#fb9266",
  500: "#ec7d4f",
  600: "#db7347",
  700: "#c96d46",
  800: "#ba6644",
  900: "#ad6146",
} as const satisfies ColorScale;

// Steps 50–200 share cool-gray lightness. From 300, yellow stays lighter than blue.
// Hue stays within 15° of step 50. Chroma peaks around 500 and eases, so 900 stays gold.
export const yellow = {
  50: "#fbf2e3",
  100: "#f7e5c5",
  200: "#eccd97",
  300: "#f1c576",
  400: "#ebb856",
  500: "#e1ab39",
  600: "#d3a240",
  700: "#ca9936",
  800: "#bf9237",
  900: "#b68b34",
} as const satisfies ColorScale;

export const lime = {
  50: "#f3f5e7",
  100: "#e7ebc9",
  200: "#d0d89f",
  300: "#bcc970",
  400: "#a4b44b",
  500: "#9a9e18",
  600: "#8d9008",
  700: "#88810a",
  800: "#827418",
  900: "#7b6a22",
} as const satisfies ColorScale;

export const green = {
  50: "#edf6ef",
  100: "#d3f0db",
  200: "#abe1bc",
  300: "#81d09b",
  400: "#59bb7d",
  500: "#3ca764",
  600: "#2e985b",
  700: "#2d8953",
  800: "#307c4d",
  900: "#2f7148",
} as const satisfies ColorScale;

export const teal = {
  50: "#ecf6f1",
  100: "#d3efe3",
  200: "#acdfca",
  300: "#7ccaac",
  400: "#4fb491",
  500: "#26a07c",
  600: "#1e916f",
  700: "#248164",
  800: "#28735a",
  900: "#276751",
} as const satisfies ColorScale;

export const cloudyBlue = {
  50: "#edf4fd",
  100: "#d9e9ff",
  200: "#b6d4fe",
  300: "#92baf5",
  400: "#73a1e5",
  500: "#598cd5",
  600: "#4f7ec3",
  700: "#4771ae",
  800: "#41669c",
  900: "#3e5e8c",
} as const satisfies ColorScale;

export const blue = {
  50: "#e8f6fc",
  100: "#cdedfe",
  200: "#a1daff",
  300: "#78bdfc",
  400: "#50a0f9",
  500: "#4287eb",
  600: "#3978d5",
  700: "#356cbd",
  800: "#3161a7",
  900: "#305894",
} as const satisfies ColorScale;

export const purple = {
  50: "#f1f3fa",
  100: "#e3e6f9",
  200: "#c7cefe",
  300: "#a2abfd",
  400: "#8289fc",
  500: "#6c6feb",
  600: "#5f62d4",
  700: "#5457ba",
  800: "#4b4ea1",
  900: "#43468e",
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

export const darkPink = {
  50: "#d0c6c6",
  100: "#d3b4b7",
  200: "#d3959c",
  300: "#d26a7a",
  400: "#c73d5b",
  500: "#b51546",
  600: "#a0073b",
  700: "#8a0d33",
  800: "#75112c",
  900: "#621829",
} as const satisfies ColorScale;

export const darkRed = {
  50: "#d1c6c4",
  100: "#d4b5b0",
  200: "#d1988e",
  300: "#d26b5c",
  400: "#c83b2d",
  500: "#b60d04",
  600: "#a00800",
  700: "#8b0400",
  800: "#72150d",
  900: "#63110a",
} as const satisfies ColorScale;

export const darkOrange = {
  50: "#d2c6c1",
  100: "#d3b6ab",
  200: "#d29982",
  300: "#d38768",
  400: "#ce693e",
  500: "#bf5523",
  600: "#af4b1c",
  700: "#9e461e",
  800: "#8f401c",
  900: "#833c20",
} as const satisfies ColorScale;

// Dark yellow keeps the light yellow shape, shifted darker.
// Hue stays within 15° of light yellow step 50, and chroma stays at least 90% of the light step.
export const darkYellow = {
  50: "#d0c7b9",
  100: "#ccbb9c",
  200: "#c1a46f",
  300: "#c69c4c",
  400: "#c08f25",
  500: "#b68400",
  600: "#a97a01",
  700: "#a07301",
  800: "#966c00",
  900: "#8c6500",
} as const satisfies ColorScale;

export const darkLime = {
  50: "#c8cabc",
  100: "#bcc1a0",
  200: "#a7ae77",
  300: "#949f46",
  400: "#7d8b19",
  500: "#7e8201",
  600: "#797b00",
  700: "#736d00",
  800: "#665a00",
  900: "#574800",
} as const satisfies ColorScale;

export const darkGreen = {
  50: "#c2cbc5",
  100: "#a9c5b1",
  200: "#83b793",
  300: "#58a673",
  400: "#2b9257",
  500: "#017f41",
  600: "#006f3a",
  700: "#006233",
  800: "#00562c",
  900: "#004c26",
} as const satisfies ColorScale;

export const darkTeal = {
  50: "#c1cbc7",
  100: "#a9c4b9",
  200: "#83b5a1",
  300: "#53a184",
  400: "#1b8b6b",
  500: "#007d5e",
  600: "#017558",
  700: "#006047",
  800: "#004e39",
  900: "#004230",
} as const satisfies ColorScale;

export const darkCloudyBlue = {
  50: "#c3c9d2",
  100: "#b0bed4",
  200: "#8eaad3",
  300: "#6b91ca",
  400: "#4d79ba",
  500: "#3464aa",
  600: "#2a5799",
  700: "#234b85",
  800: "#1e4174",
  900: "#1c3a65",
} as const satisfies ColorScale;

export const darkBlue = {
  50: "#becbd1",
  100: "#a4c2d3",
  200: "#78b0d3",
  300: "#4f94d0",
  400: "#2477cd",
  500: "#175ebf",
  600: "#0c51aa",
  700: "#0b4593",
  800: "#093b7e",
  900: "#0a336c",
} as const satisfies ColorScale;

export const darkPurple = {
  50: "#c7c8cf",
  100: "#b9bcce",
  200: "#9ea5d3",
  300: "#7b83d1",
  400: "#5e61d0",
  500: "#4a46bf",
  600: "#3f39a8",
  700: "#343090",
  800: "#2b2878",
  900: "#242166",
} as const satisfies ColorScale;

export const darkCoolGray = {
  50: "#c7c9ca",
  100: "#bcbdbe",
  200: "#a4a9ae",
  300: "#83888c",
  400: "#5e646a",
  500: "#3d444a",
  600: "#2e3237",
  700: "#1f2327",
  800: "#111518",
  900: "#060607",
} as const satisfies ColorScale;

export const darkNeutralGray = {
  50: "#c9c9c9",
  100: "#bdbdbd",
  200: "#a8a8a8",
  300: "#878787",
  400: "#636363",
  500: "#434343",
  600: "#323232",
  700: "#222222",
  800: "#141414",
  900: "#060606",
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
    "50": 12,
    "100": 12,
    "200": 12,
    "300": 12,
    "400": 12,
    "500": 12,
    "600": 12,
    "700": 12,
    "800": 12,
    "900": 12
  },
  "red": {
    "50": 29.65,
    "100": 29.65,
    "200": 29.65,
    "300": 29.65,
    "400": 29.65,
    "500": 29.65,
    "600": 29.86,
    "700": 29.65,
    "800": 29.65,
    "900": 29.65
  },
  "orange": {
    "50": 42.75,
    "100": 42.75,
    "200": 42.75,
    "300": 42.75,
    "400": 42.75,
    "500": 42.75,
    "600": 42.69,
    "700": 42.75,
    "800": 42.51,
    "900": 40.713
  },
  "yellow": {
    "50": 81.6,
    "100": 81.6,
    "200": 81.6,
    "300": 81.6,
    "400": 81.6,
    "500": 81.6,
    "600": 81.6,
    "700": 81.6,
    "800": 81.6,
    "900": 81.6
  },
  "lime": {
    "50": 111.973,
    "100": 113.43,
    "200": 114.538,
    "300": 115.479,
    "400": 116.763,
    "500": 111.623,
    "600": 111.078,
    "700": 105.664,
    "800": 100.683,
    "900": 95.792
  },
  "green": {
    "50": 153.7,
    "100": 153.7,
    "200": 154.313,
    "300": 153.7,
    "400": 153.7,
    "500": 152.512,
    "600": 153.7,
    "700": 153.7,
    "800": 153.7,
    "900": 153.7
  },
  "teal": {
    "50": 167.7,
    "100": 167.7,
    "200": 167.7,
    "300": 167.7,
    "400": 167.7,
    "500": 167.7,
    "600": 167.7,
    "700": 167.7,
    "800": 167.7,
    "900": 167.7
  },
  "cloudy-blue": {
    "50": 257.79,
    "100": 257.79,
    "200": 257.79,
    "300": 257.79,
    "400": 257.79,
    "500": 257.79,
    "600": 257.9,
    "700": 257.79,
    "800": 257.79,
    "900": 257.79
  },
  "blue": {
    "50": 225,
    "100": 232,
    "200": 236.873,
    "300": 247,
    "400": 253,
    "500": 258.03,
    "600": 258.03,
    "700": 258.03,
    "800": 258.03,
    "900": 258.03
  },
  "purple": {
    "50": 278.27,
    "100": 278.27,
    "200": 278.27,
    "300": 278.27,
    "400": 278.27,
    "500": 278.27,
    "600": 278.27,
    "700": 278.27,
    "800": 278.27,
    "900": 278.27
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
    "50": 0.015,
    "100": 0.0531,
    "200": 0.098,
    "300": 0.143,
    "400": 0.173,
    "500": 0.188,
    "600": 0.1767,
    "700": 0.1547,
    "800": 0.1334,
    "900": 0.112
  },
  "red": {
    "50": 0.016,
    "100": 0.0556,
    "200": 0.1024,
    "300": 0.1492,
    "400": 0.1803,
    "500": 0.196,
    "600": 0.1842,
    "700": 0.1617,
    "800": 0.1399,
    "900": 0.118
  },
  "orange": {
    "50": 0.02,
    "100": 0.049,
    "200": 0.0834,
    "300": 0.1177,
    "400": 0.1398,
    "500": 0.152,
    "600": 0.1429,
    "700": 0.131,
    "800": 0.1195,
    "900": 0.108
  },
  "yellow": {
    "50": 0.022,
    "100": 0.048,
    "200": 0.0786,
    "300": 0.1093,
    "400": 0.1288,
    "500": 0.14,
    "600": 0.1316,
    "700": 0.1263,
    "800": 0.1211,
    "900": 0.1147
  },
  "lime": {
    "50": 0.018,
    "100": 0.0466,
    "200": 0.0804,
    "300": 0.1142,
    "400": 0.1362,
    "500": 0.148,
    "600": 0.1391,
    "700": 0.1231,
    "800": 0.1075,
    "900": 0.092
  },
  "green": {
    "50": 0.014,
    "100": 0.0422,
    "200": 0.0754,
    "300": 0.1087,
    "400": 0.1306,
    "500": 0.142,
    "600": 0.1335,
    "700": 0.1201,
    "800": 0.107,
    "900": 0.094
  },
  "teal": {
    "50": 0.012,
    "100": 0.0353,
    "200": 0.0629,
    "300": 0.0904,
    "400": 0.1086,
    "500": 0.118,
    "600": 0.1109,
    "700": 0.099,
    "800": 0.0875,
    "900": 0.076
  },
  "cloudy-blue": {
    "50": 0.014,
    "100": 0.0391,
    "200": 0.0687,
    "300": 0.0984,
    "400": 0.1178,
    "500": 0.128,
    "600": 0.1203,
    "700": 0.108,
    "800": 0.096,
    "900": 0.084
  },
  "blue": {
    "50": 0.018,
    "100": 0.0506,
    "200": 0.089,
    "300": 0.1275,
    "400": 0.1527,
    "500": 0.166,
    "600": 0.156,
    "700": 0.1397,
    "800": 0.1239,
    "900": 0.108
  },
  "purple": {
    "50": 0.012,
    "100": 0.0494,
    "200": 0.0936,
    "300": 0.1378,
    "400": 0.1674,
    "500": 0.182,
    "600": 0.1711,
    "700": 0.1524,
    "800": 0.1342,
    "900": 0.116
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
