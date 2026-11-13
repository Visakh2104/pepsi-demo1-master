import ProductDetail from "@/app/components/ProductDetail/ProductDetail";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function ProductPage() {
  return (
    <>
        <Header />

    <ProductDetail
      category="Carbonated Soft Drinks"
      name="[PRODUCT NAME]"
      variant="1.25 Liter Bottle 12-Pack"
      price="[PRICE]"
      description="[PRODUCT NAME] delivers the classic flavor you love..."
      image="/images/bottle.png"
      brand="[BRAND NAME]"
    />
 <Footer />
    </>
  );
}