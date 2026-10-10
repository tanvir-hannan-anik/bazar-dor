const Loading = () => {
    return (
        <section className="min-h-screen animate-pulse bg-[#f0f5f0] p-5">
            <div className="mx-auto max-w-7xl space-y-4">

                {/* Category Header Skeleton */}
                <div className="flex items-center gap-3 rounded-2xl border border-[#e0e8e0] bg-[#fbfdfb] p-4">
                    <div className="h-12 w-12 rounded-xl bg-gray-200" />

                    <div className="flex-1 space-y-2">
                        <div className="h-5 w-36 rounded-md bg-gray-200" />
                        <div className="h-3 w-56 max-w-full rounded-md bg-gray-200" />
                    </div>
                </div>

                {/* Sorting Skeleton */}
                <div className="flex justify-end rounded-2xl border border-[#e0e8e0] bg-[#fbfdfb] p-3">
                    <div className="h-9 w-44 rounded-lg bg-gray-200" />
                </div>

                {/* Product Count Skeleton */}
                <div className="h-3 w-40 rounded-md bg-gray-200" />

                {/* Product Cards Skeleton */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-[#e0e8e0] bg-[#fbfdfb] p-3.5"
                        >
                            {/* Product Information */}
                            <div className="mb-4 flex items-center gap-2.5">
                                <div className="h-11 w-11 shrink-0 rounded-xl bg-gray-200" />

                                <div className="flex-1 space-y-2">
                                    <div className="h-4 w-28 max-w-full rounded-md bg-gray-200" />
                                    <div className="h-3 w-16 rounded-md bg-gray-200" />
                                </div>
                            </div>

                            {/* Price and Change */}
                            <div className="flex items-end justify-between gap-2">
                                <div className="space-y-2">
                                    <div className="h-3 w-16 rounded-md bg-gray-200" />
                                    <div className="h-5 w-28 rounded-md bg-gray-200" />
                                </div>

                                <div className="h-6 w-14 rounded-full bg-gray-200" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Loading;