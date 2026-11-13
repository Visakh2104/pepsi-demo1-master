"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "./ProductDetail.css";
import im from "../../../public/images/pepsi-can5.png"

type ProductDetailProps = {
    category?: string;
    name?: string;
    variant?: string;
    price?: string;
    description?: string;
    image?: string;
    brand?: string;
};

const features = [
    {
        title: "Pack size",
        text: "1.25 liter bottles, sold as a 12 pack.",
    },
    {
        title: "Free delivery",
        text: "Free home delivery is available Tuesday – Friday between the hours of 7:00 A.M. and 4:00 P.M., with a minimum of 3 items.",
    },
    {
        title: "Free pick up",
        text: "Order pick up is available on Tuesday – Friday from 8:00 A.M. to 12 P.M. and 1 P.M. to 4:00 P.M. at our warehouse.",
    },
];

const MIN_QTY = 1;

export default function ProductDetail({
    category = "Carbonated Soft Drinks",
    name = "Product name",
    variant = "1.25 Liter Bottle 12-Pack",
    price = "[PRICE]",
    description = "[PRODUCT NAME] delivers the classic flavor you love with a crisp, refreshing finish. Light, smooth, and satisfying, it's perfect for enjoying anytime. Great for sharing at home or gatherings. 1.25 liter bottles, 12 pack.",
    image = "/images/bottle.png",
    brand = "[BRAND NAME]",
}: ProductDetailProps) {
    const [quantity, setQuantity] = useState(MIN_QTY);

    const decrease = () => setQuantity((q) => Math.max(MIN_QTY, q - 1));
    const increase = () => setQuantity((q) => q + 1);

    return (
        <main className="product-page">
            <section className="product-top">
                <div className="container">
                    <nav className="delivery-breadcrumb " aria-label="Breadcrumb">
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <Link href="/products">Products</Link>
                        <span>/</span>
                            <Link href="" className="current">Product Name</Link>
                    
                    </nav>

                    <div className="product-main">
                        <div className="product-image">
                            <Image src={im} alt={name}  priority />
                        </div>

                        <div className="product-info">
                            <h4>{category}</h4>
                            <h1>
                                   {name}
                                <span> {variant}</span>
                             
                            </h1>
                            <h2>{price}</h2>
                            <p>[PRODUCT NAME] delivers the classic flavor you love with a crisp, refreshing finish. Light, smooth, and satisfying, it's perfect for enjoying anytime. Great for sharing at home or gatherings. 1.25 liter bottles, 12 pack.</p>
                            <Link href="#nutrition">Nutrition Information</Link>

                            <form
                                className="product-cart"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <div className="product-qty-wrap">
                                    <label htmlFor="product-qty-value">Quantity</label>
                                    <div className="product-qty">
                                        <button
                                            type="button"
                                            onClick={decrease}
                                            disabled={quantity <= MIN_QTY}
                                            aria-label="Decrease quantity"
                                        >
                                            &minus;
                                        </button>
                                        <span id="product-qty-value" aria-live="polite">
                                            {quantity}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={increase}
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" className="product-add">
                                    Add to cart
                                </button>
                            </form>

                            <div className="product-meta">
                                <p>
                                    Categories: <Link href="/products">{category}</Link>,{" "}
                                    <Link href="/products">{brand}</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="product-features">
                <div className="container">
                    <div className="product-features-list">
                        {features.map((item) => (
                            <article key={item.title} className="product-feature">
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}