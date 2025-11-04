import React, { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { NavLink } from "react-router-dom";

const Leads = () => {
  const { leads, fetchLeads } = useContext(StoreContext);

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-b from-[#050a15] via-[#0a1122] to-[#0e1830] text-gray-200 p-8 min-h-screen text-gray-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-wide mb-1">
            Leads Overview
          </h1>
          <p className="text-sm text-gray-400">
            Manage incoming leads, convert them into clients, and track status.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Stat mini-cards (compact) */}
          <div className="hidden md:flex gap-4">
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-4 text-center">
              <p className="text-gray-400 text-xs uppercase tracking-wide">Total Leads</p>
              <p className="text-2xl font-semibold text-blue-400 mt-1">
                {leads?.length || 0}
              </p>
            </div>
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-4 text-center">
              <p className="text-gray-400 text-xs uppercase tracking-wide">Converted</p>
              <p className="text-2xl font-semibold text-green-400 mt-1">--</p>
            </div>
          </div>

          {/* Primary Action Button */}
          <NavLink to="/leads/new">
            <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
              + Add Lead
            </button>
          </NavLink>
        </div>
      </div>

      {/* Stats row (mobile visible) */}
      <div className="grid grid-cols-2 md:hidden gap-4 mb-6">
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wide">Total Leads</p>
          <p className="text-2xl font-semibold text-blue-400 mt-1">
            {leads?.length || 0}
          </p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wide">Converted</p>
          <p className="text-2xl font-semibold text-green-400 mt-1">--</p>
        </div>
      </div>

      {/* Leads list container */}
      <div className="bg-[#111827] rounded-2xl border border-gray-800 shadow-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold text-white">All Leads</h3>
          <span className="text-sm text-gray-500">({leads?.length || 0})</span>
        </div>

        {leads?.length > 0 ? (
          <ul className="divide-y divide-gray-800">
            {leads.map((lead) => (
              <li key={lead._id}>
                <NavLink
                  to={`/leads/${lead._id}`}
                  className="block py-4 px-4 rounded-lg hover:bg-[#1e293b] transition-all duration-150 ease-in-out flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                >
                  <div>
                    <p className="font-medium text-gray-100 text-lg">{lead.name}</p>
                    <p className="text-sm text-gray-400">{lead.email} • {lead.phone}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full font-medium">
                      {lead.status || "New"}
                    </span>
                    <div className="hidden md:flex flex-col text-right">
                      <span className="text-xs text-gray-400">Added</span>
                      <span className="text-sm text-gray-200">
                        {new Date(lead.createdAt || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-10">
            No leads available. Click <span className="font-medium text-white">Add Lead</span> to create one.
          </p>
        )}
      </div>
    </div>
  );
};

export default Leads;
