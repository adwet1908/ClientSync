import React, { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";

const Leads = () => {
  const { leads, fetchLeads } = useContext(StoreContext);

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="p-6 bg-[#0a0f1a] min-h-screen text-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-white">Leads Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Stats Cards */}
        <div className="bg-[#1f2937] shadow rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Total Leads</p>
          <h2 className="text-2xl font-bold text-blue-400">{leads?.length || 0}</h2>
        </div>
        <div className="bg-[#1f2937] shadow rounded-lg p-4 border border-gray-700">
          <p className="text-gray-400 text-sm">Converted Leads</p>
          <h2 className="text-2xl font-bold text-green-400">--</h2>
        </div>
      </div>

      <div className="mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
          Add Lead
        </button>
      </div>

      <div className="bg-[#1f2937] shadow rounded-lg p-4 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">All Leads</h3>
        {leads?.length > 0 ? (
          <ul className="divide-y divide-gray-800">
            {leads.map((lead) => (
              <li key={lead._id} className="py-3">
                <p className="font-medium text-gray-200">{lead.name}</p>
                <p className="text-sm text-gray-400">{lead.email} • {lead.phone}</p>
                <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                  {lead.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No leads available.</p>
        )}
      </div>
    </div>
  );
};

export default Leads;
