import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import React from "react";
const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "#a855f7", // purple text
        "--normal-border": "#a855f7", // purple border
      }}
      {...props}
    />
  );
};

export { Toaster };
