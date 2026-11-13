
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Product {
    id: number;
    title: string;
    slug: string;
    link: string;
    image: string;
    "wck-meta"?: {subtitle_product?: string[]};
}

interface ProductsApiResponse {
    status: boolean;
    products: Product[];
}

export default function ProductSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch homepage products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/products?showhome=1`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data: ProductsApiResponse = await response.json();

                if (data.status && Array.isArray(data.products)) {
                    setProducts(data.products);
                }
            } catch (error) {
                console.error("Error fetching homepage products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // GSAP animations
    useGSAP(
        () => {
            const section = sectionRef.current;
            if (!section || !products.length) return;

            const cards = gsap.utils.toArray<HTMLElement>(
                ".product-col1",
                section
            );

            cards.forEach((card, index) => {
                const image =
                    card.querySelector<HTMLElement>(".product-img");

                const title =
                    card.querySelector<HTMLElement>(".product-cont");

                if (!image || !title) return;

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
        {
            scope: sectionRef,
            dependencies: [products],
            revertOnUpdate: true,
        }
    );

    if (loading) {
        return <div ref={sectionRef} className="product-section" />;
    }

    return (
        <div ref={sectionRef} className="product-section">
            <div className="product-grid">
                {products.map((product) => (
                    <div className="product-col1" key={product.id}>
                        <div className="product-img">
                            <Image
                                src={product.image}
                                alt={product.title}
                                width={400}
                                height={400}
                                sizes="(max-width: 768px) 80vw, 25vw"
                                style={{ objectFit: "contain" }}
                            />
                        </div>

                        <div className="product-cont">
                            <h4>{product.title}</h4>
                            <p>{product["wck-meta"]?.subtitle_product?.[0] || ""}</p>

                            <Link href="/products" className="prdt-btn">FIND OUT MORE</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
