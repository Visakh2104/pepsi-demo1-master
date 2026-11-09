
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function PepsiHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const indicator = indicatorRef.current;
    const heroContent = heroContentRef.current;

    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const FRAME_COUNT = 590;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    const requested = new Set<number>();
    let lastRenderedIndex = -1;

    let targetFrame = 0;
    let currentFrame = 0;
    let rafId = 0;
    let isRunning = false;

    // Responsive damping: fast and stable tracking without lag or stutter
    const DAMPING = 0.22;

    // Thresholds for hero text & CTA animation
    const HERO_SHOW_START = 0.78;
    const HERO_SHOW_END = 0.92;

    let sectionTop = 0;
    let scrollDistance = 0;
    let drawParams = { x: 0, y: 0, width: 0, height: 0 };

    const updateGeometry = () => {
      const rect = section.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      sectionTop = rect.top + scrollY;
      scrollDistance = section.offsetHeight - window.innerHeight;
    };

    const updateHeroContent = (frame: number) => {
      if (!heroContent) return;

      const progress = Math.min(Math.max(frame / (FRAME_COUNT - 1), 0), 1);

      let rawRatio = 0;
      if (progress >= HERO_SHOW_END) {
        rawRatio = 1;
      } else if (progress > HERO_SHOW_START) {
        rawRatio = (progress - HERO_SHOW_START) / (HERO_SHOW_END - HERO_SHOW_START);
      }

      // Smooth cubic ease-out entrance animation
      const ease = 1 - Math.pow(1 - rawRatio, 3);
      const opacity = ease;
      const yOffset = (1 - ease) * 36; // Subtle 36px slide up into place

      heroContent.style.opacity = opacity.toFixed(3);
      heroContent.style.transform = `translateY(calc(-50% + ${yOffset.toFixed(1)}px))`;
      heroContent.style.pointerEvents = opacity >= 0.85 ? "auto" : "none";
      heroContent.style.visibility = opacity <= 0.001 ? "hidden" : "visible";
    };

    // Canvas sizing and cover parameters
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      canvas.style.width = "100%";
      canvas.style.height = "100%";

      const imageRatio = 3840 / 2160;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth: number;
      let drawHeight: number;

      if (imageRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imageRatio;
      } else {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imageRatio;
      }

      drawParams = {
        x: (canvas.width - drawWidth) / 2,
        y: (canvas.height - drawHeight) / 2,
        width: drawWidth,
        height: drawHeight,
      };

      drawFrame(Math.round(currentFrame), true);
    };

    // Get closest loaded frame to prevent blank frames or freezes during rapid scroll
    const getLoadedImage = (index: number): HTMLImageElement | null => {
      const exact = images[index];
      if (exact && exact.complete && exact.naturalWidth > 0) return exact;

      for (let offset = 1; offset <= 25; offset++) {
        const prev = images[index - offset];
        if (prev && prev.complete && prev.naturalWidth > 0) return prev;
        const next = images[index + offset];
        if (next && next.complete && next.naturalWidth > 0) return next;
      }

      if (lastRenderedIndex >= 0 && images[lastRenderedIndex]?.complete) {
        return images[lastRenderedIndex];
      }

      return images[0] || null;
    };

    // Draw frame onto canvas
    const drawFrame = (frameIndex: number, force = false) => {
      if (frameIndex === lastRenderedIndex && !force) return;

      const image = getLoadedImage(frameIndex);
      if (!image || !image.complete || !image.naturalWidth) return;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
      ctx.drawImage(
        image,
        drawParams.x,
        drawParams.y,
        drawParams.width,
        drawParams.height
      );

      lastRenderedIndex = frameIndex;
    };

    // Load single frame
    const loadFrame = (index: number): Promise<void> => {
      if (index < 0 || index >= FRAME_COUNT) return Promise.resolve();
      if (requested.has(index)) return Promise.resolve();
      requested.add(index);

      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          images[index] = img;
          if (index === 0 && lastRenderedIndex === -1) {
            drawFrame(0, true);
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = `/frames/frame_${String(index + 1).padStart(4, "0")}.jpg`;
      });
    };

    // Prioritize loading frames ahead of current scroll direction
    const prioritizeAround = (frameIdx: number) => {
      const start = Math.max(0, Math.floor(frameIdx) - 4);
      const end = Math.min(FRAME_COUNT - 1, Math.floor(frameIdx) + 16);
      for (let i = start; i <= end; i++) {
        if (!requested.has(i)) {
          loadFrame(i);
        }
      }
    };

    // Smart progressive frame loader
    let isDisposed = false;
    const preloadFrames = async () => {
      // 1. Initial frame
      await loadFrame(0);
      if (isDisposed) return;

      // 2. Keyframes every 6th frame to cover the entire scroll distance immediately
      const keyframeIndices: number[] = [];
      for (let i = 0; i < FRAME_COUNT; i += 6) {
        if (i !== 0) keyframeIndices.push(i);
      }
      if (!keyframeIndices.includes(FRAME_COUNT - 1)) {
        keyframeIndices.push(FRAME_COUNT - 1);
      }

      const BATCH_SIZE = 6;
      for (let i = 0; i < keyframeIndices.length; i += BATCH_SIZE) {
        if (isDisposed) return;
        const batch = keyframeIndices.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map((idx) => loadFrame(idx)));
      }

      // 3. Dense fill for all remaining intermediate frames
      const remainingIndices: number[] = [];
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (!requested.has(i)) {
          remainingIndices.push(i);
        }
      }

      for (let i = 0; i < remainingIndices.length; i += BATCH_SIZE) {
        if (isDisposed) return;
        const batch = remainingIndices.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map((idx) => loadFrame(idx)));
      }
    };

    // Calculate scroll progress without layout reflows
    const calculateTarget = () => {
      if (scrollDistance <= 0) return;

      const scrollY = window.scrollY || window.pageYOffset;
      const scrolled = Math.min(
        Math.max(scrollY - sectionTop, 0),
        scrollDistance
      );

      const progress = scrolled / scrollDistance;
      targetFrame = progress * (FRAME_COUNT - 1);

      prioritizeAround(targetFrame);

      if (indicator) {
        const opacity = Math.max(0, 1 - progress * 5);
        indicator.style.opacity = opacity.toString();
        indicator.style.pointerEvents = opacity <= 0.01 ? "none" : "auto";
      }

      startAnimation();
    };

    // Smooth and responsive frame interpolation
    const animate = () => {
      const diff = targetFrame - currentFrame;

      if (Math.abs(diff) < 0.05) {
        currentFrame = targetFrame;
      } else {
        currentFrame += diff * DAMPING;
      }

      const frameIndex = Math.round(currentFrame);
      drawFrame(frameIndex);
      updateHeroContent(currentFrame);

      if (Math.abs(targetFrame - currentFrame) >= 0.05) {
        rafId = requestAnimationFrame(animate);
      } else {
        isRunning = false;
      }
    };

    const startAnimation = () => {
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    // Initial setup
    updateGeometry();
    resizeCanvas();
    preloadFrames();
    calculateTarget();
    currentFrame = targetFrame;
    drawFrame(Math.round(currentFrame), true);
    updateHeroContent(currentFrame);

    const onResize = () => {
      updateGeometry();
      resizeCanvas();
      calculateTarget();
    };

    const handleScroll = () => {
      calculateTarget();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const lenis = (window as any).__lenis;
    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", handleScroll);
    }

    return () => {
      isDisposed = true;
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
      if (lenis && typeof lenis.off === "function") {
        lenis.off("scroll", handleScroll);
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pepsi-scroll-section"
    >
      <div className="pepsi-sticky-hero">
        <canvas
          ref={canvasRef}
          className="pepsi-hero-canvas"
          aria-label="Pepsi product animation"
          role="img"
        />

        <div
          ref={heroContentRef}
          className="hero-content-outer"
        >
          <div className="pepsi-hero-content">
            <h1>
              That's <span>what </span>
              <span>i like</span>
            </h1>

            <p>
              Big taste. Real refreshment. 3g prebiotic
              fiber and no artificial sweeteners.
            </p>

            <Link href="#" className="banner-btn">
              Shop now
            </Link>
          </div>
        </div>

        <div
          className="scroll-indicator"
          ref={indicatorRef}
        >
          <span>SCROLL TO EXPLORE</span>
          <span className="scroll-arrow">↓</span>
        </div>
      </div>
    </section>
  );
}
