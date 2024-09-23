const tintColorLight = "#0a7ea4"; // Original tint color you defined
const tintColorDark = "#fff"; // Original tint color for dark mode

export const themes = {
  light: {
    text: "#11181C", // Original text color
    background: "#fff", // Original background color
    tint: tintColorLight, // Retained tint color
    icon: "#687076", // Original icon color
    tabIconDefault: "#687076", // Original tab icon color
    tabIconSelected: tintColorLight,
    borderLight: "#dbdbdb", // Instagram-inspired border color
    backgroundLight: "#f1f1f1", // Instagram light mode background for messages
  },
  dark: {
    text: "#ECEDEE", // Original text color
    background: "#151718", // Original background color
    tint: tintColorDark, // Retained tint color
    icon: "#9BA1A6", // Original icon color
    tabIconDefault: "#9BA1A6", // Original tab icon color
    tabIconSelected: tintColorDark,
    borderLight: "#3a3a3a", // Dark mode border color for Instagram UI
    backgroundLight: "#121212", // Dark mode message background
  },
  colors: {
    primary: "#00c26f", // Original primary color
    primaryDark: "#00ac62", // Original dark primary color
    dark: "#3e3e3e", // Original dark color
    darkLight: "#e1e1e1", // Original light gray color
    gray: "#e3e3e3", // Original gray color

    text: "#494949", // Original text color
    textLight: "#7c7c7c", // Original light text color
    textDark: "#1d1d1d", // Original dark text color

    rose: "#ef4444", // Original rose color
    roseLight: "f87171", // Original light rose color

    // Added Instagram-like colors
    messageBubbleOwn: "#dfe9ff", // Light blue for own messages (Instagram-inspired)
    messageBubbleFriend: "#f1f1f1", // Light gray for friend's messages
    messageBubbleOwnDark: "#374151", // Dark mode bubble for own messages
    messageBubbleFriendDark: "#121212", // Dark mode bubble for friend's messages
  },
  fonts: {
    medium: "500", // Original font weight
    semibold: "600", // Original font weight
    bold: "700", // Original font weight
    extraBold: "800", // Original font weight
  },

  radius: {
    xs: 10, // Original radius values
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
  },
};
