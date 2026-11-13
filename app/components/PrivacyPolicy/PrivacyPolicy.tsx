import Link from "next/link";
import type { ReactNode } from "react";
import "./PrivacyPolicy.css";

type PolicySection = {
    heading: string;
    paragraphs: ReactNode[];
};

const sections: PolicySection[] = [
    {
        heading: "[SHORT NAME] United States Privacy Policy",
        paragraphs: [
            "It is our aim through this [SHORT NAME] UNITED STATES PRIVACY POLICY (“Policy”) to explain what information we collect about you and why we collect that information. We also want to make sure you understand how we use and share your information and the choices available to you. Our goal is to earn and keep your trust as you visit websites and applications about our products and brands.",
            "This Policy describes how we treat personal information on websites (“sites”), mobile or social media applications (“apps”), and any other services where we include an authorized link or reference to this Policy (together, the “Services”). This Policy does not describe our practices on sites or apps where it is not referenced.",
            "Your use of our apps and sites indicates you agree to our collection, use, and sharing of your information as set forth in this Policy.",
        ],
    },
    {
        heading: "What information do we collect?",
        paragraphs: [
            <>
                <strong>
                    We collect identifiers and contact information. For example, we may
                    collect your
                </strong>{" "}
                name and street address if you register on our site or apps. We may
                also collect your phone number or email address. We also collect online
                identifiers. For example, if you engage with us through a social media
                site, we may collect your social media user identifier.
            </>,
            <>
                <strong>
                    We collect payment information. If you make purchases with us, we (or
                    our business
                </strong>{" "}
                partners who process credit cards for us) may collect your billing
                information. This includes your credit card number.
            </>,
            <>
                <strong>
                    We collect information you submit or otherwise provide or authorize us
                    to collect.
                </strong>{" "}
                We collect the information you post in a public space on our site. This
                includes comments and videos or photos. We also collect any other
                information you may provide to us or authorize us to collect. [REST OF
                THIS PARAGRAPH]
            </>,
        ],
    },
    {
        heading: "[Next section heading]",
        paragraphs: ["[POLICY SECTION TEXT]"],
    },
    {
        heading: "[Next section heading]",
        paragraphs: ["[POLICY SECTION TEXT]"],
    },
];

export default function PrivacyPolicy() {
    return (
        <main className="privacy-page">
            <section className="privacy-top">
                <div className="container">

                    <nav className="delivery-breadcrumb " aria-label="Breadcrumb">
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <Link href="/products" className="current">Privacy</Link>


                    </nav>


                    <h1>
                        Privacy Policy
                        <span>Updated: [DATE]</span>
                    </h1>

                    <div className="privacy-body">
                        <p className="privacy-intro">
                            Welcome to the [YOUR COMPANY NAME] (“[SHORT NAME]”) web site.
                            Below you will find our Privacy Policy regarding any personal
                            information that you may supply to us through this web site.
                        </p>

                        {sections.map((section, index) => (
                            <article key={index} className="privacy-section">
                                <h2>{section.heading}</h2>
                                {section.paragraphs.map((text, i) => (
                                    <p key={i}>{text}</p>
                                ))}
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}