import React from "react";
import { warmPalette, radius, newsSources } from "../theme";
import { defaultFont } from "../fonts";

export const NewsCard: React.FC<{
  sourceIndex?: number;
  title?: string;
  summary?: string;
  style?: React.CSSProperties;
}> = ({
  sourceIndex = 0,
  title = "科技行业最新动态",
  summary = "AI 技术持续突破，多家公司发布新产品...",
  style,
}) => {
  const p = warmPalette;
  const source = newsSources[sourceIndex % newsSources.length];

  return (
    <div
      style={{
        backgroundColor: p.cardBg,
        borderRadius: radius.xl,
        padding: "28px 32px",
        boxShadow: `0 4px 16px ${p.primary}12`,
        fontFamily: defaultFont,
        width: 500,
        ...style,
      }}
    >
      {/* Source badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          backgroundColor: source.color + "18",
          borderRadius: 12,
          padding: "6px 14px",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: source.color,
          }}
        />
        <span style={{ fontSize: 20, color: source.color, fontWeight: 600 }}>{source.name}</span>
      </div>

      {/* Title */}
      <div style={{ fontSize: 30, fontWeight: 700, color: p.text, marginBottom: 8, lineHeight: 1.3 }}>
        {title}
      </div>

      {/* Summary */}
      <div style={{ fontSize: 22, color: p.textSecondary, lineHeight: 1.5 }}>{summary}</div>
    </div>
  );
};
