
import Link from "next/link";
import "./Delivery.css";
import { connection } from "next/server";

interface DeliveryPageResponse {
    title?: string;
    "wck-meta"?: {
        freehome_delivery_content?: string[];
        freehome_delivery_content_1?: string[];
        freehome_delivery_content_2?: string[];
        freepickupcontent?: string[];
        freepickupcontent_1?: string[];
        freepickupcontent_2?: string[];
    };
}

async function getDeliveryPage(): Promise<DeliveryPageResponse | null> {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/page/delivery`,
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch delivery page");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching delivery page:", error);
        return null;
    }
}

export default async function Delivery() {
    await connection();
    const data = await getDeliveryPage();

    const pageTitle = data?.title || "Delivery or Warehouse Pick Up";
    const meta = data?.["wck-meta"] || {};

    const homeDeliveryContent = [
        meta.freehome_delivery_content?.[0] || "",
        meta.freehome_delivery_content_1?.[0] || "",
        meta.freehome_delivery_content_2?.[0] || "",
    ];

    const warehousePickupContent = [
        meta.freepickupcontent?.[0] || "",
        meta.freepickupcontent_1?.[0] || "",
        meta.freepickupcontent_2?.[0] || "",
    ];

    return (
        <main className="delivery-page">
            {/* Intro + Free Home Delivery */}
            <section className="delivery-section">
                <div className="container">
                    <nav className="delivery-breadcrumb" aria-label="Breadcrumb">
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <span aria-current="page">{pageTitle}</span>
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

                    <button className="delivery-btn">
                        Free Home Delivery
                    </button>

                    <div className="delivery-columns">
                        {homeDeliveryContent.map((content, index) =>
                            content ? (
                                <article key={index} className="delivery-column">
                                    <div dangerouslySetInnerHTML={{ __html: content }} />
                                </article>
                            ) : null
                        )}
                    </div>
                </div>
            </section>

            {/* Free Warehouse Pick Up */}
            <section className="delivery-section delivery-section-alt">
                <div className="container">
                    <button className="delivery-btn">
                        Free Warehouse Pick Up
                    </button>

                    <div className="delivery-columns">
                        {warehousePickupContent.map((content, index) =>
                            content ? (
                                <article key={index} className="delivery-column">
                                    <div dangerouslySetInnerHTML={{ __html: content }} />
                                </article>
                            ) : null
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
