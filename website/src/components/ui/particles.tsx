"use client";

import { useEffect, useRef } from "react";
import { useMousePosition } from "@/lib/hooks/use-mouse-position";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  ease?: number;
  color?: string;
  refresh?: boolean;
}

export function Particles({
  className = "",
  quantity = 100,
  ease = 80,
  color = "#ffffff",
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const particles = useRef<any[]>([]);
  const animationFrame = useRef<number>(0);

  useEffect(() => {
    if (mousePosition.x !== null && mousePosition.y !== null) {
      mouse.current.x = mousePosition.x;
      mouse.current.y = mousePosition.y;
    }
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createParticles = () => {
      const particlesArray = [];
      for (let i = 0; i < quantity; i++) {
        particlesArray.push({
          x: Math.random() * canvasRef.current!.width,
          y: Math.random() * canvasRef.current!.height,
          size: Math.random() * 2 + 0.1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
        });
      }
      return particlesArray;
    };

    particles.current = createParticles();

    const animate = () => {
      if (!canvasRef.current || !ctx) return;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;

      for (const particle of particles.current) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvasRef.current.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvasRef.current.width;
        if (particle.y > canvasRef.current.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvasRef.current.height;

        const dx = mouse.current.x - particle.x;
        const dy = mouse.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ease) {
          const angle = Math.atan2(dy, dx);
          particle.x -= Math.cos(angle) * 0.5;
          particle.y -= Math.sin(angle) * 0.5;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        for (const otherParticle of particles.current) {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 50) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrame.current);
    };
  }, [quantity, ease, color, refresh]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ background: "transparent" }}
    />
  );
} 