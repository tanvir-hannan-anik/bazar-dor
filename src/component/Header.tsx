import Image from "next/image";
import Link from "next/link";

import UserInfo from "./UserInfo";
import DateDisplay from "./DateDisplay";
import NavCategoryPage from "./NavCategory ";

const HeaderPage = () => {
    return (
        <div className="container mx-auto px-4">
            <header className="flex items-center justify-between gap-3 border-b border-gray-200 py-4">
                <div className="flex min-w-0 items-center gap-3">
                    <Link href="/" className="shrink-0">
                        <Image
                            src="/logo-icon.png"
                            alt="বাজার দর"
                            width={45}
                            height={45}
                            priority
                            className="h-11 w-11 rounded-xl bg-green-800 p-2.5 object-contain"
                        />
                    </Link>

                    <div className="min-w-0">
                        <h1 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                            বাজার <span className="text-green-700">দর</span>
                        </h1>

                        <DateDisplay />
                    </div>
                </div>

                <UserInfo />
            </header>

            <NavCategoryPage />
        </div>
    );
};

export default HeaderPage;