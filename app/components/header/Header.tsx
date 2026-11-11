"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "./header.css";

const MENU = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Delivery/Pick up", href: "/delivery" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
];

const SOCIALS = [
    { icon: "search-icon.svg", label: "Search", isSearch: true },
    { icon: "cart-icon.svg", label: "Cart" },
    { icon: "fb-icon.svg", label: "Facebook" },
    { icon: "insta-icon.svg", label: "Instagram" },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    // Close the menu and search bar when the page changes
    useEffect(() => {
        setOpen(false);
        setSearchOpen(false);
    }, [pathname]);

    // Focus the desktop search input when the bar opens
    useEffect(() => {
        if (searchOpen) {
            const t = setTimeout(() => searchInputRef.current?.focus(), 350);
            return () => clearTimeout(t);
        }
    }, [searchOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const q = query.trim();
        if (!q) return;
        setOpen(false);
        setSearchOpen(false);
        router.push(`/products?search=${encodeURIComponent(q)}`);
    };

    // Lock page scroll and allow Esc to close while the menu is open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false);
                setSearchOpen(false);
            }
        };
        // Reset if the screen is resized back to desktop
        const onResize = () => {
            if (window.innerWidth > 991) setOpen(false);
            else setSearchOpen(false);
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

                    {/* Mobile search bar: shown in the header next to the hamburger */}
                    <form className="mobile-search" onSubmit={handleSearch} role="search">
                        <input
                            type="text"
                            placeholder="Search products..."
                            aria-label="Search products"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit" aria-label="Search">
                            <Image
                                src={"/images/icons/search-icon.svg"}
                                alt=""
                                width={19}
                                height={19}
                                style={{ objectFit: "contain" }}
                            />
                        </button>
                    </form>

                    <div className="social-icons mob">
                        <ul>
                            {SOCIALS.map((s, i) => (
                                <li
                                    key={s.icon}
                                    className={s.isSearch ? "search-item" : undefined}
                                    style={{ ["--i" as string]: MENU.length + i } as React.CSSProperties}
                                >
                                    {s.isSearch ? (
                                        <button
                                            type="button"
                                            className={`search-trigger${searchOpen ? " is-active" : ""}`}
                                            aria-label={searchOpen ? "Close search" : "Open search"}
                                            aria-expanded={searchOpen}
                                            aria-controls="desktop-search"
                                            onClick={() => setSearchOpen((v) => !v)}
                                        >
                                            <Image
                                                src={`/images/icons/${s.icon}`}
                                                alt=""
                                                width={19}
                                                height={19}
                                                style={{ objectFit: "contain" }}
                                            />
                                        </button>
                                    ) : (
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
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

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
                                        className={s.isSearch ? "search-item" : undefined}
                                        style={{ ["--i" as string]: MENU.length + i } as React.CSSProperties}
                                    >
                                        {s.isSearch ? (
                                            <button
                                                type="button"
                                                className={`search-trigger${searchOpen ? " is-active" : ""}`}
                                                aria-label={searchOpen ? "Close search" : "Open search"}
                                                aria-expanded={searchOpen}
                                                aria-controls="desktop-search"
                                                onClick={() => setSearchOpen((v) => !v)}
                                            >
                                                <Image
                                                    src={`/images/icons/${s.icon}`}
                                                    alt=""
                                                    width={19}
                                                    height={19}
                                                    style={{ objectFit: "contain" }}
                                                />
                                            </button>
                                        ) : (
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
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Desktop search bar: slides down when the search icon is clicked */}
                <div id="desktop-search" className={`search-panel${searchOpen ? " is-open" : ""}`}>
                    <div className="container">
                        <form className="search-form" onSubmit={handleSearch} role="search">
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search products..."
                                aria-label="Search products"
                                tabIndex={searchOpen ? 0 : -1}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button type="submit" className="search-submit" aria-label="Search" tabIndex={searchOpen ? 0 : -1}>
                                <Image
                                    src={"/images/icons/search-icon.svg"}
                                    alt=""
                                    width={19}
                                    height={19}
                                    style={{ objectFit: "contain" }}
                                />
                            </button>
                            <button
                                type="button"
                                className="search-close"
                                aria-label="Close search"
                                tabIndex={searchOpen ? 0 : -1}
                                onClick={() => setSearchOpen(false)}
                            >
                                <span />
                                <span />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </header>
    );
}
