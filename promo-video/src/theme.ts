// ============================================================
// Groundhog Design Tokens — translated from GHDesign (Swift)
// ============================================================

export type PaletteKey = "warm" | "cool" | "vibrant";

export interface Palette {
  name: string;
  nameCN: string;
  bg: string;
  primary: string;
  accent: string;
  green: string;
  blue: string;
  pink: string;
  purple: string;
  text: string;
  textSecondary: string;
  cardBg: string;
  deepPrimary: string;
}

// --- Palette A: Warm (App 原色) ---
export const warmPalette: Palette = {
  name: "Warm",
  nameCN: "暖色调",
  bg: "#F8F0E3",
  primary: "#8F6B52",
  accent: "#EDA661",
  green: "#99C7A6",
  blue: "#8CB3D9",
  pink: "#EBADAD",
  purple: "#B89ED1",
  text: "#403326",
  textSecondary: "#807366",
  cardBg: "rgba(255,255,255,0.85)",
  deepPrimary: "#59402E",
};

// --- Palette B: Cool (冷色变体) ---
export const coolPalette: Palette = {
  name: "Cool",
  nameCN: "冷色调",
  bg: "#EEF2F7",
  primary: "#4A6FA5",
  accent: "#7BC8F6",
  green: "#6DBFA0",
  blue: "#5B9BD5",
  pink: "#C4A1D4",
  purple: "#8E7CC3",
  text: "#2C3E50",
  textSecondary: "#6B7B8D",
  cardBg: "rgba(255,255,255,0.88)",
  deepPrimary: "#2C4A7C",
};

// --- Palette C: Vibrant (鲜艳变体) ---
export const vibrantPalette: Palette = {
  name: "Vibrant",
  nameCN: "鲜艳",
  bg: "#FFF8F0",
  primary: "#D4723C",
  accent: "#FF9F43",
  green: "#2ECC71",
  blue: "#3498DB",
  pink: "#E74C8B",
  purple: "#9B59B6",
  text: "#2D2015",
  textSecondary: "#6B5744",
  cardBg: "rgba(255,255,255,0.90)",
  deepPrimary: "#A0522D",
};

export const palettes: Record<PaletteKey, Palette> = {
  warm: warmPalette,
  cool: coolPalette,
  vibrant: vibrantPalette,
};

// --- Mood Colors (12 种情绪) ---
export const moodColors: Record<string, { emoji: string; color: string; label: string }> = {
  happy: { emoji: "😊", color: "#FAD166", label: "开心" },
  calm: { emoji: "😌", color: "#99CCBF", label: "平静" },
  excited: { emoji: "🤩", color: "#F2B873", label: "兴奋" },
  focused: { emoji: "🎯", color: "#80B8AD", label: "专注" },
  anxious: { emoji: "😰", color: "#E6A68C", label: "焦虑" },
  tired: { emoji: "😴", color: "#B8ADBF", label: "疲惫" },
  sad: { emoji: "😢", color: "#99ADD1", label: "难过" },
  angry: { emoji: "😤", color: "#E08073", label: "生气" },
  grateful: { emoji: "🙏", color: "#B8D4A3", label: "感恩" },
  motivated: { emoji: "💪", color: "#E8C170", label: "激励" },
  overwhelmed: { emoji: "😵", color: "#D4A0A0", label: "压力" },
  content: { emoji: "☺️", color: "#C4D9A0", label: "满足" },
};

// --- Spacing (GHDesign.Spacing) ---
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

// --- Border Radius (GHDesign.Radius) ---
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
} as const;

// --- Spring Presets (mapped from GHDesign.Motion) ---
export const springPresets = {
  smooth: { damping: 200, mass: 1, stiffness: 100 },
  snappy: { damping: 20, mass: 1, stiffness: 200 },
  bouncy: { damping: 8, mass: 1, stiffness: 100 },
  heavy: { damping: 15, mass: 2, stiffness: 80 },
} as const;

// --- News Sources ---
export const newsSources = [
  { id: "bilibili", name: "B站", color: "#FB7299" },
  { id: "xiaohongshu", name: "小红书", color: "#FF2442" },
  { id: "twitter", name: "X", color: "#1DA1F2" },
  { id: "telegram", name: "Telegram", color: "#0088CC" },
] as const;

// --- Video Dimensions ---
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_FPS = 30;
