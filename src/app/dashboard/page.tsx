"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import MessageCard from "@/components/MessageCard";
import LinkToggle from "@/components/LinkToggle";
import UsernameSettings from "@/components/UsernameSettings";
import AnalyticsChart from "@/components/AnalyticsChart";
import { Loader2, RefreshCcw } from "lucide-react";


interface Message {
    _id: string;
    content: string;
    createdAt: string;
}

interface AnalyticsData {
    date: string;
    count: number;
}

export default function Dashboard() {
    const { user, isLoaded } = useUser();
    const [messages, setMessages] = useState<Message[]>([]);
    const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAcceptingMessages, setIsAcceptingMessages] = useState(true);
    const [username, setUsername] = useState("");

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [messagesRes, analyticsRes, profileRes] = await Promise.all([
                fetch("/api/messages"),
                fetch("/api/analytics"),
                fetch("/api/user/profile"),
            ]);

            if (messagesRes.ok) {
                const data = await messagesRes.json();
                setMessages(data.messages);
            }

            if (analyticsRes.ok) {
                const data = await analyticsRes.json();
                setAnalytics(data.analytics);
            }

            if (profileRes.ok) {
                const data = await profileRes.json();
                setUsername(data.username);
                setIsAcceptingMessages(data.isAcceptingMessages);
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isLoaded && user) {
            fetchData();
        }
    }, [isLoaded, user, fetchData]);

    const handleDelete = async (id: string) => {
        // Optimistic update
        setMessages(messages.filter((m) => m._id !== id));

        // In a real app, I would call DELETE API here
        // await fetch(`/ api / messages / ${ id } `, { method: "DELETE" });
    };

    const handleUsernameChange = (newUsername: string) => {
        setUsername(newUsername);
    };

    if (!isLoaded || isLoading) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-[#ff4d6d]">
                <Loader2 className="animate-spin w-10 h-10" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#0f0f0f] text-white pb-20">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 pt-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
                        <p className="text-gray-400">Welcome back, {user?.firstName || username || "User"}!</p>
                    </div>
                    <button
                        onClick={fetchData}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:bg-[#252525] transition-colors text-sm"
                    >
                        <RefreshCcw size={16} />
                        Refresh Data
                    </button>
                </div>

                <UsernameSettings initialUsername={username} onUsernameChange={handleUsernameChange} />
                <LinkToggle username={username} initialStatus={isAcceptingMessages} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold mb-4">Recent Messages</h2>
                        {messages.length === 0 ? (
                            <div className="text-center py-20 bg-[#1a1a1a] rounded-2xl border border-gray-800 border-dashed">
                                <p className="text-gray-500">No messages yet. Share your link!</p>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <MessageCard key={msg._id} message={msg} onDelete={handleDelete} />
                            ))
                        )}
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-4">Analytics</h2>
                        <AnalyticsChart data={analytics} />

                        <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6">
                            <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Total Messages</span>
                                    <span className="text-2xl font-bold text-[#ff4d6d]">{messages.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Views</span>
                                    <span className="text-2xl font-bold text-white">--</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
