
import FloatingCart from "./components/FloatingCart";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import { HomeCont2 } from "./components/home-contn2/HomeCont2";
import HomeCont1 from "./components/home-contnt1/HomeCont1";
import PageLoader from "./components/PageLoader";
import PepsiHero from "./components/PepsiHero";
import ProductListHome from "./components/pruduct-list/product-home-list";
import SmoothScroll from "./components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <PageLoader />

      <main>
        <Header />
        <PepsiHero />
        <ProductListHome />
        <HomeCont1 />
        <HomeCont2 />
        <FloatingCart count={2} />
        <Footer />
      </main>
    </>
  );
}
