"use client";

import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";

interface MessageCardProps {
    message: {
        _id: string;
        content: string;
        createdAt: string;
    };
    onDelete?: (id: string) => void;
}

export default function MessageCard({ message, onDelete }: MessageCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#1a1a1a] border border-gray-800 p-6 rounded-2xl shadow-lg hover:border-[#ff4d6d]/50 transition-colors group relative"
        >
            <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Anonymous
                </span>
                <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                </span>
            </div>

            <p className="text-lg text-gray-200 font-medium leading-relaxed">
                {message.content}
            </p>

            {onDelete && (
                <button
                    onClick={() => onDelete(message._id)}
                    className="absolute bottom-4 right-4 p-2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    aria-label="Delete message"
                >
                    <Trash2 size={18} />
                </button>
            )}
        </motion.div>
    );
}
