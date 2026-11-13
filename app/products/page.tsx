"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import PrdFilter, { FilterValues } from "../components/pruduct-list/prd-filter";
import { productsData, Product } from "../data/products";
import FloatingCart from "../components/FloatingCart";
import SmoothScroll from "../components/SmoothScroll";
import "./products.css";
import PageLoader from "../components/PageLoader";
import ProductRequestPopup from "../product-popup/ProductRequestPopup";

export default function ProductsPage() {
    const [filters, setFilters] = useState<FilterValues>({
        search: "",
        brand: "all",
        type: "all",
        size: "all",
        sort: "price-desc",
    });

    const handleFilterChange = (updated: Partial<FilterValues>) => {
        setFilters((prev) => ({ ...prev, ...updated }));
    };

    const resetFilters = () => {
        setFilters({
            search: "",
            brand: "all",
            type: "all",
            size: "all",
            sort: "price-desc",
        });
    };

    const filteredProducts = useMemo(() => {
        let list = [...productsData];

        if (filters.search.trim()) {
            const query = filters.search.toLowerCase().trim();
            list = list.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.desc.toLowerCase().includes(query)
            );
        }

        if (filters.brand !== "all") {
            list = list.filter((p) => p.brand === filters.brand);
        }

        if (filters.type !== "all") {
            list = list.filter((p) => p.type === filters.type);
        }

        if (filters.size !== "all") {
            list = list.filter((p) => p.size === filters.size);
        }

        if (filters.sort === "price-desc") {
            list.sort((a, b) => b.price - a.price);
        } else if (filters.sort === "price-asc") {
            list.sort((a, b) => a.price - b.price);
        } else if (filters.sort === "newest") {
            list.sort((a, b) => b.id - a.id);
        } else if (filters.sort === "popular") {
            list.sort((a, b) => a.id - b.id);
        }

        return list;
    }, [filters]);

    return (
        <>
            <SmoothScroll />
            <PageLoader />
            <div className="products-page">
                <Header />

                <main className="products-page-main">
                    <div className="products-container product-list-wrapp">
                        <h2>Our Products</h2>

                        <PrdFilter
                            values={filters}
                            onChange={handleFilterChange}
                        />

                        {filteredProducts.length > 0 ? (
                            <div className="products-grid">
                                {filteredProducts.map((product, idx) => (
                                    <div
                                        className="products-card"
                                        key={product.id}
                                    >
                                        <div className="product-card-img-wrap">
                                            <div className="product-card-glow" />
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={340}
                                                height={340}
                                                className="product-card-can"
                                                priority={idx < 3}
                                            />
                                        </div>

                                        <div className="product-card-info">
                                            <h3>{product.name}</h3>
                                            <p>{product.desc}</p>
                                            <Link
                                                href={`#${product.id}`}
                                                className="products-card-btn"
                                            >
                                                FIND OUT MORE
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="products-empty-state">
                                <h3>No products match your selection</h3>
                                <p>Try clearing filters or search terms.</p>
                                <button type="button" onClick={resetFilters}>
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </main>

                <FloatingCart count={2} />

                <Footer />

                <>
                  <ProductRequestPopup />
                </>
            </div>
        </>
    );
}
