import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { warmPalette } from "../../theme";
import { defaultFont } from "../../fonts";

export const StaggerDemo: React.FC<{ delayFrames?: number }> = ({ delayFrames = 5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const items = Array.from({ length: 8 }, (_, i) => ({
    label: `Item ${i + 1}`,
    color: [p.accent, p.green, p.blue, p.pink, p.purple, p.accent, p.green, p.blue][i],
  }));

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
        fontFamily: defaultFont,
        padding: 60,
      }}
    >
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: p.text,
          marginBottom: 8,
          opacity: interpolate(spring({ frame, fps, config: { damping: 200 } }), [0, 1], [0, 1]),
        }}
      >
        Stagger: {delayFrames} frames
      </div>
      <div
        style={{
          fontSize: 28,
          color: p.textSecondary,
          marginBottom: 60,
          opacity: interpolate(spring({ frame, fps, config: { damping: 200 } }), [0, 1], [0, 1]),
        }}
      >
        交错延迟 {delayFrames} 帧 ({Math.round((delayFrames / fps) * 1000)}ms)
      </div>

      {/* Grid layout */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", maxWidth: 800 }}>
        {items.map((item, i) => {
          const delay = 15 + i * delayFrames;
          const progress = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 200 } });
          const scale = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
          const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `scale(${scale})`,
                width: 170,
                height: 170,
                borderRadius: 24,
                backgroundColor: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 6px 20px ${item.color}40`,
              }}
            >
              <span style={{ fontSize: 28, fontWeight: 700, color: "white" }}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
