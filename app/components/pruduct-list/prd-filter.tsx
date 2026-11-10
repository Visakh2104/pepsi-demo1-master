"use client";

import { useState } from 'react';
import AnimatedDropdown from '../animatedDrop/AnimatedDropdown';
import './product-home.css';
import Image from 'next/image';

export interface FilterValues {
    search: string;
    brand: string;
    type: string;
    size: string;
    sort: string;
}

interface PrdFilterProps {
    values?: FilterValues;
    onChange?: (values: Partial<FilterValues>) => void;
}

export const BRAND_OPTIONS = [
    { value: "all", label: "All Brands" },
    { value: "pepsi", label: "Pepsi" },
    { value: "diet-pepsi", label: "Diet Pepsi" },
    { value: "pepsi-zero-sugar", label: "Pepsi Zero Sugar" },
    { value: "pepsi-wild-cherry", label: "Pepsi Wild Cherry" },
];

export const TYPE_OPTIONS = [
    { value: "all", label: "All Types" },
    { value: "regular", label: "Regular" },
    { value: "zero-sugar", label: "Zero Sugar" },
    { value: "diet", label: "Diet" },
    { value: "cherry", label: "Cherry" },
];

export const SIZE_OPTIONS = [
    { value: "all", label: "All Serving Sizes" },
    { value: "250ml", label: "250ml" },
    { value: "330ml", label: "330ml" },
    { value: "500ml", label: "500ml" },
    { value: "1L", label: "1L" },
    { value: "2L", label: "2L" },
];

export const SORT_OPTIONS = [
    { value: "price-desc", label: "Price High to Low" },
    { value: "price-asc", label: "Price Low to High" },
    { value: "newest", label: "Newest" },
    { value: "popular", label: "Popular" },
];

export default function PrdFilter({ values, onChange }: PrdFilterProps) {
    const [localValues, setLocalValues] = useState<FilterValues>({
        search: "",
        brand: "all",
        type: "all",
        size: "all",
        sort: "price-desc",
    });

    const currentValues = values || localValues;

    const handleUpdate = (field: keyof FilterValues, val: string) => {
        if (onChange) {
            onChange({ [field]: val });
        } else {
            setLocalValues((prev) => ({ ...prev, [field]: val }));
        }
    };

    return (
        <div className="prd-filter-row row">
            {/* Search */}
            <div className="prft-col1 col-md-2">
                <h3>Search</h3>
                <div className="prd-filter">
                    <input
                        type="text"
                        className="prd-filter-select"
                        placeholder="Search products..."
                        value={currentValues.search}
                        onChange={(e) => handleUpdate("search", e.target.value)}
                    />
                    <button className="search-btn" type="button" aria-label="Search">
                        <Image
                            src={'/images/icons/search-icon.svg'}
                            alt={'Search Icon'}
                            width={19}
                            height={19}
                            sizes="(max-width: 768px) 80vw, 25vw"
                            style={{ objectFit: "contain" }}
                        />
                    </button>
                </div>
            </div>

            {/* Brand Dropdown */}
            <div className="prft-col1 col-md-2">
                <h3>Brand</h3>
                <div className="filter-col">
                    <AnimatedDropdown
                        options={BRAND_OPTIONS}
                        value={currentValues.brand}
                        onChange={(val) => handleUpdate("brand", val)}
                        placeholder="All Brands"
                    />
                </div>
            </div>

            {/* Type Dropdown */}
            <div className="prft-col1 col-md-2">
                <h3>Type</h3>
                <div className="filter-col">
                    <AnimatedDropdown
                        options={TYPE_OPTIONS}
                        value={currentValues.type}
                        onChange={(val) => handleUpdate("type", val)}
                        placeholder="All Types"
                    />
                </div>
            </div>

            {/* Serving Size Dropdown */}
            <div className="prft-col1 col-md-2">
                <h3>Serving Size</h3>
                <div className="filter-col">
                    <AnimatedDropdown
                        options={SIZE_OPTIONS}
                        value={currentValues.size}
                        onChange={(val) => handleUpdate("size", val)}
                        placeholder="All Serving Sizes"
                    />
                </div>
            </div>

            {/* Sort by Dropdown */}
            <div className="prft-col1 col-md-2">
                <h3>Sort By</h3>
                <div className="filter-col">
                    <AnimatedDropdown
                        options={SORT_OPTIONS}
                        value={currentValues.sort}
                        onChange={(val) => handleUpdate("sort", val)}
                        placeholder="Price High to Low"
                    />
                </div>
            </div>
        </div>
    );
}
