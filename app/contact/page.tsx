"use client";

import { useEffect } from "react";

export default function ContactPage() {
    useEffect(() => {
        window.dispatchEvent(new Event("open-contact-popup"));
    }, []);

    return null;
}
