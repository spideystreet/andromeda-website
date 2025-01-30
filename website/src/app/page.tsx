"use client";

import { useRef } from "react";
import { useTheme } from "next-themes";
import TextCursorProximity from "@/components/ui/text-cursor-proximity";

const ASCII = ["✎", "✐", "✑", "✑"];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-12 md:p-16 lg:p-24"
      ref={containerRef}
    >
      <div 
        className="relative w-full cursor-pointer overflow-hidden justify-start items-start flex text-white"
        style={{ 
          backgroundColor: isDark ? "#000000" : "#0000FF",
          minHeight: "400px",
          height: "100vh"
        }}
      >
        <div className="flex flex-col justify-center uppercase leading-none pt-4 pl-6">
          <TextCursorProximity
            label="ANDROMEDA"
            className="text-3xl will-change-transform sm:text-6xl md:text-6xl lg:text-7xl"
            styles={{
              transform: {
                from: "scale(1)",
                to: "scale(1.4)",
              },
              color: { 
                from: "#FFFFFF", 
                to: isDark ? "#FF4444" : "#FF87C1"
              },
            }}
            falloff="gaussian"
            radius={100}
            containerRef={containerRef}
          />
          <TextCursorProximity
            label="MOBILE"
            className="leading-none text-3xl will-change-transform sm:text-6xl md:text-6xl lg:text-7xl"
            styles={{
              transform: {
                from: "scale(1)",
                to: "scale(1.4)",
              },
              color: { 
                from: "#FFFFFF", 
                to: isDark ? "#FF4444" : "#FF87C1"
              },
            }}
            falloff="gaussian"
            radius={100}
            containerRef={containerRef}
          />
        </div>

        <div className="absolute bottom-2 flex w-full justify-between px-6">
          {ASCII.map((pencil, i) => (
            <span 
              key={i} 
              className="text-2xl opacity-80"
              style={{ fontFamily: "serif" }}
            >
              {pencil}
            </span>
          ))}
        </div>

        <TextCursorProximity
          className="absolute top-6 right-6 hidden sm:block text-xs"
          label="2024"
          styles={{
            transform: {
              from: "scale(1)",
              to: "scale(1.4)",
            },
            color: { 
              from: "#FFFFFF", 
              to: isDark ? "#FF4444" : "#FF87C1"
            },
          }}
          falloff="linear"
          radius={10}
          containerRef={containerRef}
        />
      </div>
    </div>
  );
}
