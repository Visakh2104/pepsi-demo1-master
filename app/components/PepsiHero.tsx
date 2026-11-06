
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

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // CHANGE THIS to your actual number of frames
    const FRAME_COUNT = 590;

    const images: HTMLImageElement[] = [];

    let targetFrame = 0;
    let currentFrame = 0;
    let rafId = 0;
    let isRunning = false;

    const DAMPING = 0.08;

    // Thresholds: hidden at first, then animate in at end of smooth scroll canvas
    const HERO_SHOW_START = 0.78;
    const HERO_SHOW_END = 0.92;

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

    // Canvas sizing
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = "100%";
      canvas.style.height = "100%";

      drawFrame(Math.round(currentFrame));
    };

    // Draw image with cover behavior
    const drawFrame = (frameIndex: number) => {
      const image = images[frameIndex];

      if (!image || !image.complete || !image.naturalWidth) return;

      const width = canvas.width;
      const height = canvas.height;

      const imageRatio = image.naturalWidth / image.naturalHeight;
      const canvasRatio = width / height;

      let drawWidth;
      let drawHeight;

      if (imageRatio > canvasRatio) {
        drawHeight = height;
        drawWidth = height * imageRatio;
      } else {
        drawWidth = width;
        drawHeight = width / imageRatio;
      }

      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      ctx.clearRect(0, 0, width, height);

      ctx.drawImage(
        image,
        x,
        y,
        drawWidth,
        drawHeight
      );
    };

    // Preload image sequence
    const preloadFrames = () => {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();

        img.src = `/frames/frame_${String(i).padStart(4, "0")}.jpg`;

        img.onload = () => {
          if (i === 1) {
            drawFrame(0);
          }
        };

        images.push(img);
      }
    };

    // Calculate scroll progress
    const calculateTarget = () => {
      const rect = section.getBoundingClientRect();

      const scrollDistance =
        section.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0) return;

      const scrolled = Math.min(
        Math.max(-rect.top, 0),
        scrollDistance
      );

      const progress = scrolled / scrollDistance;

      targetFrame = progress * (FRAME_COUNT - 1);

      if (indicator) {
        const opacity = Math.max(0, 1 - progress * 5);

        indicator.style.opacity = opacity.toString();

        indicator.style.pointerEvents =
          opacity <= 0.01 ? "none" : "auto";
      }

      startAnimation();
    };

    // Smooth frame interpolation
    const animate = () => {
      currentFrame +=
        (targetFrame - currentFrame) * DAMPING;

      if (Math.abs(targetFrame - currentFrame) < 0.01) {
        currentFrame = targetFrame;
      }

      const frameIndex = Math.round(currentFrame);

      drawFrame(frameIndex);
      updateHeroContent(currentFrame);

      if (Math.abs(targetFrame - currentFrame) > 0.01) {
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
    preloadFrames();
    resizeCanvas();
    calculateTarget();
    currentFrame = targetFrame;
    updateHeroContent(currentFrame);

    const onResize = () => {
      resizeCanvas();
      calculateTarget();
    };

    window.addEventListener("scroll", calculateTarget, {
      passive: true,
    });

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", calculateTarget);
      window.removeEventListener("resize", onResize);

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
