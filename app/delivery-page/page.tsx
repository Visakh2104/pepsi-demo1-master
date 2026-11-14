// import Delivery from "@/app/components/Delivery/Delivery";
import { Suspense } from "react";
import Delivery from "../components/Delivery/Delivery";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
// @/components/Delivery/Delivery
export const metadata = {
  title: "Delivery or Warehouse Pick Up",
};

export default function DeliveryPage() {
  return(

    <>
        <Header />
         <Suspense
                fallback={
                    <main className="delivery-page">
                        <div className="container">
                            Loading delivery information...
                        </div>
                    </main>
                }
            >
                <Delivery />
          </Suspense>
          <Footer />
    </>
  )
}