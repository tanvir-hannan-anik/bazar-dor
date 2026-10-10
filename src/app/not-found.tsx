import Link from "next/link";

const CategoryEmptyState = () => {
    return (
        <div className="flex min-h-[60vh] items-center justify-center p-5">
            <div className="w-full max-w-md rounded-2xl border border-[#e0e8e0] bg-[#fbfdfb] p-8 text-center shadow-sm">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-4xl">
                    🔍
                </div>

                <h2 className="mt-5 text-3xl font-bold text-[#263229]">
                    404
                </h2>

                <h3 className="mt-2 text-lg font-semibold text-[#263229]">
                    কোনো পণ্য পাওয়া যায়নি!
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#788078]">
                    এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক নয়।
                </p>

                <Link
                    href="/"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                >
                    হোম পেজে ফিরে যান →
                </Link>

            </div>
        </div>
    );
};

export default CategoryEmptyState;