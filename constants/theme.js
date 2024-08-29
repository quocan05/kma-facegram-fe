const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const themes = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
  colors: {
    primary: "#00c26f",
    primaryDark: "#00ac62",
    dark: "#3e3e3e",
    darkLight: "#e1e1e1",
    gray: "#e3e3e3",

    text: "#494949",
    textLight: "#7c7c7c",
    textDark: "#1d1d1d",

    rose: "#ef4444",
    roseLight: "f87171",
  },
  fonts: {
    medium: "500",
    semibold: "600",
    bold: "700",
    extraBold: "800",
  },

  radius: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
  },
};
