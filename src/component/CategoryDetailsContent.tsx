"use client";

import React, { useMemo, useState } from "react";

interface Product {
    id: number;
    slug?: string;
    name?: string;
    nameBn?: string;
    category: string | { nameBn?: string };
    categoryNameBn?: string;
    categoryIcon?: string;
    image?: string;
    unit?: string;
    today: number;
    yesterday: number;
    lastWeek?: number;
    lastMonth?: number;
    change?: {
        dir?: string;
        pct?: number;
    };
}

type CategoryDetailsData = Product[] | { data?: Product[] } | null | undefined;

const CategoryDetailsContent = ({
    data,
}: {
    data?: CategoryDetailsData;
}) => {
    const [sortBy, setSortBy] = useState("default");

    // Handle different API response structures
    const products = useMemo<Product[]>(() => {
        if (Array.isArray(data)) {
            return data;
        }

        if (
            data &&
            typeof data === "object" &&
            "data" in data &&
            Array.isArray(data.data)
        ) {
            return data.data;
        }

        return [];
    }, [data]);

    // Dynamic category information
    const categoryName =
        products[0]?.categoryNameBn ||
        (typeof products[0]?.category === "object" &&
            products[0]?.category !== null
            ? products[0].category.nameBn
            : undefined) ||
        "পণ্যের তালিকা";

    const categoryIcon =
        products[0]?.categoryIcon ||
        products[0]?.image ||
        "🛒";

    // Sorting
    const sortedProducts = useMemo(() => {
        const items = [...products];

        switch (sortBy) {
            case "price-low":
                return items.sort(
                    (a, b) => Number(a.today) - Number(b.today)
                );

            case "price-high":
                return items.sort(
                    (a, b) => Number(b.today) - Number(a.today)
                );

            case "change-high":
                return items.sort(
                    (a, b) =>
                        Number(b.change?.pct || 0) -
                        Number(a.change?.pct || 0)
                );

            default:
                return items;
        }
    }, [products, sortBy]);

    return (
        <section className="min-h-screen bg-[#f0f5f0] p-5">
            <div className="mx-auto max-w-7xl space-y-4">

                {/* Category Header */}
                <div className="flex items-center gap-3 rounded-2xl border border-[#e0e8e0] bg-[#fbfdfb] p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
                        {categoryIcon}
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-[#263229]">
                            {categoryName}
                        </h2>

                        <p className="text-xs text-[#788078]">
                            প্রতিটি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </div>

                {/* Sorting */}
                <div className="flex items-center justify-end rounded-2xl border border-[#e0e8e0] bg-[#fbfdfb] p-3">
                    <label
                        htmlFor="sort"
                        className="mr-2 text-xs text-[#788078]"
                    >
                        সাজান
                    </label>

                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="rounded-lg border border-[#d5ddd5] bg-transparent px-3 py-2 text-xs text-[#263229] outline-none"
                    >
                        <option value="default">ডিফল্ট</option>
                        <option value="price-low">দাম: কম থেকে বেশি</option>
                        <option value="price-high">দাম: বেশি থেকে কম</option>
                        <option value="change-high">
                            দাম বৃদ্ধি: বেশি থেকে কম
                        </option>
                    </select>
                </div>

                {/* Product Count */}
                <p className="text-xs text-[#788078]">
                    মোট {sortedProducts.length.toLocaleString("bn-BD")}টি
                    পণ্য দেখানো হচ্ছে
                </p>

                {/* Product Cards */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedProducts.map((item) => {
                        const today = Number(item.today ?? 0);
                        const pct = Number(item.change?.pct ?? 0);
                        const direction = item.change?.dir ?? "flat";

                        const isUp = direction === "up";
                        const isDown = direction === "down";

                        const unit =
                            item.unit === "kg"
                                ? "কেজি"
                                : item.unit || "একক";

                        return (
                            <article
                                key={item.id ?? item.slug}
                                className="rounded-2xl border border-[#e0e8e0] bg-[#fbfdfb] p-3.5 transition duration-200 hover:-translate-y-0.5 hover:border-[#c6d8c8] hover:shadow-sm"
                            >
                                {/* Product Information */}
                                <div className="mb-3 flex items-center gap-2.5">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
                                        {item.image || item.categoryIcon || "🛒"}
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="truncate text-sm font-bold text-[#263229]">
                                            {item.nameBn || item.name || "পণ্যের নাম"}
                                        </h3>

                                        <p className="mt-0.5 text-xs text-[#788078]">
                                            প্রতি {unit}
                                        </p>
                                    </div>
                                </div>

                                {/* Price and Change */}
                                <div className="flex items-end justify-between gap-2">
                                    <div>
                                        <p className="mb-1 text-[11px] text-[#788078]">
                                            আজকের দাম
                                        </p>

                                        <p className="text-base font-bold text-[#263229]">
                                            {today.toLocaleString("bn-BD")} টাকা
                                        </p>
                                    </div>

                                    <span
                                        className={`mb-0.5 inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${isUp
                                                ? "bg-[#fceeee] text-[#df4141]"
                                                : isDown
                                                    ? "bg-[#edf7ef] text-[#269653]"
                                                    : "bg-[#f0f3f0] text-[#697269]"
                                            }`}
                                    >
                                        {isUp ? "▲" : isDown ? "▼" : "—"}

                                        {Math.abs(pct).toLocaleString("bn-BD", {
                                            maximumFractionDigits: 1,
                                        })}
                                        %
                                    </span>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Empty State */}
                {sortedProducts.length === 0 && (
                    <div className="rounded-2xl border border-[#e0e8e0] bg-[#fbfdfb] py-12 text-center">
                        <p className="text-sm text-[#788078]">
                            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CategoryDetailsContent;
