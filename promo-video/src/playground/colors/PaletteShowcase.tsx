import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { type Palette } from "../../theme";
import { defaultFont } from "../../fonts";

export const PaletteShowcase: React.FC<{ palette: Palette }> = ({ palette }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = palette;

  const titleProgress = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  const colors = [
    { label: "Background", value: p.bg },
    { label: "Primary", value: p.primary },
    { label: "Accent", value: p.accent },
    { label: "Green", value: p.green },
    { label: "Blue", value: p.blue },
    { label: "Pink", value: p.pink },
    { label: "Purple", value: p.purple },
    { label: "Card", value: p.cardBg },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: p.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        fontFamily: defaultFont,
      }}
    >
      {/* Palette name */}
      <div style={{ opacity: titleOpacity, fontSize: 56, fontWeight: 700, color: p.text, marginBottom: 8 }}>
        {p.name}
      </div>
      <div style={{ opacity: titleOpacity, fontSize: 36, color: p.textSecondary, marginBottom: 60 }}>
        {p.nameCN}
      </div>

      {/* Color swatches - 2 columns */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", maxWidth: 900 }}>
        {colors.map((c, i) => {
          const delay = 10 + i * 5;
          const progress = spring({ frame: frame - delay, fps, config: { damping: 8 } });
          const scale = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
          const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

          return (
            <div key={i} style={{ opacity, transform: `scale(${scale})`, textAlign: "center" }}>
              <div
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: 24,
                  backgroundColor: c.value,
                  border: c.value.includes("rgba") ? `2px solid ${p.primary}22` : "none",
                  boxShadow: `0 4px 16px ${p.primary}20`,
                  marginBottom: 12,
                }}
              />
              <div style={{ fontSize: 24, color: p.text }}>{c.label}</div>
              <div style={{ fontSize: 20, color: p.textSecondary }}>{c.value.slice(0, 7)}</div>
            </div>
          );
        })}
      </div>

      {/* Sample card */}
      {(() => {
        const cardDelay = 60;
        const cardProgress = spring({ frame: frame - cardDelay, fps, config: { damping: 20, stiffness: 200 } });
        const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
        const cardY = interpolate(cardProgress, [0, 1], [30, 0], { extrapolateLeft: "clamp" });
        return (
          <div
            style={{
              opacity: cardOpacity,
              transform: `translateY(${cardY}px)`,
              marginTop: 60,
              backgroundColor: p.cardBg,
              borderRadius: 20,
              padding: "32px 48px",
              boxShadow: `0 4px 12px ${p.primary}14`,
              width: "80%",
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 700, color: p.text, marginBottom: 8 }}>
              Groundhog
            </div>
            <div style={{ fontSize: 28, color: p.textSecondary }}>
              你的个人随记助手 — 语音记录思想
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              {[p.accent, p.green, p.blue, p.pink].map((bg, j) => (
                <div key={j} style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: bg }} />
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
};
