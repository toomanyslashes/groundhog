import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { warmPalette, springPresets } from "../../theme";
import { defaultFont } from "../../fonts";

type PresetKey = keyof typeof springPresets;

export const SpringDemo: React.FC<{ preset: PresetKey }> = ({ preset }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;
  const config = springPresets[preset];

  // Loop: animate every 2 seconds
  const loopFrame = frame % (2 * fps);

  const progress = spring({ frame: loopFrame, fps, config });

  const scale = interpolate(progress, [0, 1], [0.3, 1]);
  const y = interpolate(progress, [0, 1], [200, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const rotation = interpolate(progress, [0, 1], [-15, 0]);

  const labels: Record<PresetKey, { en: string; cn: string; desc: string }> = {
    smooth: { en: "Smooth", cn: "平滑", desc: "damping: 200 — 无弹跳，适合文字入场" },
    snappy: { en: "Snappy", cn: "快速", desc: "damping: 20, stiffness: 200 — 微弹跳，适合卡片" },
    bouncy: { en: "Bouncy", cn: "弹跳", desc: "damping: 8 — 明显弹跳，适合 Logo/Emoji" },
    heavy: { en: "Heavy", cn: "厚重", desc: "damping: 15, mass: 2 — 慢速沉稳" },
  };

  const label = labels[preset];

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
        gap: 40,
      }}
    >
      {/* Label */}
      <div style={{ fontSize: 56, fontWeight: 700, color: p.text }}>{label.en}</div>
      <div style={{ fontSize: 36, color: p.textSecondary }}>{label.cn}</div>
      <div style={{ fontSize: 24, color: p.textSecondary, maxWidth: 700, textAlign: "center" }}>
        {label.desc}
      </div>

      {/* Animated objects */}
      <div style={{ display: "flex", gap: 80, marginTop: 40, alignItems: "center" }}>
        {/* Circle - scale */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: 80,
              backgroundColor: p.accent,
              transform: `scale(${scale})`,
              boxShadow: `0 8px 24px ${p.accent}40`,
            }}
          />
          <div style={{ fontSize: 24, color: p.textSecondary, marginTop: 16 }}>Scale</div>
        </div>

        {/* Square - translateY */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: 24,
              backgroundColor: p.green,
              transform: `translateY(${y}px)`,
              opacity,
              boxShadow: `0 8px 24px ${p.green}40`,
            }}
          />
          <div style={{ fontSize: 24, color: p.textSecondary, marginTop: 16 }}>Slide</div>
        </div>

        {/* Diamond - rotate */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: 20,
              backgroundColor: p.blue,
              transform: `rotate(${rotation + 45}deg) scale(${scale})`,
              boxShadow: `0 8px 24px ${p.blue}40`,
            }}
          />
          <div style={{ fontSize: 24, color: p.textSecondary, marginTop: 16 }}>Rotate</div>
        </div>
      </div>
    </div>
  );
};
