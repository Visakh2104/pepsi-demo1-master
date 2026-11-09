import { useState } from 'react';
import AnimatedDropdown from '../animatedDrop/AnimatedDropdown';
import './product-home.css';
import Image from 'next/image';

export default function PrdFilter() {

    const filters = [
        {   
            titlePlaceholder: "All Brands",
            title: "Brand",
            name: "brand",
            options: ["All Brands", "Pepsi", "Diet Pepsi", "Pepsi Zero Sugar", "Pepsi Wild Cherry"]
        },
        {   
            titlePlaceholder: "All Types",
            title: "Type",
            name: "type",
            options: ["All Types", "Pepsi", "Diet Pepsi", "Pepsi Zero Sugar", "Pepsi Wild Cherry"]
        },
        {
            titlePlaceholder: "All Serving Sizes",
            title: "Serving Size",
            name: "size",
            options: ["All Serving Sizes", "250ml", "330ml", "500ml", "1L", "2L"]
        },
        {
            titlePlaceholder: "Price High to Low",
            title: "Sort By",
            name: "sort",
            options: ["Price High to Low", "Price Low to High", "Newest", "Popular"]
        }
    ];

    const brandTypes = [
        { value: "pepsi", label: "Pepsi" },
        { value: "diet-pepsi", label: "Diet Pepsi" },
        { value: "pepsi-zero-sugar", label: "Pepsi Zero Sugar" },
        { value: "pepsi-wild-cherry", label: "Pepsi Wild Cherry" },
    ];

    const [brand, setBrand] = useState("");

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
                    />
                    <button className="search-btn">
                        <Image
                            src={'/images/icons/search-icon.svg'}
                            alt={'Pepsi Logo'}
                            width={19}
                            height={19}
                            sizes="(max-width: 768px) 80vw, 25vw"
                            style={{ objectFit: "contain" }}
                        />
                    </button>
                </div>
            </div>

            {/* Dropdown Filters */}
            {filters.map((filter) => (
                <div className="prft-col1 col-md-2" key={filter.name}>
                    <h3>{filter.title}</h3>

                    {/* <div className="prd-filter">
                        <select
                            className="prd-filter-select"
                            name={filter.name}
                            defaultValue={filter.options[0]}
                        >
                            {filter.options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div> */}

                    <div className="filter-col">

                    <AnimatedDropdown
                        options={brandTypes}
                        value={brand}
                        onChange={setBrand}
                        placeholder={filter.titlePlaceholder}
                    />

                    </div>

                </div>
            ))}

        </div>
    );
}
