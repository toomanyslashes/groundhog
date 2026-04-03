import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { warmPalette } from "../theme";
import { defaultFont } from "../fonts";
import { Card } from "../components/Card";
import { CheckmarkPath } from "../components/CheckmarkPath";

// --- Individual elements ---

export const TDChecklistSlideIn: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const items = [
    { text: "完成前端页面重构", done: true },
    { text: "Review PR #42", done: true },
    { text: "准备周五演示文档", done: false },
    { text: "更新 API 文档", done: false },
    { text: "修复登录页面 Bug", done: false },
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
        padding: 80,
        gap: 16,
      }}
    >
      {items.map((item, i) => {
        const delay = i * 6;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 200 } });
        const x = interpolate(progress, [0, 1], [-200, 0], { extrapolateLeft: "clamp" });
        const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

        return (
          <div key={i} style={{ opacity, transform: `translateX(${x}px)`, width: "100%" }}>
            <Card style={{ padding: "20px 28px", display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  border: item.done ? "none" : `2px solid ${p.primary}30`,
                  backgroundColor: item.done ? p.green : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.done && <CheckmarkPath delay={delay + 15} size={24} color="white" />}
              </div>
              <span
                style={{
                  fontSize: 30,
                  color: item.done ? p.textSecondary : p.text,
                  textDecoration: item.done ? "line-through" : "none",
                }}
              >
                {item.text}
              </span>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export const TDCheckmarkDraw: React.FC = () => {
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
        gap: 60,
      }}
    >
      {[0, 15, 30].map((delay) => (
        <div
          key={delay}
          style={{
            width: 120,
            height: 120,
            borderRadius: 32,
            backgroundColor: p.green,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 8px 24px ${p.green}40`,
          }}
        >
          <CheckmarkPath delay={delay} size={64} color="white" />
        </div>
      ))}
    </div>
  );
};

export const TDCalendarIcon: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const progress = spring({ frame, fps, config: { damping: 8 } });
  const scale = interpolate(progress, [0, 1], [0, 1]);

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
          transform: `scale(${scale})`,
          width: 200,
          height: 220,
          borderRadius: 32,
          backgroundColor: p.cardBg,
          boxShadow: `0 8px 32px ${p.primary}15`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 56,
            backgroundColor: p.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 700,
            color: "white",
          }}
        >
          APR
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 164,
            fontSize: 80,
            fontWeight: 700,
            color: p.text,
          }}
        >
          2
        </div>
      </div>
    </div>
  );
};

// --- Full variants ---

export const TDFullA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const titleProgress = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  const items = [
    { text: "完成前端页面重构", done: true },
    { text: "Review PR #42", done: true },
    { text: "准备周五演示文档", done: false },
    { text: "更新 API 文档", done: false },
  ];

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
        gap: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: titleOpacity, marginBottom: 20 }}>
        <span style={{ fontSize: 48 }}>✅</span>
        <span style={{ fontSize: 52, fontWeight: 700, color: p.text }}>待办事项</span>
      </div>

      {/* Calendar mini */}
      {(() => {
        const calProg = spring({ frame: frame - 10, fps, config: { damping: 8 } });
        const calScale = interpolate(calProg, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
        return (
          <div style={{ transform: `scale(${calScale})`, marginBottom: 16 }}>
            <div
              style={{
                width: 120,
                height: 130,
                borderRadius: 20,
                backgroundColor: p.cardBg,
                boxShadow: `0 4px 16px ${p.primary}10`,
                overflow: "hidden",
              }}
            >
              <div style={{ height: 36, backgroundColor: p.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "white" }}>
                APR
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 94, fontSize: 48, fontWeight: 700, color: p.text }}>
                2
              </div>
            </div>
          </div>
        );
      })()}

      {/* Todo items */}
      {items.map((item, i) => {
        const delay = 20 + i * 6;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 200 } });
        const x = interpolate(progress, [0, 1], [-150, 0], { extrapolateLeft: "clamp" });
        const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

        return (
          <div key={i} style={{ opacity, transform: `translateX(${x}px)`, width: "100%" }}>
            <Card style={{ padding: "18px 24px", display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: item.done ? "none" : `2px solid ${p.primary}30`,
                  backgroundColor: item.done ? p.green : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.done && <CheckmarkPath delay={delay + 10} size={20} color="white" />}
              </div>
              <span
                style={{
                  fontSize: 28,
                  color: item.done ? p.textSecondary : p.text,
                  textDecoration: item.done ? "line-through" : "none",
                }}
              >
                {item.text}
              </span>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export const TDFullB: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const titleProgress = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Folder-based layout
  const folders = [
    {
      name: "工作",
      icon: "💼",
      items: ["完成前端重构", "Review PR #42"],
    },
    {
      name: "学习",
      icon: "📚",
      items: ["读完 DDIA 第3章", "刷 LeetCode"],
    },
  ];

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
        gap: 24,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: titleOpacity, marginBottom: 20 }}>
        <span style={{ fontSize: 48 }}>✅</span>
        <span style={{ fontSize: 52, fontWeight: 700, color: p.text }}>待办事项</span>
      </div>

      {folders.map((folder, fi) => {
        const folderDelay = 10 + fi * 25;
        const folderProgress = spring({ frame: frame - folderDelay, fps, config: { damping: 200 } });
        const folderOpacity = interpolate(folderProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

        return (
          <div key={fi} style={{ opacity: folderOpacity, width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, padding: "0 4px" }}>
              <span style={{ fontSize: 32 }}>{folder.icon}</span>
              <span style={{ fontSize: 32, fontWeight: 700, color: p.text }}>{folder.name}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {folder.items.map((item, ii) => {
                const itemDelay = folderDelay + 10 + ii * 6;
                const itemProgress = spring({ frame: frame - itemDelay, fps, config: { damping: 20, stiffness: 200 } });
                const itemX = interpolate(itemProgress, [0, 1], [-100, 0], { extrapolateLeft: "clamp" });
                const itemOpacity = interpolate(itemProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
                const isDone = ii === 0;

                return (
                  <div key={ii} style={{ opacity: itemOpacity, transform: `translateX(${itemX}px)` }}>
                    <Card style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: 14, marginLeft: 20 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 7,
                          border: isDone ? "none" : `2px solid ${p.primary}30`,
                          backgroundColor: isDone ? p.green : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {isDone && <CheckmarkPath delay={itemDelay + 8} size={18} color="white" />}
                      </div>
                      <span
                        style={{
                          fontSize: 26,
                          color: isDone ? p.textSecondary : p.text,
                          textDecoration: isDone ? "line-through" : "none",
                        }}
                      >
                        {item}
                      </span>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
