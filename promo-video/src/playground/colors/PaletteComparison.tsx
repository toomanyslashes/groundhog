import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { palettes, type PaletteKey } from "../../theme";
import { defaultFont } from "../../fonts";

const keys: PaletteKey[] = ["warm", "cool", "vibrant"];

export const PaletteComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#F5F0EB",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 60,
        gap: 40,
        fontFamily: defaultFont,
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: "#403326",
          textAlign: "center",
          marginBottom: 20,
          opacity: interpolate(spring({ frame, fps, config: { damping: 200 } }), [0, 1], [0, 1]),
        }}
      >
        配色对比 / Palette Comparison
      </div>

      {keys.map((key, i) => {
        const p = palettes[key];
        const delay = 10 + i * 15;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 200 } });
        const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
        const y = interpolate(progress, [0, 1], [40, 0], { extrapolateLeft: "clamp" });

        return (
          <div
            key={key}
            style={{
              opacity,
              transform: `translateY(${y}px)`,
              backgroundColor: p.bg,
              borderRadius: 24,
              padding: "36px 48px",
              boxShadow: `0 4px 16px ${p.primary}18`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: p.text }}>{p.name}</div>
              <div style={{ fontSize: 28, color: p.textSecondary }}>{p.nameCN}</div>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {[p.primary, p.accent, p.green, p.blue, p.pink, p.purple].map((color, j) => (
                <div key={j} style={{ flex: 1, height: 80, borderRadius: 16, backgroundColor: color }} />
              ))}
            </div>
            <div
              style={{
                marginTop: 20,
                backgroundColor: p.cardBg,
                borderRadius: 16,
                padding: "20px 28px",
                fontSize: 32,
                color: p.text,
              }}
            >
              Groundhog 你的个人随记助手
            </div>
          </div>
        );
      })}
    </div>
  );
};
