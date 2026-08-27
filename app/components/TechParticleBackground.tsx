"use client";

import { useEffect, useRef } from "react";

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

export default function TechParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const particleCount = isMobile ? 30 : 60;

    const particleColors = [
      "rgba(0, 240, 255, ",
      "rgba(168, 85, 247, ",
      "rgba(59, 130, 246, ",
      "rgba(236, 72, 153, ",
    ];

    const particles: NodeParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const colorIndex = Math.floor(Math.random() * particleColors.length);
      const alpha = 0.25 + Math.random() * 0.55;

      // Controlled positioning: Concentrate 85% of particles on the right side (robot area)
      let startX = width * 0.5 + Math.random() * (width * 0.5);
      if (i < 8) {
        // Stream trail extending towards center-left
        startX = width * 0.35 + Math.random() * (width * 0.2);
      }

      particles.push({
        x: startX,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.8 + 0.8,
        color: particleColors[colorIndex],
        alpha: alpha,
      });
    }

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting && !document.hidden;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    let time = 0;
    const maxConnectDistance = isMobile ? 65 : 100;

    const render = () => {
      animId = requestAnimationFrame(render);
      if (!isVisible) return;

      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      // Deep Navy / Near-Black Background Gradient
      const grad = ctx.createRadialGradient(
        width * 0.75,
        height * 0.5,
        40,
        width * 0.75,
        height * 0.5,
        width * 0.65
      );
      grad.addColorStop(0, "rgba(12, 20, 51, 0.85)");
      grad.addColorStop(0.55, "rgba(5, 9, 26, 0.96)");
      grad.addColorStop(1, "#030712");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Elegant Flowing Data Stream from Right Robot Area toward Center-Left
      ctx.beginPath();
      const streamY = height * 0.45;
      ctx.moveTo(width, streamY);
      for (let x = width; x >= width * 0.3; x -= 35) {
        const y = streamY + Math.sin(time * 1.2 + x * 0.007) * 18 + Math.cos(time + x * 0.003) * 10;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(0, 240, 255, 0.12)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Controlled Neural Network Nodes & Particles around Robot Area
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx + Math.sin(time + p.y * 0.01) * 0.1;
        p.y += p.vy + Math.cos(time + p.x * 0.01) * 0.1;

        // Keep particles bounded mainly on the right side
        if (p.x < width * 0.28) p.x = width * 0.85;
        if (p.x > width) p.x = width * 0.35;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = Math.max(0.15, Math.min(0.85, p.alpha + Math.sin(time * 2 + i) * 0.12));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.fill();

        // Connect nearby nodes around the robot
        const checkLimit = Math.min(particles.length, i + 5);
        for (let j = i + 1; j < checkLimit; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDistance) {
            const lineAlpha = (1 - dist / maxConnectDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 bg-[#030712] pointer-events-none w-full h-full"
    />
  );
}
