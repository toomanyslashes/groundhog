import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { type Palette, warmPalette } from "../theme";
import { defaultFont } from "../fonts";

// --- Individual elements ---

export const IntroLogoBounce: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const progress = spring({ frame, fps, config: { damping: 8 } });
  const scale = interpolate(progress, [0, 1], [0, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

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
          opacity,
          transform: `scale(${scale})`,
          fontSize: 200,
          textAlign: "center",
        }}
      >
        🐿️
      </div>
    </div>
  );
};

export const IntroLogoFade: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const progress = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.8, 1]);

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
      <div style={{ opacity, transform: `scale(${scale})`, fontSize: 200, textAlign: "center" }}>
        🐿️
      </div>
    </div>
  );
};

export const IntroTaglineType: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const text = "你的个人随记助手";
  const charsToShow = Math.min(Math.floor(frame / 3), text.length);
  const displayText = text.slice(0, charsToShow);

  // Cursor blink
  const cursorVisible = Math.floor(frame / 15) % 2 === 0 || charsToShow < text.length;

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
      <div style={{ fontSize: 56, color: p.text }}>
        {displayText}
        <span style={{ opacity: cursorVisible ? 1 : 0, color: p.accent }}>|</span>
      </div>
    </div>
  );
};

export const IntroTaglineSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const progress = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const y = interpolate(progress, [0, 1], [40, 0], { extrapolateLeft: "clamp" });

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
      <div style={{ opacity, transform: `translateY(${y}px)`, fontSize: 56, color: p.text, textAlign: "center" }}>
        你的个人随记助手
      </div>
    </div>
  );
};

// --- Full variants ---

export const IntroFullA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  // Logo bounce
  const logoProgress = spring({ frame, fps, config: { damping: 8 } });
  const logoScale = interpolate(logoProgress, [0, 1], [0, 1]);
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);

  // App name
  const nameProgress = spring({ frame: frame - 20, fps, config: { damping: 200 } });
  const nameOpacity = interpolate(nameProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const nameY = interpolate(nameProgress, [0, 1], [30, 0], { extrapolateLeft: "clamp" });

  // Tagline typewriter
  const taglineText = "你的个人随记助手";
  const typeStart = 40;
  const charsToShow = Math.min(Math.max(Math.floor((frame - typeStart) / 3), 0), taglineText.length);
  const displayTagline = taglineText.slice(0, charsToShow);
  const cursorVisible = frame >= typeStart && (Math.floor(frame / 15) % 2 === 0 || charsToShow < taglineText.length);

  // Subtitle
  const subProgress = spring({ frame: frame - 80, fps, config: { damping: 200 } });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

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
      <div style={{ opacity: logoOpacity, transform: `scale(${logoScale})`, fontSize: 180, marginBottom: 20 }}>
        🐿️
      </div>
      <div
        style={{
          opacity: nameOpacity,
          transform: `translateY(${nameY}px)`,
          fontSize: 80,
          fontWeight: 700,
          color: p.primary,
        }}
      >
        Groundhog
      </div>
      <div style={{ fontSize: 52, color: p.text, height: 70 }}>
        {displayTagline}
        <span style={{ opacity: cursorVisible ? 1 : 0, color: p.accent }}>|</span>
      </div>
      <div style={{ opacity: subOpacity, fontSize: 32, color: p.textSecondary, marginTop: 20 }}>
        语音记录思想 · 追踪身心状态 · 聚合信息流
      </div>
    </div>
  );
};

export const IntroFullB: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  // Fade in logo
  const logoProgress = spring({ frame, fps, config: { damping: 200 } });
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);
  const logoScale = interpolate(logoProgress, [0, 1], [0.8, 1]);

  // Name slide
  const nameProgress = spring({ frame: frame - 15, fps, config: { damping: 20, stiffness: 200 } });
  const nameOpacity = interpolate(nameProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const nameX = interpolate(nameProgress, [0, 1], [-60, 0], { extrapolateLeft: "clamp" });

  // Tagline slide
  const tagProgress = spring({ frame: frame - 30, fps, config: { damping: 200 } });
  const tagOpacity = interpolate(tagProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const tagY = interpolate(tagProgress, [0, 1], [30, 0], { extrapolateLeft: "clamp" });

  // Feature icons
  const features = ["🎤", "❤️", "📰", "✅", "💬"];

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
        gap: 20,
      }}
    >
      <div style={{ opacity: logoOpacity, transform: `scale(${logoScale})`, fontSize: 160, marginBottom: 24 }}>
        🐿️
      </div>
      <div
        style={{
          opacity: nameOpacity,
          transform: `translateX(${nameX}px)`,
          fontSize: 76,
          fontWeight: 700,
          color: p.primary,
        }}
      >
        Groundhog
      </div>
      <div
        style={{
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
          fontSize: 48,
          color: p.text,
          textAlign: "center",
        }}
      >
        你的个人随记助手
      </div>
      <div style={{ display: "flex", gap: 24, marginTop: 40 }}>
        {features.map((icon, i) => {
          const iconProgress = spring({ frame: frame - 50 - i * 5, fps, config: { damping: 8 } });
          const iconScale = interpolate(iconProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
          return (
            <div key={i} style={{ transform: `scale(${iconScale})`, fontSize: 56 }}>
              {icon}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const IntroFullC: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  // Center circle expand
  const circleProgress = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const circleScale = interpolate(circleProgress, [0, 1], [0, 1]);

  // Logo appear after circle
  const logoProgress = spring({ frame: frame - 15, fps, config: { damping: 8 } });
  const logoScale = interpolate(logoProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

  // Text from bottom
  const textProgress = spring({ frame: frame - 30, fps, config: { damping: 200 } });
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const textY = interpolate(textProgress, [0, 1], [60, 0], { extrapolateLeft: "clamp" });

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
        position: "relative",
      }}
    >
      {/* Background circle */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: 250,
          backgroundColor: p.accent + "20",
          transform: `scale(${circleScale})`,
        }}
      />

      <div style={{ transform: `scale(${logoScale})`, fontSize: 180, zIndex: 1 }}>🐿️</div>

      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          zIndex: 1,
          textAlign: "center",
          marginTop: 32,
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, color: p.primary }}>Groundhog</div>
        <div style={{ fontSize: 44, color: p.text, marginTop: 12 }}>你的个人随记助手</div>
      </div>
    </div>
  );
};
