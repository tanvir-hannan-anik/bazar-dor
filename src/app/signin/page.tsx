"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const SignInPage = () => {
    const router = useRouter();

    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "Sign in failed!");
                return;
            }

            if (data) {
                toast.success("Signed in successfully!");
                router.push("/");
                router.refresh();
            }
        } catch {
            toast.error("Something went wrong. Please try again!");
        }
    };

    const handleSocialSignIn = async (
        provider: "google" | "github"
    ) => {
        try {
            const { error } = await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || `${provider} sign in failed!`);
            }
        } catch {
            toast.error(`${provider} sign in failed. Please try again!`);
        }
    };

    return (
        <div className="container mx-auto">
            <div className="min-h-screen bg-[#f1f5f0] px-4 py-8">
                <div className="mx-auto max-w-sm">
                    <h1 className="text-center text-2xl font-bold text-gray-800">
                        সাইন ইন
                    </h1>

                    <p className="mt-2 text-center text-sm text-gray-500">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রয়োজনীয় তথ্য দেখতে
                        অ্যাকাউন্টে ঢুকুন।
                    </p>

                    <div className="mt-6 rounded-2xl border border-gray-200 bg-white/70 p-5">
                        <form className="space-y-4" onSubmit={onSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    ইমেইল
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                    className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    পাসওয়ার্ড
                                </label>

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="আপনার পাসওয়ার্ড লিখুন"
                                    autoComplete="current-password"
                                    required
                                    className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-800"
                            >
                                সাইন ইন
                            </button>
                        </form>

                        <div className="my-4 flex items-center gap-3">
                            <div className="h-px flex-1 bg-gray-200" />
                            <span className="text-xs text-gray-500">
                                অথবা
                            </span>
                            <div className="h-px flex-1 bg-gray-200" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => handleSocialSignIn("google")}
                                className="rounded-lg border border-gray-200 px-2 py-2.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                <span className="mr-1 font-bold text-blue-600">
                                    G
                                </span>
                                Google দিয়ে লগইন
                            </button>

                            <button
                                type="button"
                                onClick={() => handleSocialSignIn("github")}
                                className="rounded-lg border border-gray-200 px-2 py-2.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                <span className="mr-1">●</span>
                                GitHub দিয়ে লগইন
                            </button>
                        </div>

                        <p className="mt-5 text-center text-sm text-gray-600">
                            অ্যাকাউন্ট নেই?{" "}
                            <Link
                                href="/signup"
                                className="font-medium text-green-700 hover:underline"
                            >
                                সাইন আপ করুন
                            </Link>
                        </p>
                    </div>

                    <Link
                        href="/"
                        className="mt-5 block text-center text-sm text-gray-500 hover:text-green-700"
                    >
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;