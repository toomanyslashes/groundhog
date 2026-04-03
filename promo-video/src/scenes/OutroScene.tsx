import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { warmPalette } from "../theme";
import { defaultFont } from "../fonts";

// --- Individual elements ---

export const OutroIconsConverge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const icons = [
    { emoji: "🎤", color: p.accent, label: "语音" },
    { emoji: "❤️", color: p.pink, label: "身心" },
    { emoji: "📰", color: p.blue, label: "信息" },
    { emoji: "✅", color: p.green, label: "待办" },
    { emoji: "💬", color: p.purple, label: "聊天" },
  ];

  // Start positions (scattered)
  const startPositions = [
    { x: -300, y: -400 },
    { x: 300, y: -300 },
    { x: -250, y: 200 },
    { x: 350, y: 300 },
    { x: 0, y: 500 },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: p.bg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: defaultFont,
        position: "relative",
      }}
    >
      <div style={{ display: "flex", gap: 32 }}>
        {icons.map((icon, i) => {
          const progress = spring({ frame: frame - i * 3, fps, config: { damping: 15, stiffness: 80 } });
          const x = interpolate(progress, [0, 1], [startPositions[i].x, 0]);
          const y = interpolate(progress, [0, 1], [startPositions[i].y, 0]);
          const scale = interpolate(progress, [0, 1], [0.3, 1]);
          const opacity = interpolate(progress, [0, 1], [0, 1]);

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translate(${x}px, ${y}px) scale(${scale})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 28,
                  backgroundColor: icon.color + "20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 48,
                  boxShadow: `0 4px 16px ${icon.color}20`,
                }}
              >
                {icon.emoji}
              </div>
              <span style={{ fontSize: 20, color: p.textSecondary }}>{icon.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const OutroAppName: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const nameProgress = spring({ frame, fps, config: { damping: 200 } });
  const nameOpacity = interpolate(nameProgress, [0, 1], [0, 1]);
  const nameY = interpolate(nameProgress, [0, 1], [20, 0]);

  const tagProgress = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const tagOpacity = interpolate(tagProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

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
        gap: 16,
      }}
    >
      <div style={{ opacity: nameOpacity, transform: `translateY(${nameY}px)`, fontSize: 80, fontWeight: 700, color: p.primary }}>
        Groundhog 🐿️
      </div>
      <div style={{ opacity: tagOpacity, fontSize: 40, color: p.text, textAlign: "center" }}>
        语音记录思想 · 追踪身心状态 · 聚合信息流
      </div>
    </div>
  );
};

export const OutroCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const progress = spring({ frame: frame - 10, fps, config: { damping: 8 } });
  const scale = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

  // Subtle pulse after settled
  const pulse = frame > 30 ? 1 + 0.03 * Math.sin((frame - 30) * 0.1) : scale;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: p.bg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: defaultFont,
      }}
    >
      <div
        style={{
          transform: `scale(${pulse})`,
          backgroundColor: p.accent,
          borderRadius: 28,
          padding: "24px 64px",
          fontSize: 40,
          fontWeight: 700,
          color: "white",
          boxShadow: `0 8px 32px ${p.accent}40`,
        }}
      >
        立即下载
      </div>
    </div>
  );
};

// --- Full variants ---

export const OutroFullA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const icons = [
    { emoji: "🎤", color: p.accent },
    { emoji: "❤️", color: p.pink },
    { emoji: "📰", color: p.blue },
    { emoji: "✅", color: p.green },
    { emoji: "💬", color: p.purple },
  ];

  const startPositions = [
    { x: -250, y: -300 },
    { x: 250, y: -250 },
    { x: -200, y: 150 },
    { x: 280, y: 200 },
    { x: 0, y: 350 },
  ];

  // Name
  const nameProgress = spring({ frame: frame - 30, fps, config: { damping: 200 } });
  const nameOpacity = interpolate(nameProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const nameY = interpolate(nameProgress, [0, 1], [30, 0], { extrapolateLeft: "clamp" });

  // Tagline
  const tagProgress = spring({ frame: frame - 50, fps, config: { damping: 200 } });
  const tagOpacity = interpolate(tagProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

  // CTA
  const ctaProgress = spring({ frame: frame - 70, fps, config: { damping: 8 } });
  const ctaScale = interpolate(ctaProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const ctaPulse = frame > 90 ? 1 + 0.02 * Math.sin((frame - 90) * 0.1) : ctaScale;

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
        gap: 24,
      }}
    >
      {/* Icons converge */}
      <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
        {icons.map((icon, i) => {
          const progress = spring({ frame: frame - i * 3, fps, config: { damping: 15, stiffness: 80 } });
          const x = interpolate(progress, [0, 1], [startPositions[i].x, 0]);
          const y = interpolate(progress, [0, 1], [startPositions[i].y, 0]);
          const scale = interpolate(progress, [0, 1], [0.3, 1]);

          return (
            <div
              key={i}
              style={{
                transform: `translate(${x}px, ${y}px) scale(${scale})`,
                width: 80,
                height: 80,
                borderRadius: 22,
                backgroundColor: icon.color + "20",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
              }}
            >
              {icon.emoji}
            </div>
          );
        })}
      </div>

      {/* App name */}
      <div style={{ opacity: nameOpacity, transform: `translateY(${nameY}px)`, fontSize: 72, fontWeight: 700, color: p.primary }}>
        Groundhog 🐿️
      </div>

      {/* Tagline */}
      <div style={{ opacity: tagOpacity, fontSize: 36, color: p.text, textAlign: "center" }}>
        语音记录思想 · 追踪身心状态 · 聚合信息流
      </div>

      {/* CTA */}
      <div
        style={{
          transform: `scale(${ctaPulse})`,
          backgroundColor: p.accent,
          borderRadius: 24,
          padding: "20px 56px",
          fontSize: 36,
          fontWeight: 700,
          color: "white",
          boxShadow: `0 8px 24px ${p.accent}40`,
          marginTop: 20,
        }}
      >
        立即下载
      </div>
    </div>
  );
};

export const OutroFullB: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  // Big logo fade
  const logoProgress = spring({ frame, fps, config: { damping: 200 } });
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);
  const logoScale = interpolate(logoProgress, [0, 1], [0.8, 1]);

  // Name
  const nameProgress = spring({ frame: frame - 15, fps, config: { damping: 200 } });
  const nameOpacity = interpolate(nameProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

  // Feature list
  const features = ["语音记录思想", "追踪身心状态", "聚合信息流", "管理待办事项", "AI 智能对话"];

  // CTA
  const ctaProgress = spring({ frame: frame - 80, fps, config: { damping: 8 } });
  const ctaScale = interpolate(ctaProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

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
        gap: 16,
        padding: 80,
      }}
    >
      <div style={{ opacity: logoOpacity, transform: `scale(${logoScale})`, fontSize: 140, marginBottom: 8 }}>
        🐿️
      </div>
      <div style={{ opacity: nameOpacity, fontSize: 64, fontWeight: 700, color: p.primary, marginBottom: 24 }}>
        Groundhog
      </div>

      {/* Feature list */}
      {features.map((f, i) => {
        const delay = 30 + i * 6;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 200 } });
        const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
        const y = interpolate(progress, [0, 1], [15, 0], { extrapolateLeft: "clamp" });

        return (
          <div key={i} style={{ opacity, transform: `translateY(${y}px)`, fontSize: 32, color: p.text }}>
            {f}
          </div>
        );
      })}

      <div
        style={{
          transform: `scale(${ctaScale})`,
          backgroundColor: p.accent,
          borderRadius: 24,
          padding: "18px 48px",
          fontSize: 32,
          fontWeight: 700,
          color: "white",
          boxShadow: `0 6px 20px ${p.accent}40`,
          marginTop: 32,
        }}
      >
        立即下载
      </div>
    </div>
  );
};
