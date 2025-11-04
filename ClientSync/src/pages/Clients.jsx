import React, { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { NavLink } from "react-router-dom";

const Clients = () => {
  const { clients, fetchClients } = useContext(StoreContext);

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-b from-[#050a15] via-[#0a1122] to-[#0e1830] text-gray-200 p-8 min-h-screen text-gray-200">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-wide mb-1">
            Clients
          </h1>
          <p className="text-gray-400 text-sm">Manage all your clients here</p>
        </div>

        <NavLink to="/clients/new">
          <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
            + Add Client
          </button>
        </NavLink>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5 hover:border-blue-500/40 transition-all">
          <p className="text-gray-400 text-sm mb-2">Total Clients</p>
          <h2 className="text-3xl font-semibold text-blue-400">
            {clients.length || 0}
          </h2>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5 hover:border-green-500/40 transition-all">
          <p className="text-gray-400 text-sm mb-2">Converted Leads</p>
          <h2 className="text-3xl font-semibold text-green-400">--</h2>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5 hover:border-yellow-500/40 transition-all">
          <p className="text-gray-400 text-sm mb-2">Pending Clients</p>
          <h2 className="text-3xl font-semibold text-yellow-400">--</h2>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-5 hover:border-purple-500/40 transition-all">
          <p className="text-gray-400 text-sm mb-2">Revenue</p>
          <h2 className="text-3xl font-semibold text-purple-400">--</h2>
        </div>
      </div>

      {/* Client List Section */}
      <div className="bg-[#111827] rounded-2xl border border-gray-800 shadow-md p-6">
        <h3 className="text-xl font-semibold text-white mb-5 flex items-center gap-2">
          All Clients
          <span className="text-sm text-gray-500 font-normal">
            ({clients.length || 0})
          </span>
        </h3>

        {clients?.length > 0 ? (
          <ul className="divide-y divide-gray-800">
            {clients.map((client) => (
              <li key={client._id}>
                <NavLink
                  to={`/clients/${client._id}`}
                  className="block py-3 px-3 rounded-lg hover:bg-[#1e293b] transition-all duration-150 ease-in-out hover:pl-4"
                >
                  <p className="font-medium text-gray-100 text-[15px]">
                    {client.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {client.email} • {client.phone}
                  </p>
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-10">
            No clients found. Add your first client to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default Clients;
