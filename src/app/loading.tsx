import React from 'react';

const LoadingPage = () => {
    return (
        <div>
            <div className="min-h-screen animate-pulse bg-[#f7f9f5]">
                {/* Navbar Skeleton */}
                <header className="border-b border-gray-200 bg-white">
                    <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
                        <div className="h-10 w-32 rounded-lg bg-gray-200" />

                        <div className="hidden flex-1 justify-center md:flex">
                            <div className="h-10 w-full max-w-md rounded-xl bg-gray-200" />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden h-9 w-20 rounded-lg bg-gray-200 sm:block" />
                            <div className="h-10 w-10 rounded-full bg-gray-200" />
                        </div>
                    </div>
                </header>

                <main className="container mx-auto space-y-8 px-4 py-6">
                    {/* Hero Section Skeleton */}
                    <section className="grid gap-6 overflow-hidden rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:items-center md:p-10">
                        <div className="space-y-4">
                            <div className="h-4 w-28 rounded bg-green-100" />
                            <div className="h-8 w-full max-w-md rounded-lg bg-gray-200" />
                            <div className="h-6 w-4/5 rounded-lg bg-gray-200" />

                            <div className="space-y-2 pt-2">
                                <div className="h-3 w-full rounded bg-gray-100" />
                                <div className="h-3 w-5/6 rounded bg-gray-100" />
                            </div>

                            <div className="h-11 w-36 rounded-xl bg-green-100" />
                        </div>

                        <div className="h-48 rounded-xl bg-gray-200 md:h-64" />
                    </section>

                    {/* Section Heading Skeleton */}
                    <section className="space-y-5">
                        <div className="flex items-center justify-between gap-4">
                            <div className="space-y-2">
                                <div className="h-6 w-44 rounded bg-gray-200" />
                                <div className="h-3 w-56 max-w-full rounded bg-gray-100" />
                            </div>

                            <div className="h-9 w-24 rounded-lg bg-gray-200" />
                        </div>

                        {/* Category Skeleton */}
                        <div className="flex gap-3 overflow-hidden">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="min-w-24 flex-1 rounded-xl border border-gray-100 bg-white p-4"
                                >
                                    <div className="mx-auto h-10 w-10 rounded-full bg-gray-200" />
                                    <div className="mx-auto mt-3 h-3 w-16 rounded bg-gray-200" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Product Cards Skeleton */}
                    <section className="space-y-5">
                        <div className="h-6 w-48 rounded bg-gray-200" />

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                                >
                                    <div className="h-32 bg-gray-200 sm:h-44" />

                                    <div className="space-y-3 p-3 sm:p-4">
                                        <div className="h-3 w-20 rounded bg-green-100" />
                                        <div className="h-4 w-full rounded bg-gray-200" />
                                        <div className="h-3 w-3/4 rounded bg-gray-100" />

                                        <div className="flex items-center justify-between gap-2 pt-2">
                                            <div className="h-5 w-16 rounded bg-gray-200" />
                                            <div className="h-8 w-8 rounded-lg bg-green-100" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Bottom Section Skeleton */}
                    <section className="rounded-2xl border border-gray-100 bg-white p-5">
                        <div className="h-5 w-40 rounded bg-gray-200" />

                        <div className="mt-4 space-y-3">
                            <div className="h-3 w-full rounded bg-gray-100" />
                            <div className="h-3 w-5/6 rounded bg-gray-100" />
                            <div className="h-3 w-2/3 rounded bg-gray-100" />
                        </div>
                    </section>
                </main>

                {/* Footer Skeleton */}
                <footer className="mt-10 border-t border-gray-200 bg-white px-4 py-8">
                    <div className="container mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="h-5 w-32 rounded bg-gray-200" />
                        <div className="h-4 w-48 max-w-full rounded bg-gray-100" />
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default LoadingPage;