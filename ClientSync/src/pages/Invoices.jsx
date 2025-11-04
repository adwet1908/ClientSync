import React, { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { NavLink } from "react-router-dom";
import InvoicesTable from "../components/InvoicesTable";

const Invoices = () => {
  const { invoices, fetchInvoices } = useContext(StoreContext);

  // Fetch all invoices once when page loads
  useEffect(() => {
    fetchInvoices();
    if (invoices.length > 0) {
      console.log("Invoices updated:", invoices);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050a15] via-[#0a1122] to-[#0e1830] text-gray-200 p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
            Invoices
          </h1>
          <p className="text-gray-400 text-sm">
            Manage and track all your billing records in one place
          </p>
        </div>

        <NavLink to="/invoice/new">
          <button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-blue-700/30 transition-all duration-300">
            + Add Invoice
          </button>
        </NavLink>
      </div>

      {/* Invoices Table Section */}
      <div className="bg-[#10182a]/60 border border-[#1e293b] backdrop-blur-lg rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">All Invoices</h2>
        </div>

        {invoices && invoices.length > 0 ? (
          <InvoicesTable invoices={invoices} />
        ) : (
          <p className="text-gray-400 italic">No invoices found.</p>
        )}
      </div>
    </div>
  );
};

export default Invoices;
