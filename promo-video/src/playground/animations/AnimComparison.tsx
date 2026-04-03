import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { warmPalette, springPresets } from "../../theme";
import { defaultFont } from "../../fonts";

export const AnimComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const loopFrame = frame % (2 * fps);

  const presets = [
    { key: "smooth" as const, label: "Smooth 平滑", color: p.accent },
    { key: "snappy" as const, label: "Snappy 快速", color: p.green },
    { key: "bouncy" as const, label: "Bouncy 弹跳", color: p.blue },
    { key: "heavy" as const, label: "Heavy 厚重", color: p.purple },
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
        fontFamily: defaultFont,
        padding: 60,
      }}
    >
      <div style={{ fontSize: 48, fontWeight: 700, color: p.text, marginBottom: 60 }}>
        动效对比 / Animation Comparison
      </div>

      <div style={{ display: "flex", gap: 40 }}>
        {presets.map(({ key, label, color }) => {
          const progress = spring({ frame: loopFrame, fps, config: springPresets[key] });
          const scale = interpolate(progress, [0, 1], [0.2, 1]);
          const y = interpolate(progress, [0, 1], [300, 0]);

          return (
            <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
              <div style={{ fontSize: 28, color: p.textSecondary, textAlign: "center", height: 40 }}>{label}</div>
              <div style={{ height: 400, display: "flex", alignItems: "flex-end" }}>
                <div
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: 32,
                    backgroundColor: color,
                    transform: `translateY(${-y}px) scale(${scale})`,
                    boxShadow: `0 8px 24px ${color}40`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
