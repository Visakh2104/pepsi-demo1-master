"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./ListingRequestModal.css";

export default function ListingRequestModal() {
    const [open, setOpen] = useState(false);
    const atBottomRef = useRef(false);

    // Open once each time the user scrolls down to the bottom of the page.
    useEffect(() => {
        const onScroll = () => {
            const reachedBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 8;

            if (reachedBottom && !atBottomRef.current) {
                setOpen(true);
            }
            atBottomRef.current = reachedBottom;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Lock page scroll while open + close with the Escape key.
useEffect(() => {
  if (!open) return;

  const html = document.documentElement;
  const body = document.body;
  const prevHtml = html.style.overflow;
  const prevBody = body.style.overflow;

  html.style.overflow = "hidden";
  body.style.overflow = "hidden";

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  };
  window.addEventListener("keydown", onKey);

  return () => {
    html.style.overflow = prevHtml;
    body.style.overflow = prevBody;
    window.removeEventListener("keydown", onKey);
  };
}, [open]);
    return (
        <div
            className={`lrm${open ? " is-open" : ""}`}
            onClick={() => setOpen(false)}
            aria-hidden={!open}
        >
            <div
                className="lrm-dialog"
                role="dialog"
                aria-modal="true"
                aria-label="Request a product"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="lrm-close"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                >
                    &times;
                </button>
                <div className="product-form-scroll-div" data-lenis-prevent >
                    <h2>We carry a wide selection of products</h2>
                    <p>
                        <span>keep adding more for free home delivery or curbside pickup.</span>
                       
                        If you don&apos;t see your favorite beverage,please let us know!
                    </p>

                    <form className="lrm-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="lrm-row">
                            <div className="lrm-field">
                                <label htmlFor="lrm-name">Name *</label>
                                <input id="lrm-name" name="name" type="text" required />
                            </div>

                            <div className="lrm-field">
                                <label htmlFor="lrm-email">Email *</label>
                                <input id="lrm-email" name="email" type="email" required />
                            </div>

                            <div className="lrm-field">
                                <label htmlFor="lrm-phone">Phone *</label>
                                <div className="lrm-phone">
                                    <select name="country" defaultValue="+31" aria-label="Country code">
                                        <option value="+31">+31</option>
                                    </select>
                                    <input
                                        id="lrm-phone"
                                        name="phone"
                                        type="tel"
                                        defaultValue="06 12345678"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="lrm-field">
                            <label htmlFor="lrm-comment">Comment *</label>
                            <textarea
                                id="lrm-comment"
                                name="comment"
                                rows={4}
                                defaultValue="Which drink or flavor should we carry?"
                                required
                            />
                        </div>

                        <button type="submit" className="lrm-submit">
                            Send request
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}