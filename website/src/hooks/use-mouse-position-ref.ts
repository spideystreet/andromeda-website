import { useEffect, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePositionRef(containerRef: React.RefObject<HTMLElement | null>) {
  const mousePosition = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [containerRef]);

  return mousePosition;
} 