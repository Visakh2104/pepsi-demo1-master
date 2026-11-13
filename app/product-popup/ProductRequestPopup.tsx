"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "./ProductRequestPopup.css";

export default function ProductRequestPopup() {
  const [open, setOpen] = useState(false);
  const atBottomRef = useRef(false);

  // Open the panel once each time the user scrolls down to the bottom of the page.
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

  return (
    <div className={`request-popup${open ? " is-open" : ""}`}>
      <div className="container">
        <div className="request-popup-inner">
          <button
            type="button"
            className="request-close"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            &times;
          </button>

          <h2>We carry a wide selection of products</h2>
          <p>
            keep adding more for free home delivery or curbside pickup.
            <br />
            If you don&apos;t see your favorite beverage,{" "}
            <Link href="/contact">please let us know!</Link>
          </p>

          <form className="request-form" onSubmit={(e) => e.preventDefault()}>
            <div className="request-row">
              <div className="request-field">
                <label htmlFor="req-name">Name *</label>
                <input id="req-name" name="name" type="text" required />
              </div>

              <div className="request-field">
                <label htmlFor="req-email">Email *</label>
                <input id="req-email" name="email" type="email" required />
              </div>

              <div className="request-field">
                <label htmlFor="req-phone">Phone</label>
                <div className="request-phone">
                  <select id="req-phone" name="country" defaultValue="+31">
                    <option value="+31">+31</option>
                  </select>
                  <input name="phone" type="tel" defaultValue="06 12345678" />
                </div>
              </div>
            </div>

            <div className="request-field request-full">
              <label htmlFor="req-comment">Comment</label>
              <textarea
                id="req-comment"
                name="comment"
                rows={4}
                defaultValue="Which drink or flavor should we carry?"
              />
            </div>

            <button type="submit" className="request-submit">
              Send request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}