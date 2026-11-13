import Link from "next/link";
import type { ReactNode } from "react";
import "./Delivery.css";

type InfoItem = {
    title: string;
    body: ReactNode;
};

const homeDelivery: InfoItem[] = [
    {
        title: "Schedule",
        body: (
            <>
                Free home delivery is available
                Tuesday – Friday between the hours of
                7:00 A.M. and 4:00 P.M. Orders must
                be placed by 2:00 PM for 2nd day
                delivery with a minimum of 3 items.
                Orders placed after 2:00 P.M. will be
                delivered on the third business day
                after purchase and will be delivered
                by one of our regular delivery
                drivers.
            </>
        ),
    },
    {
        title: "At your door",
        body: (
            <>
                During ordering, you can tell us where to place your delivery and we
                will let you know when we are there with your order by phone or text.
            </>
        ),
    },
    {
        title: "Delivery area",
        body: (
            <>
                We are currently only providing delivery to [CITY 1], [CITY 2] and
                [CITY 3] zip codes [ZIP CODES]. If you are outside of these areas and
                would like to see our service in your town,{" "}
                <Link href="/contact">
                    let us know
                </Link>
                .
            </>
        ),
    },
];

const warehousePickUp: InfoItem[] = [
    {
        title: "Hours",
        body: (
            <>
                You can also pick up your order at [YOUR COMPANY NAME] on [YOUR
                STREET]. Order pick up is available on Tuesday – Friday from 8:00 A.M.
                to 12 P.M. and 1 P.M. to 4:00 P.M.
            </>
        ),
    },
    {
        title: "At checkout",
        body: (
            <>
                During the checkout process simply choose Warehouse Pick Up and select
                the day you will be coming to get your order. Orders must be placed by
                2:00 PM for 2nd day pick up with a minimum of 3 items. Orders placed
                after 2:00 P.M. will be available for pick up on the third business
                day after purchase.
            </>
        ),
    },
    {
        title: "When you arrive",
        body: (
            <>
                Please come to the front office for a copy of your invoice, before
                pulling around to door #2. You must have a copy of your invoice to
                receive product from the warehouse so please stop at the office first.
                Ring the buzzer on the right and an employee will come out to deliver
                your order to your vehicle. You will see a map of our building during
                the checkout process.
            </>
        ),
    },
];

function InfoColumns({ items }: { items: InfoItem[] }) {
    return (
        <div className="delivery-columns">
            {items.map((item) => (
                <article key={item.title} className="delivery-column">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                </article>
            ))}
        </div>
    );
}

export default function Delivery() {
    return (
        <main className="delivery-page">
            {/* Intro + Free Home Delivery */}
            <section className="delivery-section">
                <div className="container">
                    <nav className="delivery-breadcrumb" aria-label="Breadcrumb">
                        <Link href="/">
                            Home
                        </Link>
                        <span>/</span>
                        <span aria-current="page">
                            Delivery or Warehouse Pick Up
                        </span>
                    </nav>

                    <h1>
                        <span>Delivery or</span>
                        Warehouse Pick Up
                    </h1>

                    <p>
                        We are offering home delivery as well as warehouse pick up in order
                        to provide you with the most convenient method of receiving your
                        favorite beverages.
                    </p>

                    <button className="delivery-btn">Free Home Delivery</button>
                    <InfoColumns items={homeDelivery} />
                </div>
            </section>

            {/* Free Warehouse Pick Up */}
            <section className="delivery-section delivery-section-alt">
                <div className="container">
                    <button className="delivery-btn">Free Warehouse Pick Up</button>
                    <InfoColumns items={warehousePickUp} />
                </div>
            </section>
        </main>
    );
}