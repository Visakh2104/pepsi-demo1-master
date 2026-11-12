"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function PepsiHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const indicator = indicatorRef.current;
    const heroContent = heroContentRef.current;

    if (!section || !video) return;

    // Scroll-to-video smoothing. Increase slightly for more responsiveness;
    // decrease for a softer glide (too low can make the video feel delayed).
    const DAMPING = 0.16;
    // The full 19-second source video is used; duration is read from video metadata.
    const HERO_SHOW_START = 0.78;
    const HERO_SHOW_END = 0.92;

    let sectionTop = 0;
    let scrollDistance = 0;
    let targetTime = 0;
    let currentTime = 0;
    let rafId = 0;
    let isRunning = false;
    let lastFrameTime = 0;
    let isDisposed = false;

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max);

    const updateGeometry = () => {
      const rect = section.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;
      scrollDistance = Math.max(0, section.offsetHeight - window.innerHeight);
    };

    const updateHeroContent = (progress: number) => {
      if (!heroContent) return;

      const rawRatio = clamp(
        (progress - HERO_SHOW_START) / (HERO_SHOW_END - HERO_SHOW_START),
        0,
        1
      );
      const ease = 1 - Math.pow(1 - rawRatio, 3);
      const yOffset = (1 - ease) * 36;

      heroContent.style.opacity = ease.toFixed(3);
      heroContent.style.transform = `translateY(calc(-50% + ${yOffset.toFixed(1)}px))`;
      heroContent.style.pointerEvents = ease >= 0.85 ? "auto" : "none";
      heroContent.style.visibility = ease <= 0.001 ? "hidden" : "visible";
    };

    const updateScrollTarget = () => {
      if (scrollDistance <= 0) {
        targetTime = 0;
        return;
      }

      const scrollY = window.scrollY || window.pageYOffset;
      const scrolled = clamp(scrollY - sectionTop, 0, scrollDistance);
      const progress = scrolled / scrollDistance;
      const duration = Number.isFinite(video.duration) ? video.duration : 0;

      if (duration > 0) {
        // Stay just before the final frame to avoid the ended state.
        targetTime = clamp(progress * duration, 0, Math.max(0, duration - 0.04));
      }

      if (indicator) {
        const opacity = Math.max(0, 1 - progress * 5);
        indicator.style.opacity = opacity.toFixed(3);
        indicator.style.pointerEvents = opacity <= 0.01 ? "none" : "auto";
      }

      updateHeroContent(progress);
      startAnimation();
    };

    const animate = (now: number) => {
      if (isDisposed) return;

      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      if (!duration || video.readyState < HTMLMediaElement.HAVE_METADATA) {
        isRunning = false;
        return;
      }

      // Frame-rate-independent easing, so the feel is consistent across displays.
      const deltaFrames = lastFrameTime ? Math.min((now - lastFrameTime) / (1000 / 60), 3) : 1;
      lastFrameTime = now;
      const factor = 1 - Math.pow(1 - DAMPING, Math.max(deltaFrames, 0.1));
      currentTime += (targetTime - currentTime) * factor;

      if (Math.abs(targetTime - currentTime) < 0.015) {
        currentTime = targetTime;
      }

      // Avoid a busy animation loop while the browser decodes a seek.
      // The seeked event resumes animation with the latest target.
      if (video.seeking) {
        isRunning = false;
        lastFrameTime = 0;
        return;
      }

      if (Math.abs(video.currentTime - currentTime) > 0.035) {
        try {
          video.currentTime = currentTime;
        } catch {
          // Ignore transient seek errors while metadata/data is being prepared.
        }
      }

      const stillEasing = Math.abs(targetTime - currentTime) >= 0.015;

      if (video.seeking) {
        isRunning = false;
      } else if (stillEasing) {
        rafId = requestAnimationFrame(animate);
      } else {
        isRunning = false;
        lastFrameTime = 0;
      }
    };

    function startAnimation() {
      if (isRunning || isDisposed) return;
      isRunning = true;
      lastFrameTime = 0;
      rafId = requestAnimationFrame(animate);
    }

    const onMetadataLoaded = () => {
      video.pause();
      updateGeometry();
      updateScrollTarget();
      currentTime = targetTime;
      if (!video.seeking && Math.abs(video.currentTime - currentTime) > 0.02) {
        video.currentTime = currentTime;
      }
      startAnimation();
    };

    const onSeeked = () => {
      if (isDisposed) return;
      // A new scroll target may have arrived while the previous seek was decoding.
      if (
        Math.abs(video.currentTime - targetTime) > 0.05 ||
        Math.abs(currentTime - targetTime) > 0.015
      ) {
        startAnimation();
      }
    };

    const onResize = () => {
      updateGeometry();
      updateScrollTarget();
    };

    const onScroll = () => updateScrollTarget();

    updateGeometry();

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      onMetadataLoaded();
    }

    video.addEventListener("loadedmetadata", onMetadataLoaded);
    video.addEventListener("seeked", onSeeked);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Support an existing Lenis smooth-scroll instance, if the project uses it.
    const lenis = (window as Window & { __lenis?: any }).__lenis;
    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", onScroll);
    }

    return () => {
      isDisposed = true;
      cancelAnimationFrame(rafId);
      video.removeEventListener("loadedmetadata", onMetadataLoaded);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (lenis && typeof lenis.off === "function") {
        lenis.off("scroll", onScroll);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="pepsi-scroll-section">
      <div className="pepsi-sticky-hero">
        <video
          ref={videoRef}
          className="pepsi-hero-video"
          src="/videos/pepsi-video.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-label="Pepsi product scroll animation"
        />

        <div ref={heroContentRef} className="hero-content-outer">
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

        <div className="scroll-indicator" ref={indicatorRef}>
          <span>SCROLL TO EXPLORE</span>
          <span className="scroll-arrow">↓</span>
        </div>
      </div>
    </section>
  );
}
