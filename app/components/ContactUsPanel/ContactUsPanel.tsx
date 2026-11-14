"use client";

import { useEffect, useRef, useState } from "react";
import "./ContactUsPanel.css";

const CLOSE_DURATION_MS = 1600; // keep in step with the CSS transition

type ContactUsPanelProps = {
  /** true on the /contact page: open straight away instead of on scroll. */
  openOnMount?: boolean;
  /** Called after the close animation finishes (e.g. router.back()). */
  onClose?: () => void;
};

export default function ContactUsPanel({
  openOnMount = false,
  onClose,
}: ContactUsPanelProps) {
  const [open, setOpen] = useState(false);
  const atBottomRef = useRef(false);
  const closeTimerRef = useRef<number | null>(null);

  // Open on mount when this is its own page (/contact).
  useEffect(() => {
    if (!openOnMount) return;
    const frame = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(frame);
  }, [openOnMount]);

  // Otherwise open once each time the user scrolls to the bottom of the page.
  useEffect(() => {
    if (openOnMount) return;

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
  }, [openOnMount]);

  const close = () => {
    setOpen(false);
    if (onClose) {
      closeTimerRef.current = window.setTimeout(onClose, CLOSE_DURATION_MS);
    }
  };

  // Clear a pending onClose if the component unmounts.
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Lock page scroll while open, and close with the Escape key.
  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
      window.removeEventListener("keydown", onKey);
    };
    // close is recreated each render but only reads stable state/props here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div
      className={`cup${open ? " is-open" : ""}`}
      onClick={close}
      aria-hidden={!open}
    >
      <div
        className="cup-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Contact us"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="cup-close" onClick={close} aria-label="Close">
          &times;
        </button>

        <div className="cup-inner">
          <div className="cup-left">
            <span>Contact us</span>
            <h2>We offer local delivery &amp; pickup to:</h2>
            <p>Champaign, Urbana, &amp; Savoy Illinois</p>

            <div className="cup-social">
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          <div className="cup-right">
            <h3>Pepsi Cola C-U Bottling Co.</h3>

            <div className="cup-map">
              <span>[YOUR MAP EMBED]</span>
            </div>

            <ul className="cup-info">
              <li>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <div>
                  1306 W. Anthony Dr.
                  <br />
                  Champaign, IL 61821
                </div>
              </li>
              <li>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                </svg>
                <div>(217) 352-4126</div>
              </li>
              <li>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
                <div>
                  If you have any questions please contact{" "}
                  <a href="mailto:sales@pepsicolacu.com">sales@pepsicolacu.com</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}