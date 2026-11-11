
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./footer.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Footer() {
    const footerRef = useRef<HTMLElement | null>(null);

    
useGSAP(
    () => {
        const footer = footerRef.current;
        if (!footer) return;

        const logo = footer.querySelector(".foot-logo");

        const columns = gsap.utils.toArray<HTMLElement>(
            ".nav-item-col1",
            footer
        );

        // Initial states
        gsap.set(logo, {
            y: 50,
            scale: 0.9,
            opacity: 0,
        });

        gsap.set(columns, {
            y: 50,
            opacity: 0,
        });

        // Footer main animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footer,
                start: "top 90%",
                toggleActions: "play none none none",
                once: true,
            },
        });

        tl.to(logo, {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
        });

        tl.to(
            columns,
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            },
            "-=0.4"
        );

        // Navigation links animation
        columns.forEach((column) => {
            const links = column.querySelectorAll("li");

            gsap.set(links, {
                y: 15,
                opacity: 0,
            });

            gsap.to(links, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: footer,
                    start: "top 90%",
                    toggleActions: "play none none none",
                    once: true,
                },
            });
        });
    },
    { scope: footerRef }
);


    return (
        <footer
            ref={footerRef}
            style={{
                width: "100%",
                background: "#000",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                padding: "80px 0 120px",
            }}
        >
            <div className="container">
                <div className="foot-logo">
                    <Link href="/">
                        <Image
                            src="/images/icons/header-logo.svg"
                            alt="Pepsi Logo"
                            width={114}
                            height={114}
                            sizes="(max-width: 768px) 80vw, 25vw"
                            style={{ objectFit: "contain" }}
                        />
                    </Link>
                </div>

                <div className="nav-items">
                    <div className="nav-item-col1">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/products">Products</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                            <li><Link href="/about">About us</Link></li>
                        </ul>
                    </div>

                    <div className="nav-item-col1">
                        <h4>Policy</h4>
                        <ul>
                            <li><a href="">Privacy</a></li>
                            <li><a href="">Terms of use</a></li>
                            <li><a href="">Refund and returns policy</a></li>
                        </ul>
                    </div>

                    <div className="nav-item-col1">
                        <h4>Social</h4>
                        <ul>
                            <li>
                                <Link href="">
                                    <Image src="/images/icons/search-icon.svg" alt="Search" width={19} height={19} />
                                </Link>
                            </li>
                            <li>
                                <Link href="">
                                    <Image src="/images/icons/cart-icon.svg" alt="Cart" width={19} height={19} />
                                </Link>
                            </li>
                            <li>
                                <Link href="">
                                    <Image src="/images/icons/fb-icon.svg" alt="Facebook" width={19} height={19} />
                                </Link>
                            </li>
                            <li>
                                <Link href="">
                                    <Image src="/images/icons/insta-icon.svg" alt="Instagram" width={19} height={19} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
