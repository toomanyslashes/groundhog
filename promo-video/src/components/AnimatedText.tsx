import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { springPresets } from "../theme";

export const AnimatedText: React.FC<{
  children: React.ReactNode;
  delay?: number;
  preset?: keyof typeof springPresets;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, preset = "smooth", style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const config = springPresets[preset];

  const progress = spring({ frame: frame - delay, fps, config });
  const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const y = interpolate(progress, [0, 1], [20, 0], { extrapolateLeft: "clamp" });
  const scale = interpolate(progress, [0, 1], [0.97, 1], { extrapolateLeft: "clamp" });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
