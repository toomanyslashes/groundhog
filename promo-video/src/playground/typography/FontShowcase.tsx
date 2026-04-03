import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { type FontKey, fonts } from "../../fonts";
import { warmPalette } from "../../theme";

export const FontShowcase: React.FC<{ fontKey: FontKey }> = ({ fontKey }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const font = fonts[fontKey];
  const p = warmPalette;

  const titleProgress = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  const sampleProgress = spring({ frame: frame - 15, fps, config: { damping: 200 } });
  const sampleOpacity = interpolate(sampleProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const sampleY = interpolate(sampleProgress, [0, 1], [20, 0], { extrapolateLeft: "clamp" });

  const sizesProgress = spring({ frame: frame - 30, fps, config: { damping: 200 } });
  const sizesOpacity = interpolate(sizesProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

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
        padding: 80,
        fontFamily: font.family,
      }}
    >
      {/* Font name */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontSize: 64,
          fontWeight: 700,
          color: p.text,
          marginBottom: 16,
        }}
      >
        {font.label}
      </div>
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontSize: 40,
          color: p.textSecondary,
          marginBottom: 80,
        }}
      >
        {font.labelCN}
      </div>

      {/* Sample text */}
      <div
        style={{
          opacity: sampleOpacity,
          transform: `translateY(${sampleY}px)`,
          fontSize: 72,
          fontWeight: 700,
          color: p.primary,
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        Groundhog
      </div>
      <div
        style={{
          opacity: sampleOpacity,
          transform: `translateY(${sampleY}px)`,
          fontSize: 56,
          color: p.text,
          marginBottom: 60,
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        你的个人随记助手
      </div>

      {/* Size samples */}
      <div style={{ opacity: sizesOpacity, width: "100%", display: "flex", flexDirection: "column", gap: 24 }}>
        {[
          { size: 48, text: "语音记录思想、追踪身心状态" },
          { size: 36, text: "聚合信息流 · 管理待办 · AI 对话" },
          { size: 28, text: "ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              fontSize: item.size,
              color: i === 0 ? p.text : p.textSecondary,
              textAlign: "center",
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};
