"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function PepsiHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const seekTimeoutRef = useRef<NodeJS.Timeout | number>(0);
  const isLoopRunningRef = useRef(false);
  const rafIdRef = useRef(0);
  const lastTimeRef = useRef(0);

  
useEffect(() => {
  const section = sectionRef.current;
  const video = videoRef.current;
  const indicator = indicatorRef.current;

  if (!section || !video) return;

  // Smoothness settings
  const DAMPING = 0.045;
  const SEEK_THRESHOLD = 0.025;
  const SEEK_INTERVAL = 50;

  let targetTime = 0;
  let currentTime = 0;
  let isSeeking = false;
  let rafId = 0;
  let lastFrameTime = 0;
  let lastSeekTime = 0;
  let loopRunning = false;

  let seekTimeout: ReturnType<typeof setTimeout>;

  const calculateTarget = () => {
    if (!video.duration || !Number.isFinite(video.duration)) return;

    const rect = section.getBoundingClientRect();
    const scrollDistance = section.offsetHeight - window.innerHeight;

    if (scrollDistance <= 0) return;

    const scrolled = Math.min(
      Math.max(-rect.top, 0),
      scrollDistance
    );

    const progress = scrolled / scrollDistance;

    targetTime = Math.min(
      progress * video.duration,
      video.duration - 0.05
    );
  };

  const applySeek = (time: number) => {
    if (!video.duration || isSeeking) return;

    const safeTime = Math.max(
      0,
      Math.min(time, video.duration - 0.05)
    );

    isSeeking = true;
    lastSeekTime = performance.now();

    video.currentTime = safeTime;

    clearTimeout(seekTimeout);

    seekTimeout = setTimeout(() => {
      isSeeking = false;
      startLoop();
    }, 150);
  };

  const render = (now: number) => {
    if (!lastFrameTime) lastFrameTime = now;

    const delta = Math.min(
      (now - lastFrameTime) / 16.67,
      3
    );

    lastFrameTime = now;

    // Frame-rate independent smooth interpolation
    const factor = 1 - Math.pow(1 - DAMPING, delta);

    currentTime += (targetTime - currentTime) * factor;

    if (Math.abs(targetTime - currentTime) < 0.001) {
      currentTime = targetTime;
    }

    // Throttled video seeking
    const timeSinceLastSeek = now - lastSeekTime;

    if (
      !isSeeking &&
      timeSinceLastSeek >= SEEK_INTERVAL &&
      Math.abs(video.currentTime - currentTime) > SEEK_THRESHOLD
    ) {
      applySeek(currentTime);
    }

    // Scroll indicator
    if (indicator && video.duration) {
      const progress = currentTime / video.duration;
      const opacity = Math.max(0, 1 - progress * 5);

      indicator.style.opacity = opacity.toString();
      indicator.style.pointerEvents =
        opacity <= 0.01 ? "none" : "auto";
    }

    const isEasing =
      Math.abs(targetTime - currentTime) > 0.001;

    const needsSync =
      Math.abs(video.currentTime - currentTime) > SEEK_THRESHOLD;

    if (isEasing || isSeeking || needsSync) {
      rafId = requestAnimationFrame(render);
    } else {
      loopRunning = false;
      lastFrameTime = 0;
    }
  };

  const startLoop = () => {
    if (!loopRunning) {
      loopRunning = true;
      lastFrameTime = 0;
      rafId = requestAnimationFrame(render);
    }
  };

  const onScroll = () => {
    calculateTarget();
    startLoop();
  };

  const onReady = () => {
    if (!video.duration || !Number.isFinite(video.duration)) return;

    video.pause();
    calculateTarget();

    currentTime = targetTime;
    applySeek(currentTime);
    startLoop();
  };

  const onSeeked = () => {
    isSeeking = false;
    clearTimeout(seekTimeout);
    startLoop();
  };

  if (video.readyState >= 1) {
    onReady();
  }

  video.addEventListener("loadedmetadata", onReady);
  video.addEventListener("seeked", onSeeked);

  window.addEventListener("scroll", onScroll, {
    passive: true,
  });

  window.addEventListener("resize", onScroll);

  return () => {
    cancelAnimationFrame(rafId);
    clearTimeout(seekTimeout);

    video.removeEventListener("loadedmetadata", onReady);
    video.removeEventListener("seeked", onSeeked);

    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}, []);


  return (
    <section ref={sectionRef} className="pepsi-scroll-section">
      <div className="pepsi-sticky-hero">
        <video
          ref={videoRef}
          className="pepsi-hero-video"
          src="/videos/pepsi-banner-new.mp4"
          muted
          playsInline
          preload="auto"
          aria-label="Pepsi product pouring animation"
        />

        <div className="hero-content-outer">

          <div className="pepsi-hero-content">
            <h1>That's <span>what </span><span>i like</span></h1>
            <p>Big taste. Real refreshment. 3g prebiotic fiber and no artificial sweeteners.</p>
            <Link href="" className="banner-btn">Shop now</Link>
          </div>

        </div>

        <div className="scroll-indicator" ref={indicatorRef}>
            <span>SCROLL TO EXPLORE</span>
            <span className="scroll-arrow">↓</span>
          </div>

      </div>
    </section>
  );
}
