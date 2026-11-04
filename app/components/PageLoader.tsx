
"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const loader = loaderRef.current;
      if (!loader) return;

      const logo = loader.querySelector(".pepsi-loader__logo");

      const tl = gsap.timeline({
        delay: 0.2,
        onComplete: () => {
          loader.style.display = "none";
        },
      });

      tl.fromTo(
        logo,
        { opacity: 0, scale: 0.65, rotate: -15 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.9,
          ease: "back.out(1.7)",
        }
      )
        .to({}, { duration: 1.1 })
        .to(loader, {
          opacity: 0,
          duration: 0.7,
          ease: "power2.inOut",
        });
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
