import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const CheckmarkPath: React.FC<{
  delay?: number;
  size?: number;
  color?: string;
}> = ({ delay = 0, size = 32, color = "#99C7A6" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 200 } });
  const dashOffset = interpolate(progress, [0, 1], [40, 0], { extrapolateLeft: "clamp" });
  const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ opacity }}>
      <path
        d="M5 13l4 4L19 7"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={40}
        strokeDashoffset={dashOffset}
      />
    </svg>
  );
};
