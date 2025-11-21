"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="h-screen w-full flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff4d6d] opacity-20 blur-[120px] rounded-full pointer-events-none" />

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 z-10"
            >
                Say It Without <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d6d] to-[#ff7a9e]">
                    Saying It.
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 z-10"
            >
                Create your personal link and receive anonymous messages from your friends, followers, and fans.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 z-10"
            >
                <Link href="/sign-up">
                    <button className="px-8 py-4 text-lg font-bold bg-[#ff4d6d] hover:bg-[#ff7a9e] text-white rounded-full transition-all shadow-[0_0_20px_rgba(255,77,109,0.4)] hover:shadow-[0_0_30px_rgba(255,77,109,0.6)] hover:-translate-y-1">
                        Create Your Account
                    </button>
                </Link>
                <Link href="/sign-in">
                    <button className="px-8 py-4 text-lg font-medium bg-[#1a1a1a] hover:bg-[#252525] text-white border border-gray-800 rounded-full transition-all hover:-translate-y-1">
                        Login to Dashboard
                    </button>
                </Link>
            </motion.div>
        </section>
    );
}
