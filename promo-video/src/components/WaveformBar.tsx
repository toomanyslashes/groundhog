import { useCurrentFrame, useVideoConfig } from "remotion";

export const WaveformBar: React.FC<{
  barCount?: number;
  color?: string;
  width?: number;
  height?: number;
}> = ({ barCount = 24, color = "#EDA661", width = 600, height = 120 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barWidth = (width / barCount) * 0.6;
  const barGap = (width / barCount) * 0.4;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {Array.from({ length: barCount }, (_, i) => {
        const speed = 0.08 + (i % 5) * 0.02;
        const offset = i * 0.8;
        const amplitude = 0.3 + 0.7 * Math.abs(Math.sin(frame * speed + offset));
        const barHeight = amplitude * height * 0.9;
        const x = i * (barWidth + barGap);
        const y = (height - barHeight) / 2;

        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            rx={barWidth / 2}
            fill={color}
            opacity={0.6 + amplitude * 0.4}
          />
        );
      })}
    </svg>
  );
};
