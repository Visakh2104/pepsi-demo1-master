
"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HomePageResponse {
  "wck-meta"?: {
    home_about_content?: string[];
    home_about_backgroundimg?: string[];
  };
}

export function HomeCont2() {
  const sectionRef = useRef<HTMLElement>(null);
  const [aboutContent, setAboutContent] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_HOME_PAGE_API_URL!);
        if (!response.ok) {
          throw new Error("Failed to fetch home about content");
        }
        const data: HomePageResponse = await response.json();
        setAboutContent(data["wck-meta"]?.home_about_content?.[0] || "");
        setBackgroundImage(data["wck-meta"]?.home_about_backgroundimg?.[0] || "");
      }
      catch (error) {
        console.error("Error fetching home about content:", error);
      }
    };
    fetchAboutContent();
  }, []);

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
          end: "bottom bottom",
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
    {
      scope: sectionRef,
      dependencies: [aboutContent],
      revertOnUpdate: true,
    }
  );

  return (
    <section className="home-cont-wrapp" ref={sectionRef} style={{ "--about-bg-image": backgroundImage ? `url( "${backgroundImage}")` : "none", } as React.CSSProperties}>
      <div
        className="home-cont-wrapp__bg"
        aria-hidden="true"
      />

      <div className="container">
        <h2>About</h2>
        <div dangerouslySetInnerHTML={{ __html: aboutContent }} />
      </div>
    </section>
  );
}
