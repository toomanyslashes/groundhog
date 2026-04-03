import { useCurrentFrame, useVideoConfig, spring, interpolate, Sequence } from "remotion";
import { warmPalette } from "../theme";
import { defaultFont } from "../fonts";
import { PhoneMockup } from "../components/PhoneMockup";
import { WaveformBar } from "../components/WaveformBar";
import { Card } from "../components/Card";

// --- Individual elements ---

export const VMWaveform: React.FC = () => {
  const p = warmPalette;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: p.bg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WaveformBar barCount={32} color={p.accent} width={800} height={200} />
    </div>
  );
};

export const VMMicPulse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const pulse = 1 + 0.08 * Math.sin(frame * 0.15);
  const ringScale = 1 + 0.15 * Math.sin(frame * 0.1);
  const ringOpacity = 0.3 + 0.2 * Math.sin(frame * 0.1);

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
      <div style={{ position: "relative" }}>
        {/* Pulse rings */}
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            style={{
              position: "absolute",
              inset: -20 * ring,
              borderRadius: "50%",
              border: `2px solid ${p.accent}`,
              opacity: ringOpacity / ring,
              transform: `scale(${ringScale + ring * 0.05})`,
            }}
          />
        ))}
        {/* Mic icon */}
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: 80,
            backgroundColor: p.accent,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `scale(${pulse})`,
            boxShadow: `0 8px 32px ${p.accent}40`,
            fontSize: 72,
          }}
        >
          🎤
        </div>
      </div>
    </div>
  );
};

export const VMTextBubble: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const progress = spring({ frame: frame - 10, fps, config: { damping: 20, stiffness: 200 } });
  const scale = interpolate(progress, [0, 1], [0.5, 1], { extrapolateLeft: "clamp" });
  const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

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
      <div style={{ opacity, transform: `scale(${scale})`, transformOrigin: "bottom center" }}>
        <Card style={{ maxWidth: 600, padding: "28px 36px" }}>
          <div style={{ fontSize: 28, color: p.textSecondary, marginBottom: 8 }}>语音转文字</div>
          <div style={{ fontSize: 32, color: p.text, lineHeight: 1.6 }}>
            今天讨论了项目的整体进度，前端部分已经完成了80%，后端 API 还需要优化性能...
          </div>
        </Card>
      </div>
    </div>
  );
};

export const VMAISummary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const progress = spring({ frame: frame - 10, fps, config: { damping: 20, stiffness: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const x = interpolate(progress, [0, 1], [60, 0], { extrapolateLeft: "clamp" });

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
      <div style={{ opacity, transform: `translateX(${x}px)` }}>
        <Card style={{ maxWidth: 600, padding: "28px 36px", borderLeft: `4px solid ${p.accent}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>✨</span>
            <span style={{ fontSize: 28, fontWeight: 700, color: p.accent }}>AI 总结</span>
          </div>
          <div style={{ fontSize: 30, color: p.text, lineHeight: 1.6 }}>
            项目进展顺利，前端完成度80%。下周重点：后端 API 性能优化。
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- Full variants ---

export const VMFullA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  // Title
  const titleProgress = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Phone + mic
  const phoneProgress = spring({ frame: frame - 15, fps, config: { damping: 20, stiffness: 200 } });
  const phoneOpacity = interpolate(phoneProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const phoneY = interpolate(phoneProgress, [0, 1], [40, 0], { extrapolateLeft: "clamp" });

  // Waveform appears
  const waveOpacity = interpolate(frame, [30, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Text bubble
  const bubbleProgress = spring({ frame: frame - 60, fps, config: { damping: 20, stiffness: 200 } });
  const bubbleScale = interpolate(bubbleProgress, [0, 1], [0.5, 1], { extrapolateLeft: "clamp" });
  const bubbleOpacity = interpolate(bubbleProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

  // AI summary
  const aiProgress = spring({ frame: frame - 100, fps, config: { damping: 20, stiffness: 200 } });
  const aiOpacity = interpolate(aiProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const aiX = interpolate(aiProgress, [0, 1], [40, 0], { extrapolateLeft: "clamp" });

  const micPulse = 1 + 0.06 * Math.sin(frame * 0.15);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: p.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: defaultFont,
        padding: "80px 60px",
      }}
    >
      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: titleOpacity, marginBottom: 40 }}>
        <span style={{ fontSize: 48 }}>🎤</span>
        <span style={{ fontSize: 52, fontWeight: 700, color: p.text }}>语音随记</span>
      </div>

      {/* Phone with mic */}
      <div style={{ opacity: phoneOpacity, transform: `translateY(${phoneY}px)`, marginBottom: 40 }}>
        <PhoneMockup scale={0.85}>
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: p.bg,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              gap: 16,
            }}
          >
            {/* Mic */}
            <div style={{ fontSize: 56, transform: `scale(${micPulse})` }}>🎤</div>
            {/* Waveform */}
            <div style={{ opacity: waveOpacity }}>
              <WaveformBar barCount={16} color={p.accent} width={280} height={60} />
            </div>
            {/* Transcribed text */}
            <div style={{ opacity: bubbleOpacity, transform: `scale(${bubbleScale})`, padding: "0 12px" }}>
              <div
                style={{
                  backgroundColor: p.cardBg,
                  borderRadius: 12,
                  padding: "12px 16px",
                  fontSize: 14,
                  color: p.text,
                  lineHeight: 1.5,
                }}
              >
                今天讨论了项目进度...
              </div>
            </div>
            {/* AI summary */}
            <div style={{ opacity: aiOpacity, transform: `translateX(${aiX}px)`, padding: "0 12px" }}>
              <div
                style={{
                  backgroundColor: p.accent + "15",
                  borderRadius: 12,
                  padding: "12px 16px",
                  fontSize: 13,
                  color: p.text,
                  borderLeft: `3px solid ${p.accent}`,
                }}
              >
                <span style={{ fontSize: 14 }}>✨ </span>
                项目进展顺利，下周交付前端
              </div>
            </div>
          </div>
        </PhoneMockup>
      </div>
    </div>
  );
};

export const VMFullB: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  // No phone, larger card-based layout
  const titleProgress = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  const micPulse = 1 + 0.08 * Math.sin(frame * 0.15);

  const waveProgress = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const waveOpacity = interpolate(waveProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

  const textProgress = spring({ frame: frame - 50, fps, config: { damping: 200 } });
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const textY = interpolate(textProgress, [0, 1], [30, 0], { extrapolateLeft: "clamp" });

  const aiProgress = spring({ frame: frame - 80, fps, config: { damping: 20, stiffness: 200 } });
  const aiOpacity = interpolate(aiProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const aiY = interpolate(aiProgress, [0, 1], [30, 0], { extrapolateLeft: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: p.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: defaultFont,
        padding: 80,
        gap: 32,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: titleOpacity }}>
        <span style={{ fontSize: 48 }}>🎤</span>
        <span style={{ fontSize: 56, fontWeight: 700, color: p.text }}>语音随记</span>
      </div>

      {/* Large mic */}
      <div style={{ fontSize: 120, transform: `scale(${micPulse})`, margin: "20px 0" }}>🎤</div>

      {/* Waveform */}
      <div style={{ opacity: waveOpacity }}>
        <WaveformBar barCount={28} color={p.accent} width={700} height={100} />
      </div>

      {/* Transcription card */}
      <div style={{ opacity: textOpacity, transform: `translateY(${textY}px)`, width: "100%" }}>
        <Card style={{ padding: "28px 36px" }}>
          <div style={{ fontSize: 24, color: p.textSecondary, marginBottom: 8 }}>语音转文字</div>
          <div style={{ fontSize: 32, color: p.text, lineHeight: 1.6 }}>
            今天讨论了项目的整体进度，前端部分已经完成了80%...
          </div>
        </Card>
      </div>

      {/* AI Summary */}
      <div style={{ opacity: aiOpacity, transform: `translateY(${aiY}px)`, width: "100%" }}>
        <Card style={{ padding: "28px 36px", borderLeft: `4px solid ${p.accent}` }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 24 }}>✨</span>
            <span style={{ fontSize: 24, fontWeight: 700, color: p.accent }}>AI 总结</span>
          </div>
          <div style={{ fontSize: 30, color: p.text, lineHeight: 1.6 }}>
            项目进展顺利，前端完成度80%。下周重点：后端 API 性能优化。
          </div>
        </Card>
      </div>
    </div>
  );
};
