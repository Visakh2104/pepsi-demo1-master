"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SmoothScroll from "../components/SmoothScroll";
import "./about.css";
import ProductMini from "../components/product-mini/ProductMini";
import PageLoader from "../components/PageLoader";
import FloatingCart from "../components/FloatingCart";

const HOLIDAYS = [
  "New Years Day",
  "Memorial Day",
  "July 4th",
  "Labor Day",
  "Thanksgiving Day",
  "Christmas Eve",
  "Christmas Day",
];

export default function AboutPage() {
  return (
    <>
      <SmoothScroll />
      <PageLoader />
      <Header />
      <main className="about-page">
        <div className="about-content">
          <div className="container">
            <h1>About</h1>

            <p>
              Every day is a great day to enjoy Pepsi-Cola products delivered
              free to your home by your local Pepsi bottler, Pepsi-Cola
              Champaign-Urbana Bottling Co.!
            </p>

            <p>
              You deserve to have easy access to delicious drinks like Pepsi,
              Mtn Dew, Starry, Starbucks, Aquafina, Pure Leaf Tea and our other
              brands. Through this site, we are now offering you delivery of our
              products right to your door in Champaign, Urbana, and Savoy, IL.,
              or warehouse pick up at our location in Champaign.
            </p>

            <p>
              Order now through this secure site and our delivery drivers will
              bring our products right to your home when it is convenient for
              you. Minimize shopping time and maximize your enjoyment of quality
              Pepsi products.
            </p>

            <p>
              Alternatively you can select warehouse pick up, drop by our
              location on Anthony Drive north of Interstate 74 and pick up your
              previously ordered items.
            </p>

            <p>
              PepsiHomeDelivery.com is owned and operated by the Pepsi Cola
              Champaign-Urbana Bottling Co. You can visit us online and learn
              more at{" "}
              <a
                href="https://pepsicolacu.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                pepsicolacu.com
              </a>
              .
            </p>

            <div className="about-holidays">
              <h2>Holidays:</h2>
              <p>
                Delivery and curbside pick up are not available on the following
                dates:
              </p>
              <ul>
                {HOLIDAYS.map((day) => (
                  <li key={day}>{day}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <ProductMini />
      </main>
      <FloatingCart count={2} />
      <Footer />
    </>
  );
}
