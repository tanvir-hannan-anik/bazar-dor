import ProductDetailsContent from "@/component/ProductDetailsContent";
import { Suspense } from "react";


export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f0f5f0] p-6">
          <div className="mx-auto max-w-6xl animate-pulse space-y-5">
            <div className="h-6 w-40 rounded bg-gray-200" />
            <div className="h-36 rounded-2xl bg-white" />
            <div className="h-48 rounded-2xl bg-white" />
            <div className="h-64 rounded-2xl bg-white" />
          </div>
        </div>
      }
    >
      <ProductDetailsContent params={params} />
    </Suspense>
  );
}