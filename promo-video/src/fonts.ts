// ============================================================
// Font loading via @remotion/google-fonts
// ============================================================

import { loadFont as loadNotoSansSC } from "@remotion/google-fonts/NotoSansSC";
import { loadFont as loadZCOOLKuaiLe } from "@remotion/google-fonts/ZCOOLKuaiLe";
import { loadFont as loadMaShanZheng } from "@remotion/google-fonts/MaShanZheng";
import { loadFont as loadLXGWWenKaiTC } from "@remotion/google-fonts/LXGWWenKaiTC";

// Load all candidate fonts
const noto = loadNotoSansSC("normal", { weights: ["400", "700"], subsets: ["chinese-simplified"] });
const zcool = loadZCOOLKuaiLe("normal", { weights: ["400"] });
const mashan = loadMaShanZheng("normal", { weights: ["400"] });
const lxgw = loadLXGWWenKaiTC("normal", { weights: ["400", "700"] });

export type FontKey = "notoSansSC" | "zcoolKuaiLe" | "maShanZheng" | "lxgwWenKai";

export const fonts: Record<FontKey, { family: string; label: string; labelCN: string }> = {
  notoSansSC: { family: noto.fontFamily, label: "Noto Sans SC", labelCN: "思源黑体" },
  zcoolKuaiLe: { family: zcool.fontFamily, label: "ZCOOL KuaiLe", labelCN: "站酷快乐体" },
  maShanZheng: { family: mashan.fontFamily, label: "Ma Shan Zheng", labelCN: "马善政毛笔" },
  lxgwWenKai: { family: lxgw.fontFamily, label: "LXGW WenKai TC", labelCN: "霞鹜文楷" },
};

// Default font
export const defaultFont = fonts.notoSansSC.family;
