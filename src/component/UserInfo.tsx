
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const UserInfo = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    return (
        <div className="flex items-center gap-2">
            {user ? (
                <>
                    <Link
                        href="/profile"
                        className="flex items-center gap-2 rounded-lg px-2 py-2 transition hover:bg-green-50"
                    >
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name || "User"}
                                width={32}
                                height={32}
                                className="h-8 w-8 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
                                {(user.name || "U").charAt(0).toUpperCase()}
                            </div>
                        )}

                        <span className="hidden max-w-28 truncate text-sm font-medium text-gray-700 sm:block">
                            {user.name || "ব্যবহারকারী"}
                        </span>
                    </Link>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="rounded-lg bg-green-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                        লগ আউট
                    </button>
                </>
            ) : (
                <>
                    <Link
                        href="/signin"
                        className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-green-50"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/signup"
                        className="rounded-lg bg-green-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-800"
                    >
                        সাইন আপ
                    </Link>
                </>
            )}
        </div>
    );
};

export default UserInfo;
