export const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

export type ColorStep = (typeof steps)[number];
export type ColorScale = Record<ColorStep, string>;

export const opacitySteps = ["00", "05", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"] as const;

export type OpacityStep = (typeof opacitySteps)[number];
export type OpacityScale = Record<OpacityStep, string>;

/** Light-scale yellow OKLCH L minus cool-gray's L. Positive means yellow is lighter than the shared step. */
export const yellowLightnessOffset = {
  50: 1.4,
  100: 2,
  200: 2.8,
  300: 3.6,
  400: 5,
  500: 7,
  600: 11,
  700: 15,
  800: 19,
  900: 24,
} as const;

/** Dark-scale yellow OKLCH L minus darkLightness. Steps 800 and 900 are lifted so they stay gold instead of black. */
export const darkYellowLightnessOffset = {
  50: 0,
  100: 0,
  200: 0,
  300: 0,
  400: 0,
  500: 3.78,
  600: 8.33,
  700: 12.89,
  800: 17.44,
  900: 23,
} as const;

/**
 * Dark steps whose OKLCH L is raised above the shared dark target so chroma can reach
 * 0.9× the light step without moving hue. The number is that raised L on a 0–100 scale.
 * cool-gray is not listed and stays as fitted. neutral-gray stays chroma 0.
 */
export const darkChromaLightnessExceptions = {
  pink: { 500: 54.51, 600: 48.69, 700: 38.9, 800: 28.42, 900: 18.17 },
  red: { 500: 52.72, 600: 48.84, 700: 38.91, 800: 28.31, 900: 18.15 },
  orange: { 500: 58.55, 600: 48.66, 700: 38.92, 800: 27.97, 900: 17.97 },
  yellow: { 400: 59.21, 500: 64.87, 600: 58.57, 700: 52.51, 800: 45.72, 900: 39.85 },
  lime: { 400: 66.02, 500: 58.69, 600: 49.21, 700: 38.94, 800: 28.67, 900: 17.86 },
  green: { 500: 58.41, 600: 49.05, 700: 39.12, 800: 28.51, 900: 17.93 },
  teal: { 400: 63.52, 500: 58.61, 600: 48.7, 700: 38.93, 800: 28.5, 900: 18.15 },
  "cloudy-blue": { 600: 37.76, 700: 34.05, 800: 27.71, 900: 17.69 },
  blue: { 600: 45.66, 700: 37.45, 800: 28.23, 900: 17.31 },
  purple: { 700: 31.19, 800: 23.8, 900: 16.48 },
} as const;

/** Dark-scale OKLCH L targets. Adjacent gaps are wider than the light scale, so the same step difference has stronger contrast. */
export const darkLightness = {
  50: 94,
  100: 84.44,
  200: 74.89,
  300: 65.33,
  400: 55.78,
  500: 46.22,
  600: 36.67,
  700: 27.11,
  800: 17.56,
  900: 8,
} as const;

export const pink = {
  50: "#fff4f5",
  100: "#ffe6e8",
  200: "#ffd2d6",
  300: "#ffb3bb",
  400: "#ff8295",
  500: "#fe2867",
  600: "#cd004c",
  700: "#970036",
  800: "#610020",
  900: "#31000c",
} as const satisfies ColorScale;

export const red = {
  50: "#fff4f2",
  100: "#ffe6e1",
  200: "#ffd3cb",
  300: "#ffb6a9",
  400: "#ff8675",
  500: "#ff3626",
  600: "#d00d00",
  700: "#990500",
  800: "#630200",
  900: "#320000",
} as const satisfies ColorScale;

export const orange = {
  50: "#fff4f0",
  100: "#ffe7de",
  200: "#ffd5c5",
  300: "#ffb79a",
  400: "#f98e61",
  500: "#ea5b00",
  600: "#b74500",
  700: "#873100",
  800: "#561c00",
  900: "#2c0900",
} as const satisfies ColorScale;

// Light yellow leaves the shared cool-gray L by yellowLightnessOffset.
// Bright steps are only a little lighter, so the tint is not heavier than the other families.
// Hue stays on step 50 (about 82°). Chroma is lowered only to stay in sRGB, so step 900 stays gold instead of brown.
export const yellow = {
  50: "#fffbf4",
  100: "#fff2db",
  200: "#ffe5b8",
  300: "#fad082",
  400: "#eab54b",
  500: "#d39900",
  600: "#b88600",
  700: "#9e7200",
  800: "#825d00",
  900: "#6b4c00",
} as const satisfies ColorScale;

export const lime = {
  50: "#f7f9e7",
  100: "#ecf1cb",
  200: "#dee6a7",
  300: "#c7d56f",
  400: "#a8bb16",
  500: "#939701",
  600: "#727500",
  700: "#575200",
  800: "#393200",
  900: "#1b1500",
} as const satisfies ColorScale;

export const green = {
  50: "#f0faf2",
  100: "#dcf4e3",
  200: "#c2ebce",
  300: "#9addaf",
  400: "#62c787",
  500: "#01ab59",
  600: "#008547",
  700: "#006132",
  800: "#003d1d",
  900: "#001c0a",
} as const satisfies ColorScale;

export const teal = {
  50: "#eefaf5",
  100: "#d6f6e8",
  200: "#b0f0d6",
  300: "#75e4bc",
  400: "#2dcb9c",
  500: "#00a87f",
  600: "#008362",
  700: "#005f46",
  800: "#003c2b",
  900: "#001c12",
} as const satisfies ColorScale;

export const cloudyBlue = {
  50: "#f1f7ff",
  100: "#e1eeff",
  200: "#d0e1fb",
  300: "#b0cefa",
  400: "#82b0f4",
  500: "#538fe6",
  600: "#2d6cc7",
  700: "#154d9a",
  800: "#022e69",
  900: "#001436",
} as const satisfies ColorScale;

export const blue = {
  50: "#ecf9ff",
  100: "#d9f1ff",
  200: "#c2e5fc",
  300: "#9ed1ff",
  400: "#70b2ff",
  500: "#3c8cff",
  600: "#146ada",
  700: "#054ba3",
  800: "#002e6b",
  900: "#001436",
} as const satisfies ColorScale;

export const purple = {
  50: "#f5f6fc",
  100: "#eaecf9",
  200: "#d9ddfa",
  300: "#bec6ff",
  400: "#9ca5ff",
  500: "#787dff",
  600: "#5a49f9",
  700: "#402ebf",
  800: "#27187f",
  900: "#100446",
} as const satisfies ColorScale;

export const coolGray = {
  50: "#f5f7f9",
  100: "#eaedf1",
  200: "#dae0e7",
  300: "#c3ccd4",
  400: "#a5b0ba",
  500: "#84919d",
  600: "#62717e",
  700: "#435260",
  800: "#243342",
  900: "#081725",
} as const satisfies ColorScale;

// Chroma 0 and no hue. Lightness matches cool-gray at the same step.
// #666666 only illustrates that zero-chroma character. It is not copied onto these steps.
export const neutralGray = {
  50: "#f7f7f7",
  100: "#ededed",
  200: "#dfdfdf",
  300: "#cbcbcb",
  400: "#aeaeae",
  500: "#8f8f8f",
  600: "#6f6f6f",
  700: "#505050",
  800: "#313131",
  900: "#161616",
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
  50: "#f2e8e9",
  100: "#dcc6c8",
  200: "#c9a2a6",
  300: "#bc7c83",
  400: "#b54b5e",
  500: "#cf014d",
  600: "#b20041",
  700: "#83002e",
  800: "#54001a",
  900: "#2a0009",
} as const satisfies ColorScale;

export const darkRed = {
  50: "#f3e9e7",
  100: "#dcc6c2",
  200: "#c9a39d",
  300: "#bc7e74",
  400: "#b65042",
  500: "#c90901",
  600: "#b50a01",
  700: "#850401",
  800: "#550100",
  900: "#2b0000",
} as const satisfies ColorScale;

export const darkOrange = {
  50: "#f3e9e5",
  100: "#dcc7bf",
  200: "#c9a596",
  300: "#bc7f67",
  400: "#b0562f",
  500: "#cc4e02",
  600: "#9f3b00",
  700: "#752901",
  800: "#491600",
  900: "#250600",
} as const satisfies ColorScale;

// Dark yellow uses darkYellowLightnessOffset above the shared dark L.
// Steps that still cannot hold 0.9× light chroma are listed in darkChromaLightnessExceptions.
// Hue stays within 15° of light yellow step 50, so 800 and 900 stay dark gold instead of black.
export const darkYellow = {
  50: "#eeebe4",
  100: "#d6cab6",
  200: "#c0ab83",
  300: "#ae8a46",
  400: "#a27500",
  500: "#b78500",
  600: "#a07300",
  700: "#896300",
  800: "#715101",
  900: "#5d4201",
} as const satisfies ColorScale;

export const darkLime = {
  50: "#ebeddc",
  100: "#cbd0ae",
  200: "#acb47d",
  300: "#8d983d",
  400: "#8d9d00",
  500: "#7f8302",
  600: "#646601",
  700: "#4b4701",
  800: "#312b00",
  900: "#161100",
} as const satisfies ColorScale;

export const darkGreen = {
  50: "#e4eee7",
  100: "#bdd2c3",
  200: "#94b89f",
  300: "#66a078",
  400: "#2c8852",
  500: "#01944c",
  600: "#00743e",
  700: "#00542b",
  800: "#003418",
  900: "#001707",
} as const satisfies ColorScale;

export const darkTeal = {
  50: "#e3eee9",
  100: "#b8d4c7",
  200: "#84bca5",
  300: "#42a583",
  400: "#00a37b",
  500: "#01926e",
  600: "#007154",
  700: "#00523c",
  800: "#003324",
  900: "#00170e",
} as const satisfies ColorScale;

export const darkCloudyBlue = {
  50: "#e6ecf3",
  100: "#c2cddd",
  200: "#9fafc5",
  300: "#7892b7",
  400: "#4e75ae",
  500: "#2357a0",
  600: "#003d8a",
  700: "#013477",
  800: "#002559",
  900: "#000f2d",
} as const satisfies ColorScale;

export const darkBlue = {
  50: "#e1edf3",
  100: "#bad0dc",
  200: "#94b2c6",
  300: "#6a95bd",
  400: "#3d76b7",
  500: "#0253b5",
  600: "#0051b3",
  700: "#003c89",
  800: "#00265c",
  900: "#000e2c",
} as const satisfies ColorScale;

export const darkPurple = {
  50: "#eaebf1",
  100: "#c9cbd7",
  200: "#a8acc5",
  300: "#868cbd",
  400: "#656bb7",
  500: "#4846b5",
  600: "#3401b0",
  700: "#28008d",
  800: "#180160",
  900: "#0a0038",
} as const satisfies ColorScale;

export const darkCoolGray = {
  50: "#e9ebee",
  100: "#c8ccd0",
  200: "#a8aeb4",
  300: "#899199",
  400: "#6b757f",
  500: "#4f5a65",
  600: "#33404d",
  700: "#1a2835",
  800: "#04121e",
  900: "#000205",
} as const satisfies ColorScale;

export const darkNeutralGray = {
  50: "#ebebeb",
  100: "#cbcbcb",
  200: "#adadad",
  300: "#909090",
  400: "#747474",
  500: "#585858",
  600: "#3e3e3e",
  700: "#262626",
  800: "#111111",
  900: "#020202",
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
    "200": 81.469,
    "300": 81.49,
    "400": 81.6,
    "500": 73.49,
    "600": 70.66,
    "700": 60,
    "800": 50,
    "900": 40
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
    "50": 0.012,
    "100": 0.028,
    "200": 0.05,
    "300": 0.092,
    "400": 0.154,
    "500": 0.241,
    "600": 0.222,
    "700": 0.182,
    "800": 0.14,
    "900": 0.097
  },
  "red": {
    "50": 0.013,
    "100": 0.031,
    "200": 0.054,
    "300": 0.098,
    "400": 0.161,
    "500": 0.25,
    "600": 0.222,
    "700": 0.185,
    "800": 0.147,
    "900": 0.106
  },
  "orange": {
    "50": 0.013,
    "100": 0.029,
    "200": 0.052,
    "300": 0.093,
    "400": 0.143,
    "500": 0.203,
    "600": 0.18,
    "700": 0.143,
    "800": 0.114,
    "900": 0.087
  },
  "yellow": {
    "50": 0.019,
    "100": 0.043,
    "200": 0.07,
    "300": 0.1078,
    "400": 0.135,
    "500": 0.168,
    "600": 0.152,
    "700": 0.135,
    "800": 0.118,
    "900": 0.099
  },
  "lime": {
    "50": 0.0237,
    "100": 0.0499,
    "200": 0.0831,
    "300": 0.1277,
    "400": 0.1685,
    "500": 0.1744,
    "600": 0.1531,
    "700": 0.1215,
    "800": 0.093,
    "900": 0.0665
  },
  "green": {
    "50": 0.015,
    "100": 0.034,
    "200": 0.058,
    "300": 0.094,
    "400": 0.133,
    "500": 0.18,
    "600": 0.162,
    "700": 0.131,
    "800": 0.101,
    "900": 0.071
  },
  "teal": {
    "50": 0.014,
    "100": 0.038,
    "200": 0.074,
    "300": 0.118,
    "400": 0.143,
    "500": 0.1513,
    "600": 0.13,
    "700": 0.106,
    "800": 0.081,
    "900": 0.057
  },
  "cloudy-blue": {
    "50": 0.015,
    "100": 0.029,
    "200": 0.04,
    "300": 0.07,
    "400": 0.11,
    "500": 0.145,
    "600": 0.156,
    "700": 0.138,
    "800": 0.112,
    "900": 0.078
  },
  "blue": {
    "50": 0.016,
    "100": 0.032,
    "200": 0.048,
    "300": 0.089,
    "400": 0.14,
    "500": 0.198,
    "600": 0.189,
    "700": 0.155,
    "800": 0.12,
    "900": 0.085
  },
  "purple": {
    "50": 0.008,
    "100": 0.018,
    "200": 0.04,
    "300": 0.08,
    "400": 0.158,
    "500": 0.24,
    "600": 0.248,
    "700": 0.212,
    "800": 0.16,
    "900": 0.112
  },
  "cool-gray": {
    "50": 0.004,
    "100": 0.007,
    "200": 0.011,
    "300": 0.015,
    "400": 0.019,
    "500": 0.023,
    "600": 0.027,
    "700": 0.03,
    "800": 0.033,
    "900": 0.034
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
