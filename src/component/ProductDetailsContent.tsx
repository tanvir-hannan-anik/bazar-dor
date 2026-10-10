
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug?: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek?: number;
  lastMonth?: number;
  change?: {
    dir: string;
    pct: number;
  };
  markets?: Market[];
}

interface Props {
  params: Promise<{ productId: string }>;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(price);

export default async function ProductDetailsContent({ params }: Props) {
  const { productId } = await params;

  let product: Product | null = null;

  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products/${productId}`,
      { cache: "no-store" }
    );

    if (res.ok) {
      const result = await res.json();
      product = result.data ?? result;
    }
  } catch (error) {
    console.error("Product fetch failed:", error);
  }

  if (!product || !product.nameBn) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f0f5f0] p-5">
        <div className="w-full max-w-md rounded-2xl border border-[#e4ebe4] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl">
            🔎
          </div>

          <h1 className="mt-4 text-xl font-bold text-[#29352c]">
            পণ্য পাওয়া যায়নি
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            পণ্যটির তথ্য পাওয়া যাচ্ছে না। আবার চেষ্টা করো।
          </p>

          <Link
            href="/"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
          >
            <ArrowLeft size={16} />
            হোম পেজে ফিরে যাও
          </Link>
        </div>
      </main>
    );
  }

  const markets = product.markets ?? [];
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const lowestPrice = markets.length
    ? Math.min(...markets.map((m) => m.min))
    : product.today;

  const highestPrice = markets.length
    ? Math.max(...markets.map((m) => m.max))
    : product.today;

  const averagePrice = markets.length
    ? markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      markets.length
    : product.today;

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Breadcrumb */}
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <ChevronRight size={15} />

          <span>{product.categoryNameBn}</span>

          <ChevronRight size={15} />

          <span className="font-medium text-[#29352c]">
            {product.nameBn}
          </span>
        </div>

        {/* Product Header */}
        <section className="mb-5 flex flex-col justify-between gap-5 rounded-2xl border border-[#e4ebe4] bg-[#fbfdfb] p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#edf4ed] text-4xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="min-w-0">
              <p className="mb-1 text-xs font-medium text-green-700">
                {product.categoryNameBn}
              </p>

              <h1 className="text-xl font-bold text-[#263129] sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                {" · "}আজকের বাজারদর
              </p>

              <p className="mt-1 text-xs text-gray-400">
                গতকালের তুলনায় দামের পরিবর্তন
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#f0f5f0] p-4 sm:min-w-48 sm:text-center">
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <p className="my-1 text-3xl font-bold text-[#263b2a]">
              ৳{formatPrice(product.today)}
            </p>

            <p className="text-xs text-gray-500">
              প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
            </p>

            <div
              className={`mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                isUp
                  ? "bg-red-50 text-red-600"
                  : isDown
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              {isUp ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}

              {isUp ? "+" : ""}
              {formatPrice(product.change?.pct ?? 0)}%
            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mb-5 rounded-2xl border border-[#e4ebe4] bg-[#fbfdfb] p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-[#29352c]">
              দামের সারসংক্ষেপ
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              বাজারের সর্বনিম্ন, সর্বোচ্চ ও গড় দাম
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <SummaryCard
              label="সর্বনিম্ন দাম"
              price={lowestPrice}
              color="text-green-700"
              icon="↓"
            />

            <SummaryCard
              label="সর্বোচ্চ দাম"
              price={highestPrice}
              color="text-red-500"
              icon="↑"
            />

            <SummaryCard
              label="গড় দাম"
              price={averagePrice}
              color="text-[#29352c]"
              icon="≈"
            />
          </div>
        </section>

        {/* Market Table */}
        <section className="overflow-hidden rounded-2xl border border-[#e4ebe4] bg-[#fbfdfb] shadow-sm">
          <div className="border-b border-[#e4ebe4] p-5 sm:p-6">
            <h2 className="text-lg font-bold text-[#29352c]">
              বাজারভিত্তিক দাম
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {formatPrice(markets.length)}টি বাজারের মূল্যতথ্য
            </p>
          </div>

          {markets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead className="bg-[#f2f7f2] text-gray-500">
                  <tr>
                    <th className="px-5 py-4 text-left font-medium">
                      বাজার
                    </th>

                    <th className="px-5 py-4 text-left font-medium">
                      বিভাগ
                    </th>

                    <th className="px-5 py-4 text-right font-medium">
                      সর্বনিম্ন
                    </th>

                    <th className="px-5 py-4 text-right font-medium">
                      সর্বোচ্চ
                    </th>

                    <th className="px-5 py-4 text-right font-medium">
                      গড় দাম
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${market.division}-${index}`}
                      className="border-t border-[#e8eee8] transition hover:bg-[#f2f7f2]"
                    >
                      <td className="px-5 py-4 font-medium text-[#344137]">
                        {market.market}
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {market.division}
                      </td>

                      <td className="px-5 py-4 text-right text-green-700">
                        ৳{formatPrice(market.min)}
                      </td>

                      <td className="px-5 py-4 text-right text-red-500">
                        ৳{formatPrice(market.max)}
                      </td>

                      <td className="px-5 py-4 text-right font-semibold text-[#344137]">
                        ৳{formatPrice((market.min + market.max) / 2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center text-sm text-gray-500">
              এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
            </div>
          )}

          <div className="border-t border-[#e4ebe4] bg-[#f7faf7] px-5 py-4 text-xs text-gray-500">
            * গড় দাম = (সর্বনিম্ন দাম + সর্বোচ্চ দাম) ÷ ২
          </div>
        </section>

        {/* Back Button */}
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-900"
          >
            <ArrowLeft size={16} />
            সব পণ্যে ফিরে যাও
          </Link>
        </div>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  price,
  color,
  icon,
}: {
  label: string;
  price: number;
  color: string;
  icon: string;
}) {
  return (
    <div className="rounded-xl border border-[#e5ece5] bg-white p-4 transition hover:shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-gray-500">{label}</p>
        <span className={`text-xl font-bold ${color}`}>{icon}</span>
      </div>

      <p className={`mt-3 text-xl font-bold ${color}`}>
        ৳{formatPrice(price)}
      </p>

      <p className="mt-1 text-xs text-gray-400">
        প্রতি এককের বাজারদর
      </p>
    </div>
  );
}
