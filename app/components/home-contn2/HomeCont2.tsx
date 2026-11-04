
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HomeCont2() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const heading = section.querySelector("h2");
      const paragraphs = section.querySelectorAll("p");
      const background = section.querySelector(
        ".home-cont-wrapp__bg"
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 0.8,
        },
      });

      tl.fromTo(
        heading,
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, ease: "none" },
        0
      )
        .fromTo(
          paragraphs,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.18,
            ease: "none",
          },
          0.15
        )
        .fromTo(
          background,
          { yPercent: -8, scale: 1.08 },
          { yPercent: 8, scale: 1.15, ease: "none" },
          0
        );
    },
    { scope: sectionRef }
  );

  return (
    <section className="home-cont-wrapp" ref={sectionRef}>
      <div
        className="home-cont-wrapp__bg"
        aria-hidden="true"
      />

      <div className="container">
        <h2>About</h2>

        <p>
          Every day is a great day to enjoy Pepsi-Cola
          products delivered free to your home by your
          local Pepsi bottler, Pepsi-Cola Champaign-Urbana
          Bottling Co.!
        </p>

        <p>
          You deserve to have easy access to delicious drinks
          like Pepsi, Mtn Dew, Starry, Starbucks, Aquafina,
          Pure Leaf Tea and our other brands. Through this
          site, we are now offering you delivery of our
          products right to your door in Champaign, Urbana,
          and Savoy, IL, or warehouse pick up at our location
          in Champaign.
        </p>
      </div>
    </section>
  );
}
