"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface AnalyticsChartProps {
    data: {
        date: string;
        count: number;
    }[];
}

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-[300px] bg-[#1a1a1a] border border-gray-800 rounded-2xl text-gray-500">
                No data available yet
            </div>
        );
    }

    return (
        <div className="h-[300px] w-full bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-white mb-6">Message Activity</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke="#666"
                        tick={{ fill: "#666" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        stroke="#666"
                        tick={{ fill: "#666" }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#0f0f0f",
                            border: "1px solid #333",
                            borderRadius: "8px",
                            color: "#fff",
                        }}
                        itemStyle={{ color: "#ff4d6d" }}
                    />
                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#ff4d6d"
                        strokeWidth={3}
                        dot={{ fill: "#ff4d6d", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: "#fff" }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
