import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { warmPalette, newsSources } from "../theme";
import { defaultFont } from "../fonts";
import { NewsCard } from "../components/NewsCard";
import { Card } from "../components/Card";

// --- Individual elements ---

export const NFCardCascade: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const cards = [
    { source: 0, title: "B站年度百大UP主揭晓", summary: "2025年度百大UP主名单公布，科技区占比创新高..." },
    { source: 1, title: "小红书爆款穿搭指南", summary: "春季必备单品推荐，简约风持续流行..." },
    { source: 2, title: "OpenAI 发布 GPT-5", summary: "新一代模型在推理能力上取得重大突破..." },
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
        gap: 24,
      }}
    >
      {cards.map((card, i) => {
        const delay = i * 10;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 200 } });
        const x = interpolate(progress, [0, 1], [300, 0], { extrapolateLeft: "clamp" });
        const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

        return (
          <div key={i} style={{ opacity, transform: `translateX(${x}px)` }}>
            <NewsCard sourceIndex={card.source} title={card.title} summary={card.summary} />
          </div>
        );
      })}
    </div>
  );
};

export const NFSourceBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
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
        gap: 32,
      }}
    >
      {newsSources.map((source, i) => {
        const progress = spring({ frame: frame - i * 8, fps, config: { damping: 8 } });
        const scale = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });

        return (
          <div
            key={i}
            style={{
              transform: `scale(${scale})`,
              width: 160,
              height: 160,
              borderRadius: 40,
              backgroundColor: source.color + "18",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: `0 4px 16px ${source.color}20`,
            }}
          >
            <div style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: source.color }} />
            <div style={{ fontSize: 28, fontWeight: 700, color: source.color }}>{source.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export const NFGlossaryHighlight: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const terms = [
    { term: "GPT-5", def: "OpenAI 最新大语言模型，推理能力显著提升" },
    { term: "AGI", def: "通用人工智能，能执行任何人类智力任务" },
    { term: "RAG", def: "检索增强生成，结合检索与生成的AI技术" },
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
        gap: 24,
      }}
    >
      <div style={{ fontSize: 36, color: p.text, marginBottom: 16 }}>✨ AI 词条提取</div>
      {terms.map((t, i) => {
        const delay = 10 + i * 12;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 200 } });
        const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
        const y = interpolate(progress, [0, 1], [20, 0], { extrapolateLeft: "clamp" });

        return (
          <div key={i} style={{ opacity, transform: `translateY(${y}px)`, width: "100%" }}>
            <Card style={{ padding: "20px 32px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: p.accent,
                    backgroundColor: p.accent + "15",
                    borderRadius: 8,
                    padding: "4px 12px",
                  }}
                >
                  {t.term}
                </span>
                <span style={{ fontSize: 26, color: p.text }}>{t.def}</span>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

// --- Full variants ---

export const NFFullA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const titleProgress = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  const cards = [
    { source: 0, title: "B站年度百大UP主揭晓", summary: "科技区占比创新高..." },
    { source: 2, title: "OpenAI 发布 GPT-5", summary: "推理能力取得重大突破..." },
    { source: 3, title: "Telegram 更新频道功能", summary: "支持语音转文字和AI摘要..." },
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
      <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: titleOpacity, marginBottom: 16 }}>
        <span style={{ fontSize: 48 }}>📰</span>
        <span style={{ fontSize: 52, fontWeight: 700, color: p.text }}>信息流</span>
      </div>

      {/* Source badges row */}
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        {newsSources.map((source, i) => {
          const progress = spring({ frame: frame - 10 - i * 5, fps, config: { damping: 8 } });
          const scale = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
          return (
            <div
              key={i}
              style={{
                transform: `scale(${scale})`,
                padding: "8px 20px",
                borderRadius: 20,
                backgroundColor: source.color + "18",
                fontSize: 24,
                fontWeight: 600,
                color: source.color,
              }}
            >
              {source.name}
            </div>
          );
        })}
      </div>

      {/* News cards */}
      {cards.map((card, i) => {
        const delay = 25 + i * 10;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 200 } });
        const x = interpolate(progress, [0, 1], [200, 0], { extrapolateLeft: "clamp" });
        const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
        return (
          <div key={i} style={{ opacity, transform: `translateX(${x}px)`, width: "100%" }}>
            <NewsCard sourceIndex={card.source} title={card.title} summary={card.summary} style={{ width: "100%" }} />
          </div>
        );
      })}

      {/* Glossary highlight */}
      {(() => {
        const gProgress = spring({ frame: frame - 70, fps, config: { damping: 200 } });
        const gOpacity = interpolate(gProgress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
        return (
          <div style={{ opacity: gOpacity, width: "100%", marginTop: 8 }}>
            <Card style={{ padding: "16px 24px", borderLeft: `4px solid ${p.accent}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 22 }}>✨</span>
                <span style={{ fontSize: 24, fontWeight: 700, color: p.accent, backgroundColor: p.accent + "15", borderRadius: 6, padding: "2px 10px" }}>GPT-5</span>
                <span style={{ fontSize: 22, color: p.text }}>OpenAI 最新大语言模型</span>
              </div>
            </Card>
          </div>
        );
      })()}
    </div>
  );
};

export const NFFullB: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = warmPalette;

  const titleProgress = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

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
        gap: 28,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: titleOpacity }}>
        <span style={{ fontSize: 48 }}>📰</span>
        <span style={{ fontSize: 52, fontWeight: 700, color: p.text }}>信息流</span>
      </div>
      <div
        style={{
          opacity: titleOpacity,
          fontSize: 28,
          color: p.textSecondary,
          marginBottom: 16,
        }}
      >
        聚合多平台内容，AI 智能分析
      </div>

      {/* Stacked cards with source badges */}
      {[
        { source: 0, title: "B站年度百大UP主揭晓" },
        { source: 1, title: "小红书爆款穿搭指南" },
        { source: 2, title: "OpenAI 发布 GPT-5" },
        { source: 3, title: "Telegram 频道新功能" },
      ].map((card, i) => {
        const delay = 15 + i * 8;
        const progress = spring({ frame: frame - delay, fps, config: { damping: 20, stiffness: 200 } });
        const opacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: "clamp" });
        const y = interpolate(progress, [0, 1], [30, 0], { extrapolateLeft: "clamp" });
        const source = newsSources[card.source];

        return (
          <div key={i} style={{ opacity, transform: `translateY(${y}px)`, width: "100%" }}>
            <Card style={{ padding: "20px 28px", display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: source.color + "18",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: source.color }} />
              </div>
              <div>
                <div style={{ fontSize: 20, color: source.color, fontWeight: 600 }}>{source.name}</div>
                <div style={{ fontSize: 28, color: p.text, fontWeight: 600, marginTop: 2 }}>{card.title}</div>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
