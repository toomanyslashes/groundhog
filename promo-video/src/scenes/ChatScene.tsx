import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { warmPalette } from "../theme";
import { defaultFont } from "../fonts";
import { ChatBubble } from "../components/ChatBubble";

// --- Individual elements ---

export const CHUserBubble: React.FC = () => {
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
        padding: 80,
      }}
    >
      <div style={{ opacity, transform: `scale(${scale})`, transformOrigin: "bottom right", width: "100%" }}>
        <ChatBubble text="最近有什么好书推荐？想看点关于投资和科技的" isUser />
      </div>
    </div>
  );
};

export const CHTypingDots: React.FC = () => {
  const frame = useCurrentFrame();
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
      <div
        style={{
          backgroundColor: p.cardBg,
          borderRadius: 20,
          padding: "20px 32px",
          display: "flex",
          gap: 8,
          boxShadow: `0 2px 8px ${p.primary}10`,
        }}
      >
        {[0, 1, 2].map((i) => {
          const bounce = Math.sin((frame - i * 5) * 0.2);
          const y = Math.max(0, bounce) * -10;
          const opacity = 0.4 + Math.max(0, bounce) * 0.6;

          return (
            <div
              key={i}
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: p.primary,
                opacity,
                transform: `translateY(${y}px)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const CHAIReply: React.FC = () => {
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
        padding: 80,
      }}
    >
      <div style={{ opacity, transform: `scale(${scale})`, transformOrigin: "bottom left", width: "100%" }}>
        <ChatBubble text="推荐《百年孤独》和《穷查理宝典》，前者是文学经典，后者涵盖投资和多元思维模型。" />
      </div>
    </div>
  );
};

export const CHPersonaAvatar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const progress = spring({ frame, fps, config: { damping: 8 } });
  const scale = interpolate(progress, [0, 1], [0, 1]);

  const nameProgress = spring({ frame: frame - 15, fps, config: { damping: 200 } });
  const nameOpacity = interpolate(nameProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

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
      <div
        style={{
          transform: `scale(${scale})`,
          width: 160,
          height: 160,
          borderRadius: 80,
          backgroundColor: p.purple + "30",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 80,
          boxShadow: `0 8px 24px ${p.purple}20`,
        }}
      >
        🧑‍💼
      </div>
      <div style={{ opacity: nameOpacity, textAlign: "center" }}>
        <div style={{ fontSize: 36, fontWeight: 700, color: p.text }}>硅谷王川</div>
        <div style={{ fontSize: 24, color: p.textSecondary }}>投资 · 科技洞察</div>
      </div>
    </div>
  );
};

// --- Full variants ---

export const CHFullA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const titleProgress = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Avatar
  const avatarProgress = spring({ frame: frame - 10, fps, config: { damping: 8 } });
  const avatarScale = interpolate(avatarProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

  // User message
  const userProgress = spring({ frame: frame - 30, fps, config: { damping: 20, stiffness: 200 } });
  const userScale = interpolate(userProgress, [0, 1], [0.5, 1], { extrapolateLeft: "clamp" });
  const userOpacity = interpolate(userProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

  // Typing dots (frames 55-75)
  const showDots = frame >= 55 && frame < 80;

  // AI reply
  const aiProgress = spring({ frame: frame - 80, fps, config: { damping: 20, stiffness: 200 } });
  const aiScale = interpolate(aiProgress, [0, 1], [0.5, 1], { extrapolateLeft: "clamp" });
  const aiOpacity = interpolate(aiProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

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
      <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: titleOpacity }}>
        <span style={{ fontSize: 48 }}>💬</span>
        <span style={{ fontSize: 52, fontWeight: 700, color: p.text }}>和他们聊天</span>
      </div>

      {/* Avatar */}
      <div
        style={{
          transform: `scale(${avatarScale})`,
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: p.purple + "30",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 52,
        }}
      >
        🧑‍💼
      </div>

      {/* Chat area */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
        {/* User bubble */}
        <div style={{ opacity: userOpacity, transform: `scale(${userScale})`, transformOrigin: "bottom right" }}>
          <ChatBubble text="最近有什么好书推荐？" isUser />
        </div>

        {/* Typing dots */}
        {showDots && (
          <div style={{ display: "flex", gap: 6, padding: "12px 20px", backgroundColor: p.cardBg, borderRadius: 16, width: "fit-content", boxShadow: `0 2px 8px ${p.primary}10` }}>
            {[0, 1, 2].map((i) => {
              const bounce = Math.sin((frame - i * 5) * 0.2);
              return (
                <div
                  key={i}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: p.primary,
                    opacity: 0.4 + Math.max(0, bounce) * 0.6,
                    transform: `translateY(${Math.max(0, bounce) * -6}px)`,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* AI reply */}
        <div style={{ opacity: aiOpacity, transform: `scale(${aiScale})`, transformOrigin: "bottom left" }}>
          <ChatBubble text="推荐《穷查理宝典》，涵盖投资和多元思维模型，非常值得一读。" />
        </div>
      </div>
    </div>
  );
};

export const CHFullB: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const titleProgress = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Multiple persona cards
  const personas = [
    { emoji: "🧑‍💼", name: "硅谷王川", desc: "投资 · 科技", color: p.purple },
    { emoji: "📖", name: "读书达人", desc: "文学 · 哲学", color: p.blue },
    { emoji: "🏋️", name: "健身教练", desc: "运动 · 营养", color: p.green },
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
      <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: titleOpacity, marginBottom: 12 }}>
        <span style={{ fontSize: 48 }}>💬</span>
        <span style={{ fontSize: 52, fontWeight: 700, color: p.text }}>和他们聊天</span>
      </div>

      {/* Persona cards */}
      {personas.map((persona, i) => {
        const delay = 15 + i * 10;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 200 } });
        const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
        const y = interpolate(progress, [0, 1], [30, 0], { extrapolateLeft: "clamp" });

        return (
          <div key={i} style={{ opacity, transform: `translateY(${y}px)`, width: "100%" }}>
            <div
              style={{
                backgroundColor: p.cardBg,
                borderRadius: 20,
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                boxShadow: `0 4px 12px ${p.primary}10`,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  backgroundColor: persona.color + "20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 40,
                }}
              >
                {persona.emoji}
              </div>
              <div>
                <div style={{ fontSize: 30, fontWeight: 700, color: p.text }}>{persona.name}</div>
                <div style={{ fontSize: 22, color: p.textSecondary }}>{persona.desc}</div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Chat preview */}
      {(() => {
        const chatDelay = 50;
        const chatProgress = spring({ frame: frame - chatDelay, fps, config: { damping: 200 } });
        const chatOpacity = interpolate(chatProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

        const replyProgress = spring({ frame: frame - chatDelay - 20, fps, config: { damping: 20, stiffness: 200 } });
        const replyOpacity = interpolate(replyProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

        return (
          <div style={{ opacity: chatOpacity, width: "100%", display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
            <ChatBubble text="最近市场怎么看？" isUser />
            <div style={{ opacity: replyOpacity }}>
              <ChatBubble text="建议关注AI基础设施和能源板块..." />
            </div>
          </div>
        );
      })()}
    </div>
  );
};
