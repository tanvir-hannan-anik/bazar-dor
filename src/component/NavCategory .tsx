"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface NavCategory {
    id: number;
    icon: string;
    nameBn: string;
    category: string;
}

const NavCategoryPage = () => {
    const [data, setData] = useState<NavCategory[]>([]);
    const pathname = usePathname();

    useEffect(() => {
        const getCategories = async () => {
            const res = await fetch(
                "https://openapi.programming-hero.com/api/bazardor/categories"
            );
            const json = await res.json();
            const categories = Array.isArray(json) ? json : json?.data ?? [];
            setData(categories);
        };

        getCategories();
    }, []);

    return (
        <div className="flex items-center gap-6 p-5 border-b border-gray-200">
            {data.map((n) => (
                <Link
                    href={`/category/${n.id}`}
                    key={n.id}
                    className={`rounded-lg px-3 py-2 ${
                        pathname === `/category/${n.id}`
                            ? "bg-green-500 text-white"
                            : "text-gray-700 hover:bg-green-100"
                    }`}
                >
                    <span>{n.icon}</span>{" "}
                    <span>{n.nameBn}</span>
                </Link>
            ))}
        </div>
    );
};

export default NavCategoryPage;