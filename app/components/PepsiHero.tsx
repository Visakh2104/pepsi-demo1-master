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

    // Luxurious smooth damping: 0.06 creates a silky, momentum-based glide on mouse scroll
    const DAMPING = 0.06;

    const applySeek = (time: number) => {
      if (!video.duration || !Number.isFinite(video.duration)) return;

      const safeMax = Math.max(0, video.duration - 0.05);
      const clamped = Math.min(Math.max(time, 0), safeMax);

      isSeekingRef.current = true;
      video.currentTime = clamped;

      // Fail-safe timeout in case browser does not fire 'seeked' event
      clearTimeout(seekTimeoutRef.current);
      seekTimeoutRef.current = setTimeout(() => {
        isSeekingRef.current = false;
      }, 80);
    };

    const calculateTarget = () => {
      const rect = section.getBoundingClientRect();
      const scrollDistance = section.offsetHeight - window.innerHeight;

      if (scrollDistance <= 0 || !video.duration) return;

      const scrolled = Math.min(Math.max(-rect.top, 0), scrollDistance);
      const progress = scrolled / scrollDistance;

      const maxSafeDuration = Math.max(0, video.duration - 0.05);
      targetTimeRef.current = Math.min(Math.max(progress * video.duration, 0), maxSafeDuration);
    };

    const render = (now: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = now;
      }

      const deltaMs = now - lastTimeRef.current;
      lastTimeRef.current = now;

      // Frame-rate independent exponential smoothing
      const dt = Math.min(deltaMs / (1000 / 60), 3);
      const factor = 1 - Math.pow(1 - DAMPING, Math.max(dt, 0.1));

      const target = targetTimeRef.current;
      currentTimeRef.current += (target - currentTimeRef.current) * factor;

      if (Math.abs(target - currentTimeRef.current) < 0.001) {
        currentTimeRef.current = target;
      }

      // Synchronize video currentTime without overloading decoder pipeline
      if (video.duration && !isSeekingRef.current) {
        if (Math.abs(video.currentTime - currentTimeRef.current) > 0.008) {
          applySeek(currentTimeRef.current);
        }
      }

      // Smoothly fade out scroll prompt once scrolling begins
      if (indicator && video.duration) {
        const progress = currentTimeRef.current / video.duration;
        const opacity = Math.max(0, 1 - progress * 5);
        indicator.style.opacity = opacity.toFixed(3);
        indicator.style.pointerEvents = opacity <= 0.01 ? "none" : "auto";
      }

      const isStillEasing = Math.abs(target - currentTimeRef.current) >= 0.001;
      const isStillSeeking = isSeekingRef.current;
      const needsSync = Math.abs(video.currentTime - currentTimeRef.current) > 0.008;

      if (isStillEasing || isStillSeeking || needsSync) {
        rafIdRef.current = requestAnimationFrame(render);
      } else {
        isLoopRunningRef.current = false;
        lastTimeRef.current = 0;
      }
    };

    const startLoop = () => {
      if (!isLoopRunningRef.current) {
        isLoopRunningRef.current = true;
        lastTimeRef.current = 0;
        rafIdRef.current = requestAnimationFrame(render);
      }
    };

    const onScroll = () => {
      calculateTarget();
      startLoop();
    };

    const onResize = () => {
      calculateTarget();
      startLoop();
    };

    const onSeeked = () => {
      isSeekingRef.current = false;
      clearTimeout(seekTimeoutRef.current);

      if (!video.duration) return;

      // If playhead moved ahead while seeking was in flight, immediately initiate next seek
      if (Math.abs(video.currentTime - currentTimeRef.current) > 0.008) {
        applySeek(currentTimeRef.current);
      }
      startLoop();
    };

    const onVideoReady = () => {
      if (!video.duration || !Number.isFinite(video.duration)) return;

      video.pause();
      calculateTarget();

      currentTimeRef.current = targetTimeRef.current;
      applySeek(targetTimeRef.current);

      startLoop();
    };

    if (video.readyState >= 1) {
      onVideoReady();
    }

    video.addEventListener("loadedmetadata", onVideoReady);
    video.addEventListener("loadeddata", onVideoReady);
    video.addEventListener("canplay", onVideoReady);
    video.addEventListener("seeked", onSeeked);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      clearTimeout(seekTimeoutRef.current);

      video.removeEventListener("loadedmetadata", onVideoReady);
      video.removeEventListener("loadeddata", onVideoReady);
      video.removeEventListener("canplay", onVideoReady);
      video.removeEventListener("seeked", onSeeked);

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="pepsi-scroll-section">
      <div className="pepsi-sticky-hero">
        <video
          ref={videoRef}
          className="pepsi-hero-video"
          src="/videos/pepsi-banner-1.mp4"
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
