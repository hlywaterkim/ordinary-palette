export const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

export type ColorStep = (typeof steps)[number];
export type ColorScale = Record<ColorStep, string>;

export const opacitySteps = ["00", "05", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"] as const;

export type OpacityStep = (typeof opacitySteps)[number];
export type OpacityScale = Record<OpacityStep, string>;

/** Light-scale yellow OKLCH L minus gray's L. Positive means yellow is lighter than the shared step. */
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

// Light yellow leaves the shared gray L by yellowLightnessOffset.
// Bright steps are only a little lighter, so the tint is not heavier than the other families.
// Dark steps stay much lighter than gray, with chroma held, so the color still reads as yellow instead of muddy olive.
export const yellow = {
  50: "#fffbf4",
  100: "#fff2db",
  200: "#ffe5b8",
  300: "#fad082",
  400: "#eab54b",
  500: "#dd9300",
  600: "#c47e00",
  700: "#b36404",
  800: "#984d1a",
  900: "#7f3c25",
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

export const gray = {
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
  50: "#f3e8e9",
  100: "#dec5c7",
  200: "#cba1a5",
  300: "#c17881",
  400: "#bc445b",
  500: "#a6003c",
  600: "#79002a",
  700: "#4e0018",
  800: "#280008",
  900: "#070001",
} as const satisfies ColorScale;

export const darkRed = {
  50: "#f4e8e6",
  100: "#e0c5c0",
  200: "#cea19a",
  300: "#c5796d",
  400: "#c04536",
  500: "#a80600",
  600: "#7a0400",
  700: "#500100",
  800: "#280000",
  900: "#070000",
} as const satisfies ColorScale;

export const darkOrange = {
  50: "#f3e9e4",
  100: "#ddc6bd",
  200: "#cba494",
  300: "#c07d62",
  400: "#b65223",
  500: "#943700",
  600: "#6b2500",
  700: "#451500",
  800: "#220700",
  900: "#030101",
} as const satisfies ColorScale;

export const darkYellow = {
  50: "#f2eadd",
  100: "#dacaad",
  200: "#c4aa7b",
  300: "#b1893a",
  400: "#956c00",
  500: "#794f00",
  600: "#593600",
  700: "#3d1e00",
  800: "#200900",
  900: "#030101",
} as const satisfies ColorScale;

export const darkLime = {
  50: "#ebeddb",
  100: "#cbd0ab",
  200: "#acb476",
  300: "#8d9930",
  400: "#707c00",
  500: "#5b5d00",
  600: "#414200",
  700: "#2b2800",
  800: "#141100",
  900: "#020201",
} as const satisfies ColorScale;

export const darkGreen = {
  50: "#e4eee7",
  100: "#bcd3c2",
  200: "#91b99d",
  300: "#60a175",
  400: "#198a4e",
  500: "#006b35",
  600: "#004c26",
  700: "#003016",
  800: "#001607",
  900: "#010201",
} as const satisfies ColorScale;

export const darkTeal = {
  50: "#e3eee9",
  100: "#b5d4c7",
  200: "#7ebda4",
  300: "#30a782",
  400: "#018867",
  500: "#00694e",
  600: "#004b37",
  700: "#002f21",
  800: "#00150d",
  900: "#010201",
} as const satisfies ColorScale;

export const darkCloudyBlue = {
  50: "#e5ecf5",
  100: "#c0cddf",
  200: "#9eafc7",
  300: "#7592bb",
  400: "#4974b4",
  500: "#1a56a8",
  600: "#003b84",
  700: "#002456",
  800: "#000f2c",
  900: "#000207",
} as const satisfies ColorScale;

export const darkBlue = {
  50: "#e1eef3",
  100: "#b8d0de",
  200: "#91b3c9",
  300: "#6295c4",
  400: "#2d75c3",
  500: "#0053b5",
  600: "#003a84",
  700: "#002456",
  800: "#000f2c",
  900: "#000207",
} as const satisfies ColorScale;

export const darkPurple = {
  50: "#eaebf1",
  100: "#c9cbd8",
  200: "#a7acc7",
  300: "#858cc1",
  400: "#6165ce",
  500: "#482ed9",
  600: "#3400b0",
  700: "#1f0074",
  800: "#0c003e",
  900: "#01000e",
} as const satisfies ColorScale;

export const darkGray = {
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
  "gray",
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
  gray,
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
  gray: darkGray,
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
  "gray": {
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
  "gray": {
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
  }
} as const;
