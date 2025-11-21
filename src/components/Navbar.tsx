"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";


export default function Navbar() {
    const { isSignedIn } = useUser();

    return (
        <nav className="w-full py-4 px-6 flex justify-between items-center bg-transparent absolute top-0 z-50">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                Only<span className="text-[#ff4d6d]">Facts</span>
            </Link>

            <div className="flex items-center gap-4">
                {isSignedIn ? (
                    <>
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block"
                        >
                            Dashboard
                        </Link>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10 border-2 border-[#ff4d6d]"
                                }
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Link href="/sign-in">
                            <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                Login
                            </button>
                        </Link>
                        <Link href="/sign-up">
                            <button className="px-5 py-2 text-sm font-bold bg-[#ff4d6d] hover:bg-[#ff7a9e] text-white rounded-full transition-all shadow-[0_0_15px_rgba(255,77,109,0.5)] hover:shadow-[0_0_25px_rgba(255,77,109,0.7)]">
                                Get Started
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
