"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters!");
            return;
        }

        try {
            const { data, error } = await authClient.signUp.email({
                name,
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "Signup failed!");
                return;
            }

            if (data) {
                toast.success("Account created successfully!");
                router.push("/");
            }
        } catch {
            toast.error("Something went wrong. Please try again!");
        }
    };

    return (
        <div className="container mx-auto">
            <div className="min-h-screen bg-[#f1f5f0] px-4 py-8">
                <div className="mx-auto max-w-sm">
                    <h1 className="text-center text-2xl font-bold text-gray-800">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mt-2 text-center text-sm text-gray-500">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত তথ্য দেখুন।
                    </p>

                    <div className="mt-6 rounded-2xl border border-gray-200 bg-white/70 p-5">
                        <form className="space-y-3.5" onSubmit={onSubmit}>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    নাম
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="যেমন: রহিম উদ্দিন"
                                    autoComplete="name"
                                    required
                                    className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                                />
                            </div>

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
                                    placeholder="কমপক্ষে ৮ অক্ষর"
                                    minLength={8}
                                    autoComplete="new-password"
                                    required
                                    className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-1.5 block text-sm font-medium text-gray-700"
                                >
                                    পাসওয়ার্ড নিশ্চিত করুন
                                </label>

                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="আবার লিখুন"
                                    minLength={8}
                                    autoComplete="new-password"
                                    required
                                    className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-800"
                            >
                                অ্যাকাউন্ট তৈরি করুন
                            </button>
                        </form>

                        <div className="my-4 flex items-center gap-3">
                            <div className="h-px flex-1 bg-gray-200" />
                            <span className="text-xs text-gray-500">
                                অথবা
                            </span>
                            <div className="h-px flex-1 bg-gray-200" />
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={async () => {
                                    try {
                                        const { error } =
                                            await authClient.signIn.social({
                                                provider: "google",
                                                callbackURL: "/",
                                            });

                                        if (error) {
                                            alert(error.message);
                                        }
                                    } catch {
                                        alert("Google sign-in failed!");
                                    }
                                }}
                                className="flex h-10 items-center justify-center gap-2 rounded border border-[#747775] bg-white px-3 text-sm font-medium text-[#1f1f1f] transition hover:shadow-md"
                            >
                                <span>🌐</span>
                                <span>Sign in with Google</span>
                            </button>

                            <button
                                type="button"
                                onClick={async () => {
                                    try {
                                        const { error } =
                                            await authClient.signIn.social({
                                                provider: "github",
                                                callbackURL: "/",
                                            });

                                        if (error) {
                                            alert(error.message);
                                        }
                                    } catch {
                                        alert("GitHub sign-in failed!");
                                    }
                                }}
                                className="flex h-10 items-center justify-center gap-2 rounded border border-[#747775] bg-white px-3 text-sm font-medium text-[#1f1f1f] transition hover:bg-gray-50 hover:shadow-md"
                            >
                                <svg
                                    className="h-5 w-5 shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                >
                                    <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.51-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.1.99 2.09.74.1-.72.39-1.21.71-1.49-2.47-.28-5.07-1.24-5.07-5.51 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.28-2.61 5.23-5.09 5.5.4.35.76 1.03.76 2.08v3.26c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                                </svg>

                                <span>Sign in with GitHub</span>
                            </button>
                        </div>

                        <p className="mt-5 text-center text-sm text-gray-600">
                            অ্যাকাউন্ট আছে?{" "}
                            <Link
                                href="/signin"
                                className="font-medium text-green-700 hover:underline"
                            >
                                সাইন ইন করুন
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

export default SignUpPage;