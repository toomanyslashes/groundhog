import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { warmPalette } from "../../theme";
import { defaultFont } from "../../fonts";

export const FadeSlideDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const items = [
    { text: "语音随记", icon: "🎤", color: p.accent },
    { text: "身心记录", icon: "❤️", color: p.pink },
    { text: "信息流", icon: "📰", color: p.blue },
    { text: "待办事项", icon: "✅", color: p.green },
    { text: "AI 聊天", icon: "💬", color: p.purple },
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
      <div
        style={{
          fontSize: 48,
          fontWeight: 700,
          color: p.text,
          marginBottom: 16,
          opacity: interpolate(spring({ frame, fps, config: { damping: 200 } }), [0, 1], [0, 1]),
        }}
      >
        Fade + Slide Up
      </div>
      <div
        style={{
          fontSize: 28,
          color: p.textSecondary,
          marginBottom: 60,
          opacity: interpolate(spring({ frame, fps, config: { damping: 200 } }), [0, 1], [0, 1]),
        }}
      >
        淡入 + 上滑 — 经典入场效果
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "80%" }}>
        {items.map((item, i) => {
          const delay = 20 + i * 8;
          const progress = spring({ frame: frame - delay, fps, config: { damping: 200 } });
          const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
          const y = interpolate(progress, [0, 1], [30, 0], { extrapolateLeft: "clamp" });

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${y}px)`,
                backgroundColor: p.cardBg,
                borderRadius: 20,
                padding: "28px 40px",
                display: "flex",
                alignItems: "center",
                gap: 24,
                boxShadow: `0 4px 12px ${p.primary}14`,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  backgroundColor: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                }}
              >
                {item.icon}
              </div>
              <div style={{ fontSize: 36, color: p.text }}>{item.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
