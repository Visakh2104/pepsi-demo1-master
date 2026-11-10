
"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

import { productsData } from "../../data/products";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProductSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section) return;

            const cards = gsap.utils.toArray<HTMLElement>(
                ".product-col1",
                section
            );

            cards.forEach((card, index) => {
                const image =
                    card.querySelector<HTMLImageElement>(".product-img img");
                const title =
                    card.querySelector<HTMLElement>(".product-cont");

                if (!image || !title) return;

                // Initial hidden state
                gsap.set(image, {
                    y: 180,
                    z: -180,
                    rotationX: 12,
                    rotationY: index % 2 === 0 ? -18 : 18,
                    rotationZ: index % 2 === 0 ? -6 : 6,
                    scale: 0.7,
                    opacity: 0,
                    transformOrigin: "center center",
                });

                gsap.set(title, {
                    y: 20,
                    opacity: 0,
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 88%",
                        end: "top 35%",
                        scrub: 0.8,
                    },
                });

                


                tl.to(image, {
                    y: 0,
                    z: 0,
                    rotationX: 0,
                    rotationY: index % 2 === 0 ? 0 : -8,
                    rotationZ: 0,
                    scale: 1,
                    opacity: 1,
                    ease: "power2.out",
                    duration: 1,
                });


                tl.to(
                    title,
                    {
                        y: 0,
                        opacity: 1,
                        ease: "power1.out",
                        duration: 0.3,
                    },
                    0.65
                );
            });
        },
        { scope: sectionRef }
    );

    return (
        <div ref={sectionRef} className="product-section">
            <div className="product-grid">
                {productsData.map((product) => (
                    <div className="product-col1" key={product.id}>
                        <div className="product-img">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={400}
                                height={400}
                                sizes="(max-width: 768px) 80vw, 25vw"
                                style={{ objectFit: "contain" }}
                            />
                        </div>

                        <div className="product-cont">
                            <h4>{product.name}</h4>
                            <p>{product.desc}</p>
                            <Link href="/products" className="prdt-btn">FIND OUT MORE</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
