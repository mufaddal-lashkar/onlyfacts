"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Send, Loader2, CheckCircle } from "lucide-react";

export default function PublicProfile() {
    const params = useParams();
    const username = params.username as string;

    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState("");
    const [isValidUser, setIsValidUser] = useState(true); // Assume true for now, would verify with API
    const [isAccepting, setIsAccepting] = useState(true); // Assume true for now

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSending(true);
        setError("");

        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, content: message }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to send message");
            }

            setIsSent(true);
            setMessage("");
            setTimeout(() => setIsSent(false), 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSending(false);
        }
    };

    if (!isValidUser) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">User Not Found</h1>
                    <p className="text-gray-400">The user you are looking for does not exist.</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#0f0f0f] text-white relative flex flex-col">
            <Navbar />

            <div className="flex-1 flex items-center justify-center px-4">
                <div className="max-w-lg w-full">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">
                            Send a message to <span className="text-[#ff4d6d]">@{username}</span>
                        </h1>
                        <p className="text-gray-400">
                            It's anonymous. They won't know it's you.
                        </p>
                    </div>

                    {!isAccepting ? (
                        <div className="bg-[#1a1a1a] border border-gray-800 p-8 rounded-2xl text-center">
                            <p className="text-xl font-medium text-gray-300">
                                This user is not accepting messages right now.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-[#1a1a1a] border border-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                            {/* Success Overlay */}
                            <AnimatePresence>
                                {isSent && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 bg-[#1a1a1a] z-10 flex flex-col items-center justify-center text-center p-6"
                                    >
                                        <motion.div
                                            initial={{ scale: 0.5 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200 }}
                                        >
                                            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                        <p className="text-gray-400">Send another one?</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Say something nice..."
                                        className="w-full h-40 bg-black/30 border border-gray-700 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#ff4d6d] transition-colors resize-none"
                                        required
                                    />
                                </div>

                                {error && (
                                    <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSending || !message.trim()}
                                    className="w-full py-4 bg-[#ff4d6d] hover:bg-[#ff7a9e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,77,109,0.3)] hover:shadow-[0_0_30px_rgba(255,77,109,0.5)]"
                                >
                                    {isSending ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <>
                                            Send Message <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}

                    <div className="mt-12 text-center">
                        <p className="text-gray-500 text-sm mb-4">
                            Want to receive anonymous messages too?
                        </p>
                        <a href="/" className="text-white font-bold hover:text-[#ff4d6d] transition-colors">
                            Get your own link →
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
