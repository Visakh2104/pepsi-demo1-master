"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Safety net: never keep visitors stuck on the loader if an asset hangs.
const MAX_WAIT_MS = 10000;

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const loader = loaderRef.current;
      if (!loader) return;

      const logo = loader.querySelector(".pepsi-loader__logo");
      const html = document.documentElement;
      const body = document.body;

      // Lock page scroll while the loader is visible
      const prevHtmlOverflow = html.style.overflow;
      const prevBodyOverflow = body.style.overflow;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      const unlockScroll = () => {
        html.style.overflow = prevHtmlOverflow;
        body.style.overflow = prevBodyOverflow;
      };

      let cancelled = false;

      // 1) Logo intro animation (+ short hold so it never flashes)
      const introDone = new Promise<void>((resolve) => {
        gsap
          .timeline({ delay: 0.2, onComplete: resolve })
          .fromTo(
            logo,
            { opacity: 0, scale: 0.65, rotate: -15 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.7)" }
          )
          .to({}, { duration: 0.6 });
      });

      // 2) Page fully loaded: all images, CSS, scripts and fonts
      const pageLoaded = new Promise<void>((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", () => resolve(), { once: true });
      }).then(() => document.fonts?.ready);

      const timeout = new Promise<void>((resolve) => setTimeout(resolve, MAX_WAIT_MS));

      // 3) Hide only when BOTH the intro and the real page load are finished
      Promise.all([introDone, Promise.race([pageLoaded, timeout])]).then(() => {
        if (cancelled) return;
        gsap.to(loader, {
          opacity: 0,
          duration: 0.7,
          ease: "power2.inOut",
          onComplete: () => {
            loader.style.display = "none";
            unlockScroll();
          },
        });
      });

      return () => {
        cancelled = true;
        unlockScroll();
      };
    },
    { scope: loaderRef }
  );

  return (
    <div className="pepsi-loader" ref={loaderRef}>
      <div className="pepsi-loader__liquid pepsi-loader__liquid--red" />
      <div className="pepsi-loader__liquid pepsi-loader__liquid--blue" />
      <div className="pepsi-loader__liquid pepsi-loader__liquid--purple" />

      <div className="pepsi-loader__center">
        <Image
          className="pepsi-loader__logo"
          src="/images/pepsi-logo.svg"
          alt="Pepsi"
          width={110}
          height={110}
          priority
        />
      </div>
    </div>
  );
}
