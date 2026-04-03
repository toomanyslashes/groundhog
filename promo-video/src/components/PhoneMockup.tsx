import React from "react";
import { warmPalette } from "../theme";

export const PhoneMockup: React.FC<{
  children: React.ReactNode;
  scale?: number;
}> = ({ children, scale = 1 }) => {
  // iPhone 15 proportions (simplified)
  const phoneWidth = 380;
  const phoneHeight = 820;
  const bezelRadius = 56;
  const screenRadius = 48;
  const notchWidth = 120;
  const notchHeight = 32;

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center center",
      }}
    >
      {/* Phone body */}
      <div
        style={{
          width: phoneWidth,
          height: phoneHeight,
          borderRadius: bezelRadius,
          backgroundColor: "#1A1A1A",
          padding: 8,
          boxShadow: `0 20px 60px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)`,
          position: "relative",
        }}
      >
        {/* Screen */}
        <div
          style={{
            width: phoneWidth - 16,
            height: phoneHeight - 16,
            borderRadius: screenRadius,
            overflow: "hidden",
            position: "relative",
            backgroundColor: warmPalette.bg,
          }}
        >
          {children}

          {/* Dynamic Island */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: "50%",
              transform: "translateX(-50%)",
              width: notchWidth,
              height: notchHeight,
              borderRadius: notchHeight / 2,
              backgroundColor: "#1A1A1A",
            }}
          />
        </div>
      </div>
    </div>
  );
};
