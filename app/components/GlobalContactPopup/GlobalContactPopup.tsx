"use client";

import { useEffect, useState } from "react";
import ContactUsPanel from "../ContactUsPanel/ContactUsPanel";

export default function GlobalContactPopup() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const openPopup = () => setShowPopup(true);

        window.addEventListener("open-contact-popup", openPopup);

        return () => {
            window.removeEventListener("open-contact-popup", openPopup);
        };
    }, []);

    if (!showPopup) return null;

    return (
        <ContactUsPanel
            openOnMount
            onClose={() => setShowPopup(false)}
        />
    );
}
