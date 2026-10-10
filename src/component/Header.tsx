import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NavCategoryPage from './NavCategory ';

const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
})

const HeaderPage = () => {
    return (
        <div className="container mx-auto px-4">
            <header className="flex items-center justify-between gap-4 border-b border-gray-200 py-4">
                <div className="flex items-center gap-3">
                    <Link href="/" className="shrink-0">
                        <Image
                            src="/logo-icon.png"
                            alt="বাজার দর"
                            width={45}
                            height={45}
                            priority
                            className="h-11.25 w-11.25 rounded-xl bg-green-800 p-2.5 object-contain"
                        />
                    </Link>

                    <div>
                        <h1 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                            বাজার <span className="text-green-700">দর</span>
                        </h1>
                        <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                            {date}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <button className="rounded-lg border border-green-700 px-3 py-2 text-sm font-semibold text-green-800 transition hover:bg-green-50 sm:px-5">
                        সাইন ইন
                    </button>

                    <button className="rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 sm:px-5">
                        সাইন আপ
                    </button>
                </div>
            </header>
            <NavCategoryPage></NavCategoryPage>
        </div>
    );
};

export default HeaderPage;