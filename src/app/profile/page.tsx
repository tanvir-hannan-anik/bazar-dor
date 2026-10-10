
"use client";

import { authClient } from "@/lib/auth-client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [name, setName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) {
            toast.error("আপনার নাম লিখুন");
            return;
        }

        setIsSaving(true);

        try {
            const result = await authClient.updateUser({
                name: trimmedName,
            });

            if (result.error) {
                toast.error(
                    result.error.message || "নাম আপডেট করা যায়নি"
                );
                return;
            }

            setName(trimmedName);
            toast.success("নাম সফলভাবে আপডেট হয়েছে");
        } catch {
            toast.error("নাম আপডেট করার সময় সমস্যা হয়েছে");
        } finally {
            setIsSaving(false);
        }
    };

    const handleSignOut = async () => {
        setIsSigningOut(true);

        try {
            const result = await authClient.signOut();

            if (result.error) {
                toast.error(
                    result.error.message || "লগ আউট করা যায়নি"
                );
                return;
            }

            toast.success("সফলভাবে লগ আউট হয়েছে");
            router.push("/signin");
            router.refresh();
        } catch {
            toast.error("লগ আউট করার সময় সমস্যা হয়েছে");
        } finally {
            setIsSigningOut(false);
        }
    };

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f0f5f0]">
                <p className="text-sm text-gray-500">
                    প্রোফাইল লোড হচ্ছে...
                </p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f0f5f0] px-4">
                <h1 className="text-xl font-bold text-gray-800">
                    আপনার অ্যাকাউন্টে সাইন ইন করুন
                </h1>

                <p className="text-center text-sm text-gray-500">
                    প্রোফাইল দেখতে হলে আপনাকে লগ ইন করতে হবে।
                </p>

                <button
                    type="button"
                    onClick={() => router.push("/signin")}
                    className="rounded-lg bg-green-700 px-5 py-2.5 font-medium text-white transition hover:bg-green-800"
                >
                    সাইন ইন
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f0f5f0] px-4 py-8 sm:px-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#25332a]">
                        আমার প্রোফাইল
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন ও আপডেট করুন।
                    </p>
                </div>

                <div className="mb-6 flex flex-col justify-between gap-5 rounded-2xl border border-[#dfe7df] bg-white p-5 sm:flex-row sm:items-center sm:p-6">
                    <div className="flex min-w-0 items-center gap-4">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name || "User"}
                                className="h-14 w-14 shrink-0 rounded-full border border-gray-200 object-cover"
                            />
                        ) : (
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700">
                                {(user.name || "U")
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>
                        )}

                        <div className="min-w-0">
                            <h2 className="truncate text-lg font-semibold text-[#25332a]">
                                {user.name || "ব্যবহারকারী"}
                            </h2>

                            <p className="break-all text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="shrink-0 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSigningOut ? "লগ আউট হচ্ছে..." : "↩ লগ আউট"}
                    </button>
                </div>

                <div className="rounded-2xl border border-[#dfe7df] bg-white p-5 sm:p-6">
                    <h2 className="mb-6 text-lg font-semibold text-[#25332a]">
                        ব্যক্তিগত তথ্য
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="আপনার নাম লিখুন"
                                required
                                maxLength={100}
                                className="w-full rounded-lg border border-[#dfe7df] bg-white px-3 py-3 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                ইমেইল
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={user.email}
                                readOnly
                                className="w-full cursor-not-allowed rounded-lg border border-[#dfe7df] bg-gray-50 px-3 py-3 text-sm text-gray-500 outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white shadow-sm transition hover:bg-green-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSaving ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
