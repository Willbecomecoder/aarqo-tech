"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MorphingParticleCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isVisible = true;
    const isMobile = window.innerWidth < 768;
    // Reduced count on mobile for clean breathing space and zero screen clutter
    const count = isMobile ? 1500 : 4200;
    const maxLines = isMobile ? 500 : 2200;

    // 1. WebGL Scene & Perspective Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#030712");

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    // 2. High Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    container.appendChild(renderer.domElement);

    // 3. Glowing Node Particle Texture
    const createGlowingNodeTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.25, "rgba(255, 255, 255, 0.85)");
      grad.addColorStop(0.6, "rgba(255, 255, 255, 0.25)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();

      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      return tex;
    };

    const pointTexture = createGlowingNodeTexture();

    // 4. Formations Setup
    const geometry = new THREE.BufferGeometry();
    const currentPos = new Float32Array(count * 3);

    const form0Hero = new Float32Array(count * 3);
    const form1Chatbot = new Float32Array(count * 3);
    const form2Agent = new Float32Array(count * 3);
    const form3Automation = new Float32Array(count * 3);
    const form4Website = new Float32Array(count * 3);
    const form5Voice = new Float32Array(count * 3);

    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    const palette = [
      new THREE.Color("#00F0FF"),
      new THREE.Color("#A855F7"),
      new THREE.Color("#3B82F6"),
      new THREE.Color("#EC4899"),
      new THREE.Color("#FF7A00"),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const col = palette[i % palette.length];
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      speeds[i] = 0.2 + Math.random() * 0.4;

      // On mobile, concentrate particles around the central robot zone (y: -8 to +8)
      const hx = (Math.random() - 0.5) * (isMobile ? 55 : 85);
      const hy = (Math.random() - 0.5) * (isMobile ? 35 : 55);
      const hz = (Math.random() - 0.5) * 30;
      form0Hero[i3] = hx;
      form0Hero[i3 + 1] = hy;
      form0Hero[i3 + 2] = hz;

      // Chatbot Flow Ribbon
      const cx = (Math.random() - 0.5) * 70;
      const cy = Math.sin(cx * 0.2) * 8;
      const cz = Math.cos(cx * 0.2) * 8;
      form1Chatbot[i3] = cx;
      form1Chatbot[i3 + 1] = cy;
      form1Chatbot[i3 + 2] = cz;

      // AI Agent Clusters
      const cluster = i % 4;
      const centers = [
        [-16, 6, 0],
        [0, 8, -4],
        [16, 4, 0],
        [-10, -6, 4],
      ];
      const c = centers[cluster];
      form2Agent[i3] = c[0] + (Math.random() - 0.5) * 8;
      form2Agent[i3 + 1] = c[1] + (Math.random() - 0.5) * 8;
      form2Agent[i3 + 2] = c[2] + (Math.random() - 0.5) * 8;

      // AI Automation Streams
      const ax = (Math.random() - 0.5) * 65;
      const ay = ((i % 4) - 1.5) * 6.5;
      const az = (Math.random() - 0.5) * 7;
      form3Automation[i3] = ax;
      form3Automation[i3 + 1] = ay;
      form3Automation[i3 + 2] = az;

      // Websites Interface Grid
      const wx = ((i % 16) - 8) * 3.2;
      const wy = (Math.floor((i / 16) % 16) - 8) * 2.0;
      const wz = (Math.random() - 0.5) * 4;
      form4Website[i3] = wx;
      form4Website[i3 + 1] = wy;
      form4Website[i3 + 2] = wz;

      // Voice Signal Rings
      const ringIndex = i % 3;
      const radius = 5 + ringIndex * 5;
      const angle = (i / count) * Math.PI * 2 * 3;
      form5Voice[i3] = Math.cos(angle) * radius;
      form5Voice[i3 + 1] = Math.sin(angle) * radius;
      form5Voice[i3 + 2] = (Math.random() - 0.5) * 4;

      currentPos[i3] = form0Hero[i3];
      currentPos[i3 + 1] = form0Hero[i3 + 1];
      currentPos[i3 + 2] = form0Hero[i3 + 2];
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(currentPos, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.38 : 0.62,
      vertexColors: true,
      map: pointTexture || undefined,
      transparent: true,
      opacity: isMobile ? 0.65 : 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 5. Thin Glowing Geometric Neural Lines
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isMobile ? 0.12 : 0.25,
      blending: THREE.AdditiveBlending,
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineSegments);

    // Scroll Progress Tracking across Hero & Services
    const scrollObj = { progress: 0 };

    const ctx = gsap.context(() => {
      gsap.to(scrollObj, {
        progress: 5,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });
    });

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting && !document.hidden;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();
      const p = scrollObj.progress;

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      const stage = Math.min(4, Math.floor(p));
      const sub = p - stage;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        let fromX = form0Hero[i3];
        let fromY = form0Hero[i3 + 1];
        let fromZ = form0Hero[i3 + 2];

        let toX = form1Chatbot[i3];
        let toY = form1Chatbot[i3 + 1];
        let toZ = form1Chatbot[i3 + 2];

        if (stage === 1) {
          fromX = form1Chatbot[i3];
          fromY = form1Chatbot[i3 + 1];
          fromZ = form1Chatbot[i3 + 2];
          toX = form2Agent[i3];
          toY = form2Agent[i3 + 1];
          toZ = form2Agent[i3 + 2];
        } else if (stage === 2) {
          fromX = form2Agent[i3];
          fromY = form2Agent[i3 + 1];
          fromZ = form2Agent[i3 + 2];
          toX = form3Automation[i3];
          toY = form3Automation[i3 + 1];
          toZ = form3Automation[i3 + 2];
        } else if (stage === 3) {
          fromX = form3Automation[i3];
          fromY = form3Automation[i3 + 1];
          fromZ = form3Automation[i3 + 2];
          toX = form4Website[i3];
          toY = form4Website[i3 + 1];
          toZ = form4Website[i3 + 2];
        } else if (stage >= 4) {
          fromX = form4Website[i3];
          fromY = form4Website[i3 + 1];
          fromZ = form4Website[i3 + 2];
          toX = form5Voice[i3];
          toY = form5Voice[i3 + 1];
          toZ = form5Voice[i3 + 2];
        }

        const flowX = Math.sin(elapsed * speeds[i] + i * 0.1) * 0.4 + Math.cos(elapsed * 0.4 + i3) * 0.2;
        const flowY = Math.cos(elapsed * speeds[i] + i * 0.1) * 0.4 + Math.sin(elapsed * 0.4 + i3) * 0.2;
        const flowZ = Math.sin(elapsed * 0.3 + i) * 0.3;

        posArr[i3] = THREE.MathUtils.lerp(fromX, toX, sub) + flowX;
        posArr[i3 + 1] = THREE.MathUtils.lerp(fromY, toY, sub) + flowY;
        posArr[i3 + 2] = THREE.MathUtils.lerp(fromZ, toZ, sub) + flowZ;
      }
      posAttr.needsUpdate = true;

      // Update Lines connecting neural nodes
      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const linePosArr = linePosAttr.array as Float32Array;
      const lineColAttr = lineGeometry.attributes.color as THREE.BufferAttribute;
      const lineColArr = lineColAttr.array as Float32Array;

      let lineVertexIdx = 0;
      const connectMaxDist = isMobile ? 7.5 : 9.5;

      for (let i = 0; i < count && lineVertexIdx < maxLines * 6; i += 2) {
        const i3 = i * 3;
        const x1 = posArr[i3];
        const y1 = posArr[i3 + 1];
        const z1 = posArr[i3 + 2];

        if (x1 < -40 || x1 > 40) continue;

        const checkLimit = Math.min(count, i + 14);
        for (let j = i + 1; j < checkLimit && lineVertexIdx < maxLines * 6; j++) {
          const j3 = j * 3;
          const x2 = posArr[j3];
          const y2 = posArr[j3 + 1];
          const z2 = posArr[j3 + 2];

          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < connectMaxDist * connectMaxDist) {
            linePosArr[lineVertexIdx] = x1;
            linePosArr[lineVertexIdx + 1] = y1;
            linePosArr[lineVertexIdx + 2] = z1;
            linePosArr[lineVertexIdx + 3] = x2;
            linePosArr[lineVertexIdx + 4] = y2;
            linePosArr[lineVertexIdx + 5] = z2;

            lineColArr[lineVertexIdx] = colors[i3];
            lineColArr[lineVertexIdx + 1] = colors[i3 + 1];
            lineColArr[lineVertexIdx + 2] = colors[i3 + 2];
            lineColArr[lineVertexIdx + 3] = colors[j3];
            lineColArr[lineVertexIdx + 4] = colors[j3 + 1];
            lineColArr[lineVertexIdx + 5] = colors[j3 + 2];

            lineVertexIdx += 6;
          }
        }
      }
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineVertexIdx / 3);

      particleSystem.rotation.y = elapsed * 0.03;
      lineSegments.rotation.y = elapsed * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      ctx.revert();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      pointTexture?.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 bg-[#030712] overflow-hidden"
    />
  );
}
