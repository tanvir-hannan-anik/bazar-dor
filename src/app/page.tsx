import HeroSectionPage from "@/component/HeroSection";
import ProductList from "@/component/ProductList";
import ProductPriceCard from "@/component/ProductPriceCard";
import { Suspense } from "react";

export default function Home() {
  

  return (
    <div className="container mx-auto">
      <HeroSectionPage></HeroSectionPage>
      <Suspense fallback="Loading...">
      <ProductList></ProductList>
      </Suspense>
    </div>
  );
}
