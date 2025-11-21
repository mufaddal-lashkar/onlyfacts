"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Copy, Check } from "lucide-react";

interface LinkToggleProps {
    username: string;
    initialStatus: boolean;
}

export default function LinkToggle({ username, initialStatus }: LinkToggleProps) {
    const [isEnabled, setIsEnabled] = useState(initialStatus);
    const [copied, setCopied] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== "undefined" ? window.location.origin : "");
    const url = `${baseUrl}/u/${username}`;

    const toggleStatus = async () => {
        const newStatus = !isEnabled;
        setIsEnabled(newStatus);

        try {
            await fetch("/api/user/status", {
                method: "PATCH",
                body: JSON.stringify({ isAcceptingMessages: newStatus }),
            });
        } catch (error) {
            console.error("Failed to update status", error);
            setIsEnabled(!newStatus); // Revert on error
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Your Public Link</h3>
                    <p className="text-sm text-gray-400">Share this link to receive messages.</p>
                </div>

                <div className="flex items-center gap-3 bg-black/30 p-2 rounded-lg border border-gray-800 w-full md:w-auto">
                    <code className="text-sm text-[#ff4d6d] truncate max-w-[200px] md:max-w-xs px-2">
                        {url}
                    </code>
                    <button
                        onClick={copyToClipboard}
                        className="p-2 hover:bg-white/10 rounded-md transition-colors text-gray-400 hover:text-white"
                    >
                        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${isEnabled ? "text-green-500" : "text-gray-500"}`}>
                        {isEnabled ? "Active" : "Disabled"}
                    </span>
                    {/* Custom Switch Implementation since we don't have shadcn yet */}
                    <button
                        onClick={toggleStatus}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${isEnabled ? "bg-[#ff4d6d]" : "bg-gray-700"
                            }`}
                    >
                        <motion.div
                            animate={{ x: isEnabled ? 24 : 0 }}
                            className="w-4 h-4 bg-white rounded-full shadow-sm"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
