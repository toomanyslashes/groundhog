import React from "react";
import { warmPalette, radius } from "../theme";

export const Card: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  bgColor?: string;
}> = ({ children, style, bgColor }) => {
  const p = warmPalette;
  return (
    <div
      style={{
        backgroundColor: bgColor || p.cardBg,
        borderRadius: radius.xl,
        padding: "24px 32px",
        boxShadow: `0 2px 8px ${p.primary}10, 0 8px 24px ${p.primary}08`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
