"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SmoothScroll from "../components/SmoothScroll";
import "./delivery.css";

export default function DeliveryPickupPage() {
  return (
    <>
    <SmoothScroll />
    <Header />
    <main className="delivery-page">
      <section className="delivery-hero" aria-labelledby="delivery-title">
        <div className="delivery-hero__inner">
          <h2>Delivery or warehouse pick up</h2>
        </div>
      </section>

      <div className="delivery-content">

        <div className="container">

        <p>
          We are offering home delivery as well as warehouse pick up in order to
          provide you with the most convenient method of receiving your favorite
          beverages.
        </p>

        <div className="delivery-section">
          <h2>Free home delivery</h2>
          <p>
            Free home delivery is available Tuesday – Friday between the hours of
            7:00 A.M. and 4:00 P.M. Orders must be placed by 2:00 PM for 2nd day
            delivery with a minimum of 3 items. Orders placed after 2:00 P.M. will
            be delivered on the third business day after purchase and will be
            delivered by one of our regular delivery drivers.
          </p>
          <p>
            We are currently only providing delivery to Champaign, Urbana, &amp;
            Savoy zip codes 61820, 61821, 61822, 61801, 61802, 61874. If you are
            outside of these areas and would like to see our service in your town,
            let us know.
          </p>
        </div>

        <div className="delivery-section">
          <h2>Free warehouse pick up</h2>
          <p>
            You can also pick up your order at Pepsi Cola C-U Bottling Co. on Anthony Drive North of Interstate 74. Order pick up is available on Tuesday – Friday from 8:00 A.M. to 12 P.M. and 1 P.M. to 4:00 P.M.
          </p>
          <p>
            During the checkout process simply choose Warehouse Pick Up and select the day you will be coming to get your order.  Orders must be placed by 2:00 PM for 2nd day pick up with a minimum of 3 items. Orders placed after 2:00 P.M. will be available for pick up on the third business day after purchase.
          </p>
          <p>
            Please come to the front office for a copy of your invoice, before pulling around to door #2. You must have a copy of your invoice to receive product from the warehouse so please stop at the office first. Ring the buzzer on the right and an employee will come out to deliver your order to your vehicle. You will see a map of our building during the checkout process.
          </p>
        </div>

        </div>

      
      </div>
    </main>
    <Footer />
    </>
  );
}
