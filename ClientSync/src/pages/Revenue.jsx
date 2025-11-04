import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaArrowUp, FaArrowDown, FaRupeeSign } from "react-icons/fa";

// Dummy data (replace with backend API later)
const sampleRevenueData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 38000 },
  { month: "Mar", revenue: 54000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 49000 },
  { month: "Jun", revenue: 67000 },
];

export default function RevenuePage() {
  const [revenueData, setRevenueData] = useState(sampleRevenueData);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [monthlyChange, setMonthlyChange] = useState(0);

  useEffect(() => {
    const total = revenueData.reduce((sum, entry) => sum + entry.revenue, 0);
    setTotalRevenue(total);

    if (revenueData.length >= 2) {
      const last = revenueData[revenueData.length - 1].revenue;
      const prev = revenueData[revenueData.length - 2].revenue;
      const change = ((last - prev) / prev) * 100;
      setMonthlyChange(change);
    }
  }, [revenueData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050a15] via-[#0a1122] to-[#0e1830] text-gray-200 p-8">
      {/* Page Header */}
      <div className="flex flex-col mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
          Revenue Dashboard
        </h1>
        <p className="text-gray-400 text-sm">
          Track your financial performance month by month
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {/* Total Revenue */}
        <div className="bg-[#10182a]/60 border border-[#1e293b] backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-blue-800/30 transition">
          <h2 className="text-gray-400 text-sm mb-2">Total Revenue</h2>
          <p className="text-3xl font-semibold flex items-center gap-1 text-blue-400">
            <FaRupeeSign />
            {totalRevenue.toLocaleString()}
          </p>
        </div>

        {/* Monthly Change */}
        <div className="bg-[#10182a]/60 border border-[#1e293b] backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-blue-800/30 transition">
          <h2 className="text-gray-400 text-sm mb-2">Monthly Change</h2>
          <p
            className={`text-3xl font-semibold flex items-center gap-2 ${
              monthlyChange >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {monthlyChange >= 0 ? <FaArrowUp /> : <FaArrowDown />}
            {monthlyChange.toFixed(1)}%
          </p>
        </div>

        {/* Average per Client */}
        <div className="bg-[#10182a]/60 border border-[#1e293b] backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-blue-800/30 transition">
          <h2 className="text-gray-400 text-sm mb-2">Average / Client</h2>
          <p className="text-3xl font-semibold flex items-center gap-1 text-blue-400">
            <FaRupeeSign />
            {(totalRevenue / 6).toFixed(0)}
          </p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-[#10182a]/60 border border-[#1e293b] backdrop-blur-lg rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-white mb-4">
          Monthly Revenue Trend
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "10px",
              }}
              labelStyle={{ color: "#f8fafc" }}
            />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
