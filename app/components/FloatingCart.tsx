"use client";

import Image from "next/image";
import Link from "next/link";
import "./floating-cart.css";

interface FloatingCartProps {
    count?: number;
}

export default function FloatingCart({ count = 2 }: FloatingCartProps) {
    return (
        <aside aria-label="Shopping Cart">
            <Link href="#cart" className="pepsi-floating-cart" aria-label={`View cart with ${count} items`}>
                <div className="cart-icon-wrapper">
                    <Image
                        src="/images/icons/cart-icon.svg"
                        alt="Shopping Cart"
                        width={24}
                        height={24}
                        style={{ objectFit: "contain" }}
                    />
                </div>
                <span className="cart-badge-count">{count}</span>
            </Link>
        </aside>
    );
}
