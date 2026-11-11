"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./header.css";

const MENU = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Delivery/Pick up", href: "/delivery" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
];

const SOCIALS = [
    { icon: "search-icon.svg", label: "Search" },
    { icon: "cart-icon.svg", label: "Cart" },
    { icon: "fb-icon.svg", label: "Facebook" },
    { icon: "insta-icon.svg", label: "Instagram" },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    // Close the menu when the page changes
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    // Lock page scroll and allow Esc to close while the menu is open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        // Reset if the screen is resized back to desktop
        const onResize = () => {
            if (window.innerWidth > 991) setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener("resize", onResize);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("resize", onResize);
        };
    }, [open]);

    return (
        <header className="header">
            <div className="top-header">
                <div className="container">
                    <ul>
                        <li>Pepsi home delivery</li>
                        <li>Champaign - Urbana - Savoy</li>
                    </ul>
                </div>
            </div>
            <div className="main-header">
                <div className="container">
                    <div className="head-logo">
                        <Link href="/">
                            <Image
                                src={"/images/icons/header-logo.svg"}
                                alt={"Pepsi Logo"}
                                width={70}
                                height={70}
                                sizes="(max-width: 768px) 80vw, 25vw"
                                style={{ objectFit: "contain" }}
                            />
                        </Link>
                    </div>

                    {/* Hamburger button (mobile only) */}
                    <button
                        type="button"
                        className={`menu-toggle${open ? " is-open" : ""}`}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="mobile-nav"
                        onClick={() => setOpen((v) => !v)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>

                    {/* Dark overlay behind the drawer (mobile only) */}
                    <div
                        className={`nav-overlay${open ? " is-open" : ""}`}
                        onClick={() => setOpen(false)}
                        aria-hidden="true"
                    />

                    {/* On desktop this wrapper is invisible to layout; on mobile it is the slide-in drawer */}
                    <div id="mobile-nav" className={`nav-drawer${open ? " is-open" : ""}`}>
                        <button
                            type="button"
                            className="drawer-close"
                            aria-label="Close menu"
                            onClick={() => setOpen(false)}
                        >
                            <span />
                            <span />
                        </button>

                        <div className="menu-items">
                            <ul>
                                {MENU.map((item, i) => (
                                    <li
                                        key={item.href}
                                        style={{ ["--i" as string]: i } as React.CSSProperties}
                                    >
                                        <Link
                                            href={item.href}
                                            className={pathname === item.href ? "active" : ""}
                                            onClick={() => setOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="social-icons">
                            <ul>
                                {SOCIALS.map((s, i) => (
                                    <li
                                        key={s.icon}
                                        style={{ ["--i" as string]: MENU.length + i } as React.CSSProperties}
                                    >
                                        <Link href="" aria-label={s.label}>
                                            <Image
                                                src={`/images/icons/${s.icon}`}
                                                alt={s.label}
                                                width={19}
                                                height={19}
                                                sizes="(max-width: 768px) 80vw, 25vw"
                                                style={{ objectFit: "contain" }}
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
