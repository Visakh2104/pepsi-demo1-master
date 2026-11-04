
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HomeCont1() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const flow = section.querySelector(".home-cont1__flow");
      const paragraphs = gsap.utils.toArray<HTMLElement>(
        ".home-cont1 .container p"
      );

      // Reveal paragraphs and float the gradient as you scroll.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 0.8,
        },
      });

      timeline
        .fromTo(
          flow,
          {
            xPercent: -5,
            yPercent: 2,
            scale: 1,
          },
          {
            xPercent: 5,
            yPercent: -2,
            scale: 1.12,
            ease: "none",
          },
          0
        )
        .fromTo(
          paragraphs,
          {
            y: 28,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: "power2.out",
          },
          0.15
        );
    },
    { scope: sectionRef }
  );

  return (
    <section className="home-cont1" ref={sectionRef}>
      <div
        className="home-cont1__flow"
        aria-hidden="true"
      />

      <div className="container">
        <p>
          Pepsi Home Delivery Urbana-Champaign provides free
          home delivery of beverages such as Mountain Dew,
          Gatorade, Bubly, Starbucks, Dole Juices, Pure Leaf
          teas and more to Champaign, Urbana, Savoy, and
          Rantoul IL!
        </p>

        <p>
          We also offer free warehouse pick up of all the
          products on this website at our Champaign warehouse
          on Anthony Drive North of Interstate 74
        </p>
      </div>
    </section>
  );
}
