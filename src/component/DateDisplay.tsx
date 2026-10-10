"use client";

import { useState } from "react";

export default function DateDisplay() {
    const [date] = useState(() =>
        new Date().toLocaleDateString("bn-BD", {
            dateStyle: "full",
        })
    );

    return (
        <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
            {date || "তারিখ লোড হচ্ছে..."}
        </p>
    );
}