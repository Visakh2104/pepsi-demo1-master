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

  let targetTime = 0;
  let currentTime = 0;

  let rafId = 0;
  let lastFrame = 0;
  let lastSeek = 0;

  let seeking = false;
  let running = false;

  const SMOOTHING = 10;
  const SEEK_INTERVAL = 40;
  const SEEK_THRESHOLD = 0.02;

  const calculateTarget = () => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;

    const rect = section.getBoundingClientRect();
    const distance = section.offsetHeight - window.innerHeight;

    if (distance <= 0) return;

    const progress = Math.max(
      0,
      Math.min(1, -rect.top / distance)
    );

    targetTime = progress * Math.max(0, video.duration - 0.05);
  };

  const seekToLatestPosition = (now: number) => {
    if (seeking || video.seeking) return;

    if (now - lastSeek < SEEK_INTERVAL) return;

    const difference = Math.abs(video.currentTime - currentTime);

    if (difference < SEEK_THRESHOLD) return;

    seeking = true;
    lastSeek = now;

    video.currentTime = Math.max(
      0,
      Math.min(currentTime, video.duration - 0.05)
    );
  };

  const render = (now: number) => {
    if (!lastFrame) lastFrame = now;

    const delta = Math.min((now - lastFrame) / 1000, 0.05);
    lastFrame = now;

    // Smooth interpolation
    const factor = 1 - Math.exp(-SMOOTHING * delta);

    currentTime += (targetTime - currentTime) * factor;

    if (Math.abs(targetTime - currentTime) < 0.005) {
      currentTime = targetTime;
    }

    seekToLatestPosition(now);

    if (indicator && video.duration) {
      const progress = currentTime / video.duration;

      indicator.style.opacity = String(
        Math.max(0, 1 - progress * 5)
      );
    }

    const needsAnimation =
      Math.abs(targetTime - currentTime) > 0.005 ||
      Math.abs(video.currentTime - currentTime) > SEEK_THRESHOLD ||
      seeking;

    if (needsAnimation) {
      rafId = requestAnimationFrame(render);
    } else {
      running = false;
      lastFrame = 0;
    }
  };

  const startLoop = () => {
    if (running) return;

    running = true;
    lastFrame = 0;

    rafId = requestAnimationFrame(render);
  };

  const onSeeked = () => {
    seeking = false;

    // Process the latest scroll position
    startLoop();
  };

  const onScroll = () => {
    calculateTarget();
    startLoop();
  };

  const onReady = () => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;

    video.pause();

    calculateTarget();

    currentTime = targetTime;

    seeking = false;

    startLoop();
  };

  video.addEventListener("loadedmetadata", onReady);
  video.addEventListener("seeked", onSeeked);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  if (video.readyState >= 1) {
    onReady();
  }

  return () => {
    cancelAnimationFrame(rafId);

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
          disablePictureInPicture
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
