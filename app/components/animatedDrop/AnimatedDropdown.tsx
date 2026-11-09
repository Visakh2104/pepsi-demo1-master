
"use client";

import { useEffect, useRef, useState } from "react";

interface Option {
    label: string;
    value: string;
}

interface CustomSelectProps {
    options: Option[];
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export default function CustomSelect({
    options,
    placeholder = "Select an option",
    value,
    onChange,
}: CustomSelectProps) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    const selected = options.find(
        (option) => option.value === value
    );

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleSelect = (option: Option) => {
        onChange?.(option.value);
        setOpen(false);
        setSearch("");
    };

    return (
        <div ref={wrapperRef} className="prd-filter">

            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="prd-filter-select"
                aria-expanded={open}
                aria-haspopup="listbox"
            >
                <span className={selected ? "" : "text-gray-400"}>
                    {selected?.label || placeholder}
                </span>

                
            </button>

            {/* Dropdown */}
            {open && (
                <div className="select-list">

                    {/* Search */}
                    {/* <div className="border-b p-3">
                        <div className="flex items-center gap-2 rounded-md border px-3">
                            <Search size={16} className="text-gray-400" />

                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full py-2 text-sm outline-none"
                                autoFocus
                            />
                        </div>
                    </div> */}

                    {/* Options */}
                    <ul
                        role="listbox"
                        className="prdt-list"
                    >
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => {
                                const isSelected = value === option.value;

                                return (
                                    <li key={option.value}>
                                        <button
                                            type="button"
                                            role="option"
                                            aria-selected={isSelected}
                                            onClick={() => handleSelect(option)}
                                            className="prdt-item"
                                        >
                                            {option.label}

                                            
                                        </button>
                                    </li>
                                );
                            })
                        ) : (
                            <li className="prdt-list empty">
                                No options found
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
