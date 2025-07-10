import React, { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";

const Clients = () => {
  const { clients, fetchClients } = useContext(StoreContext);

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="p-6 bg-[#0a0f1a] min-h-screen text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Clients</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
          Add Client
        </button>
      </div>

      <div className="bg-[#1f2937] shadow rounded-lg p-4 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">All Clients</h3>
        {clients?.length > 0 ? (
          <ul className="divide-y divide-gray-800">
            {clients.map((client) => (
              <li key={client._id} className="py-3">
                <p className="font-medium text-gray-200">{client.name}</p>
                <p className="text-sm text-gray-400">{client.email} • {client.phone}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No clients found.</p>
        )}
      </div>
    </div>
  );
};

export default Clients;
