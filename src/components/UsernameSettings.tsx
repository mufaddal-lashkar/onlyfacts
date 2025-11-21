"use client";

import { useState } from "react";
import { Loader2, Check, X } from "lucide-react";

interface UsernameSettingsProps {
    initialUsername: string;
    onUsernameChange: (newUsername: string) => void;
}

export default function UsernameSettings({ initialUsername, onUsernameChange }: UsernameSettingsProps) {
    const [username, setUsername] = useState(initialUsername);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSave = async () => {
        if (username === initialUsername) {
            setIsEditing(false);
            return;
        }

        setIsLoading(true);
        setError("");
        setSuccess(false);

        try {
            const res = await fetch("/api/user/username", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to update username");
            }

            onUsernameChange(username);
            setSuccess(true);
            setIsEditing(false);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Username</h3>
                    <p className="text-sm text-gray-400">This is your unique handle on Only Facts.</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    {isEditing ? (
                        <div className="flex items-center gap-2 w-full">
                            <div className="relative w-full">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-black/30 border border-gray-700 rounded-lg py-2 pl-8 pr-4 text-white focus:outline-none focus:border-[#ff4d6d] transition-colors"
                                    placeholder="username"
                                />
                            </div>
                            <button
                                onClick={handleSave}
                                disabled={isLoading}
                                className="p-2 bg-[#ff4d6d] hover:bg-[#ff7a9e] text-white rounded-lg transition-colors disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setUsername(initialUsername);
                                    setError("");
                                }}
                                className="p-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-white">@{initialUsername}</span>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-sm text-[#ff4d6d] hover:text-[#ff7a9e] font-medium transition-colors"
                            >
                                Change
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2 text-right">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2 text-right">Username updated successfully!</p>}
        </div>
    );
}
