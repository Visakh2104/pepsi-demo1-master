"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SmoothScroll from "../components/SmoothScroll";
import "./contact.css";
import ProductMini from "../components/product-mini/ProductMini";

export default function ContactPage() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main className="contact-page">
        <section className="inner-banner-hero">
            <div className="banner-inner">
                <h2>CONTACT</h2>
            </div>
        </section>

        <section className="contact-content">

            <div className="container">

          <h2>
            We offer local delivery &amp; pickup to:
            <br />
            Champaign, Urbana, &amp; Savoy, Illinois.
          </h2>

          <div className="contact-map">
            <iframe
              title="Map showing Pepsi Cola C-U Bottling Co."
              src="https://www.google.com/maps?q=1306%20W%20Anthony%20Dr%2C%20Champaign%2C%20IL%2061821&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="contact-details">
            <h2>PEPSI COLA C-U BOTTLING CO.</h2>

            <div className="contact-detail-row">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 22s8-7.2 8-13A8 8 0 1 0 4 9c0 5.8 8 13 8 13Zm0-10.2A2.8 2.8 0 1 1 12 6.2a2.8 2.8 0 0 1 0 5.6Z" />
              </svg>
              <p>1306 W. Anthony Dr.<br />Champaign, IL 61821</p>
            </div>

            <div className="contact-detail-row">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.28.55 3.5.55a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.22.19 2.4.55 3.5a1 1 0 0 1-.25 1.02l-2.2 2.28Z" />
              </svg>
              <p><a href="tel:+12173524126">(217) 352-4126</a></p>
            </div>

            <p>
              If you have any questions please contact{" "}
              <a href="mailto:sales@pepsicolacuc.com">sales@pepsicolacuc.com</a>
            </p>
          </div>

          </div>

        </section>
        <ProductMini />
      </main>
      <Footer />
    </>
  );
}