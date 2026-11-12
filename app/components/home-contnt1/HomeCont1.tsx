
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import './homeCont1.css'

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
          start: "top 75%", // Animation starts earlier
          end: "bottom 40%",
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
          -0.3
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

      <div className="homecont-video">
          <iframe
            src="https://www.youtube.com/embed/UZZ5s_qhHMA?autoplay=1&mute=1&loop=1&playlist=UZZ5s_qhHMA&controls=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1"
            title="Background Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
      </div>

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
