import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { warmPalette, moodColors } from "../theme";
import { defaultFont } from "../fonts";
import { MoodGrid } from "../components/MoodGrid";
import { PhoneMockup } from "../components/PhoneMockup";

// --- Individual elements ---

export const WBMoodGrid: React.FC = () => {
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
        fontFamily: defaultFont,
      }}
    >
      <MoodGrid highlightIndex={0} staggerDelay={3} />
    </div>
  );
};

export const WBWorkTimeBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const fillProgress = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const fillWidth = interpolate(fillProgress, [0, 1], [0, 75], { extrapolateLeft: "clamp" });

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
        padding: 80,
      }}
    >
      <div style={{ fontSize: 36, color: p.text, marginBottom: 24 }}>今日工作时长</div>
      <div
        style={{
          width: 700,
          height: 48,
          borderRadius: 24,
          backgroundColor: p.primary + "15",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${fillWidth}%`,
            height: "100%",
            borderRadius: 24,
            backgroundColor: p.accent,
            boxShadow: `0 2px 8px ${p.accent}40`,
          }}
        />
      </div>
      <div style={{ fontSize: 28, color: p.textSecondary, marginTop: 16 }}>6h 15m / 8h</div>
    </div>
  );
};

export const WBLineChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  // Data points
  const data = [40, 65, 55, 80, 70, 90, 75];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const chartW = 700;
  const chartH = 300;
  const padX = 40;
  const padY = 20;

  const drawProgress = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const pointsToShow = interpolate(drawProgress, [0, 1], [0, data.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const points = data.map((v, i) => ({
    x: padX + (i / (data.length - 1)) * (chartW - padX * 2),
    y: padY + (1 - v / 100) * (chartH - padY * 2),
  }));

  const pathD = points
    .slice(0, Math.ceil(pointsToShow))
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`)
    .join(" ");

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
      }}
    >
      <div style={{ fontSize: 36, color: p.text, marginBottom: 24 }}>握力趋势 (7天)</div>
      <svg width={chartW} height={chartH}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((v) => {
          const y = padY + (1 - v / 100) * (chartH - padY * 2);
          return (
            <line key={v} x1={padX} y1={y} x2={chartW - padX} y2={y} stroke={p.primary + "15"} strokeWidth={1} />
          );
        })}
        {/* Line */}
        <path d={pathD} fill="none" stroke={p.green} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        {/* Points */}
        {points.slice(0, Math.ceil(pointsToShow)).map((pt, i) => (
          <circle key={i} cx={pt.x} cy={pt.y} r={6} fill={p.green} stroke="white" strokeWidth={2} />
        ))}
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", width: chartW - padX * 2, paddingLeft: padX, paddingRight: padX }}>
        {labels.map((l) => (
          <span key={l} style={{ fontSize: 20, color: p.textSecondary }}>{l}</span>
        ))}
      </div>
    </div>
  );
};

// --- Full variants ---

export const WBFullA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const titleProgress = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  const barProgress = spring({ frame: frame - 50, fps, config: { damping: 200 } });
  const barOpacity = interpolate(barProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const barFill = interpolate(barProgress, [0, 1], [0, 75], { extrapolateLeft: "clamp" });

  const chartProgress = spring({ frame: frame - 90, fps, config: { damping: 200 } });
  const chartOpacity = interpolate(chartProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

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
        gap: 32,
      }}
    >
      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: titleOpacity }}>
        <span style={{ fontSize: 48 }}>❤️</span>
        <span style={{ fontSize: 52, fontWeight: 700, color: p.text }}>身心记录</span>
      </div>

      {/* Mood Grid */}
      <MoodGrid highlightIndex={0} staggerDelay={3} />

      {/* Work time bar */}
      <div style={{ opacity: barOpacity, width: "100%", marginTop: 16 }}>
        <div style={{ fontSize: 28, color: p.textSecondary, marginBottom: 8 }}>今日工作时长</div>
        <div style={{ width: "100%", height: 36, borderRadius: 18, backgroundColor: p.primary + "15" }}>
          <div
            style={{
              width: `${barFill}%`,
              height: "100%",
              borderRadius: 18,
              backgroundColor: p.accent,
            }}
          />
        </div>
        <div style={{ fontSize: 24, color: p.textSecondary, marginTop: 6 }}>6h 15m / 8h</div>
      </div>

      {/* Mini chart */}
      <div style={{ opacity: chartOpacity, marginTop: 8 }}>
        <div style={{ fontSize: 28, color: p.textSecondary, marginBottom: 8 }}>握力趋势</div>
        <svg width={500} height={120}>
          {[40, 65, 55, 80, 70, 90, 75].map((v, i, arr) => {
            const x = 20 + (i / (arr.length - 1)) * 460;
            const y = 10 + (1 - v / 100) * 100;
            const drawProg = spring({ frame: frame - 90 - i * 5, fps, config: { damping: 200 } });
            const pointOpacity = interpolate(drawProg, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
            return (
              <g key={i}>
                {i > 0 && (
                  <line
                    x1={20 + ((i - 1) / (arr.length - 1)) * 460}
                    y1={10 + (1 - arr[i - 1] / 100) * 100}
                    x2={x}
                    y2={y}
                    stroke={p.green}
                    strokeWidth={2}
                    opacity={pointOpacity}
                  />
                )}
                <circle cx={x} cy={y} r={5} fill={p.green} opacity={pointOpacity} />
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export const WBFullB: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const phoneProgress = spring({ frame: frame - 5, fps, config: { damping: 20, stiffness: 200 } });
  const phoneOpacity = interpolate(phoneProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
  const phoneY = interpolate(phoneProgress, [0, 1], [60, 0], { extrapolateLeft: "clamp" });

  const titleProgress = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  const moods = Object.values(moodColors);

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
      <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: titleOpacity, marginBottom: 40 }}>
        <span style={{ fontSize: 48 }}>❤️</span>
        <span style={{ fontSize: 52, fontWeight: 700, color: p.text }}>身心记录</span>
      </div>

      <div style={{ opacity: phoneOpacity, transform: `translateY(${phoneY}px)` }}>
        <PhoneMockup scale={0.9}>
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: p.bg,
              display: "flex",
              flexDirection: "column",
              padding: "50px 16px 16px",
              gap: 12,
            }}
          >
            {/* Mini mood grid inside phone */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
              {moods.slice(0, 8).map((mood, i) => {
                const progress = spring({ frame: frame - 20 - i * 3, fps, config: { damping: 8 } });
                const scale = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
                return (
                  <div
                    key={i}
                    style={{
                      transform: `scale(${scale})`,
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      backgroundColor: mood.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    }}
                  >
                    {mood.emoji}
                  </div>
                );
              })}
            </div>
            {/* Work bar */}
            <div style={{ padding: "0 8px", marginTop: 8 }}>
              <div style={{ fontSize: 11, color: p.textSecondary }}>工作时长</div>
              <div style={{ height: 12, borderRadius: 6, backgroundColor: p.primary + "15", marginTop: 4 }}>
                <div
                  style={{
                    width: `${interpolate(spring({ frame: frame - 60, fps, config: { damping: 200 } }), [0, 1], [0, 75], { extrapolateLeft: "clamp" })}%`,
                    height: "100%",
                    borderRadius: 6,
                    backgroundColor: p.accent,
                  }}
                />
              </div>
            </div>
            {/* Mini chart */}
            <svg width={300} height={80} style={{ marginTop: 8, alignSelf: "center" }}>
              {[40, 65, 55, 80, 70, 90, 75].map((v, i, arr) => {
                const x = 10 + (i / (arr.length - 1)) * 280;
                const y = 5 + (1 - v / 100) * 70;
                return (
                  <g key={i}>
                    {i > 0 && (
                      <line
                        x1={10 + ((i - 1) / (arr.length - 1)) * 280}
                        y1={5 + (1 - arr[i - 1] / 100) * 70}
                        x2={x}
                        y2={y}
                        stroke={p.green}
                        strokeWidth={2}
                      />
                    )}
                    <circle cx={x} cy={y} r={3} fill={p.green} />
                  </g>
                );
              })}
            </svg>
          </div>
        </PhoneMockup>
      </div>
    </div>
  );
};
