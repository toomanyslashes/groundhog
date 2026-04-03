import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { fonts, type FontKey } from "../../fonts";
import { warmPalette } from "../../theme";

const fontKeys: FontKey[] = ["notoSansSC", "zcoolKuaiLe", "maShanZheng", "lxgwWenKai"];

export const FontComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: p.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 60,
        gap: 40,
      }}
    >
      {/* Title */}
      <div
        style={{
          fontFamily: fonts.notoSansSC.family,
          fontSize: 48,
          fontWeight: 700,
          color: p.text,
          textAlign: "center",
          marginBottom: 20,
          opacity: interpolate(spring({ frame, fps, config: { damping: 200 } }), [0, 1], [0, 1]),
        }}
      >
        字体对比 / Font Comparison
      </div>

      {fontKeys.map((key, i) => {
        const delay = 10 + i * 12;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 200 } });
        const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
        const x = interpolate(progress, [0, 1], [60, 0], { extrapolateLeft: "clamp" });
        const font = fonts[key];

        return (
          <div
            key={key}
            style={{
              opacity,
              transform: `translateX(${x}px)`,
              backgroundColor: p.cardBg,
              borderRadius: 20,
              padding: "32px 48px",
              boxShadow: `0 4px 12px ${p.primary}14`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 12,
              }}
            >
              <span style={{ fontFamily: font.family, fontSize: 28, color: p.textSecondary }}>
                {font.label}
              </span>
              <span style={{ fontFamily: font.family, fontSize: 28, color: p.accent }}>
                {font.labelCN}
              </span>
            </div>
            <div style={{ fontFamily: font.family, fontSize: 48, color: p.text, lineHeight: 1.4 }}>
              Groundhog 你的个人随记助手
            </div>
          </div>
        );
      })}
    </div>
  );
};
