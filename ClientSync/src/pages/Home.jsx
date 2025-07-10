import React from "react";
import { quotes } from "../assets/quotes.js";
import RevenueGraph from "../components/RevenueGraph.jsx";
import PendingProjects from "../components/PendingProjects.jsx";
import PendingInvoices from "../components/PendingInvoices.jsx";

const Home = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const todaysQuote = quotes[randomIndex];

  return (
    <div className="p-6 bg-[#0a0f1a] min-h-screen text-gray-200">
      {/* Quote Section */}
      <div className="bg-[#111827] shadow-md rounded-lg p-6 mb-6 border border-gray-700">
        <h1 className="text-xl font-semibold text-gray-100 mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-gray-400 italic">"{todaysQuote}"</p>
      </div>

      {/* Revenue Chart */}
      <div className="bg-[#1f2937] border border-gray-700 shadow rounded-lg p-4 text-center mb-6">
        <h2 className="text-lg font-bold text-gray-100 mb-4">
          Revenue in 2025
        </h2>
        <RevenueGraph />
      </div>

      {/* Pending Sections */}
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="w-full md:w-1/2">
          <PendingProjects />
        </div>
        <div className="w-full md:w-1/2">
          <PendingInvoices />
        </div>
      </div>
    </div>
  );
};

export default Home;
