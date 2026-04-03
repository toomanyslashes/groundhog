import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { moodColors } from "../theme";

export const MoodGrid: React.FC<{
  highlightIndex?: number;
  staggerDelay?: number;
}> = ({ highlightIndex = 0, staggerDelay = 3 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const moods = Object.values(moodColors);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", maxWidth: 500 }}>
      {moods.map((mood, i) => {
        const delay = i * staggerDelay;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 8 } });
        const scale = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
        const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

        const isHighlighted = i === highlightIndex;
        const highlightProgress = spring({
          frame: frame - 40,
          fps,
          config: { damping: 8 },
        });
        const ringScale = isHighlighted
          ? interpolate(highlightProgress, [0, 1], [0.8, 1], { extrapolateLeft: "clamp" })
          : 1;
        const ringOpacity = isHighlighted
          ? interpolate(highlightProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" })
          : 0;

        return (
          <div
            key={i}
            style={{
              opacity,
              transform: `scale(${scale})`,
              width: 100,
              height: 100,
              borderRadius: 24,
              backgroundColor: mood.color,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              boxShadow: `0 4px 12px ${mood.color}30`,
            }}
          >
            <span style={{ fontSize: 36 }}>{mood.emoji}</span>
            <span style={{ fontSize: 14, color: "#fff", fontWeight: 600, marginTop: 2 }}>{mood.label}</span>

            {/* Highlight ring */}
            {isHighlighted && (
              <div
                style={{
                  position: "absolute",
                  inset: -6,
                  borderRadius: 28,
                  border: `3px solid ${mood.color}`,
                  opacity: ringOpacity,
                  transform: `scale(${ringScale})`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
