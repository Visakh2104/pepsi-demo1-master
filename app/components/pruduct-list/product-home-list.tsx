"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import ProductSection from "./product-section";
import PrdFilter from "./prd-filter";


export default function ProductListHome() {


    return (
        <section className="product-list-wrapp">
            <div className="container">
                <h2>Our Products</h2>
                <PrdFilter />
                <ProductSection/>

            </div>
        </section>
    );
}