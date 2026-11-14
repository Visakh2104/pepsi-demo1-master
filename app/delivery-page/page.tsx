// import Delivery from "@/app/components/Delivery/Delivery";
import Delivery from "../components/Delivery/Delivery";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
// @/components/Delivery/Delivery
export const metadata = {
  title: "Delivery or Warehouse Pick Up",
};

export const dynamic = "force-dynamic";

export default function DeliveryPage() {
  return(

    <>
        <Header />
         <Delivery />
          <Footer />
    </>
  )
}