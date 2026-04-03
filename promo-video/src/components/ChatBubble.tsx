import React from "react";
import { warmPalette, radius } from "../theme";
import { defaultFont } from "../fonts";

export const ChatBubble: React.FC<{
  text: string;
  isUser?: boolean;
  style?: React.CSSProperties;
}> = ({ text, isUser = false, style }) => {
  const p = warmPalette;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        fontFamily: defaultFont,
        ...style,
      }}
    >
      <div
        style={{
          maxWidth: "75%",
          backgroundColor: isUser ? p.accent : p.cardBg,
          color: isUser ? "white" : p.text,
          borderRadius: 20,
          borderTopLeftRadius: isUser ? 20 : 6,
          borderTopRightRadius: isUser ? 6 : 20,
          padding: "16px 24px",
          fontSize: 28,
          lineHeight: 1.5,
          boxShadow: isUser ? `0 4px 12px ${p.accent}30` : `0 2px 8px ${p.primary}10`,
        }}
      >
        {text}
      </div>
    </div>
  );
};
