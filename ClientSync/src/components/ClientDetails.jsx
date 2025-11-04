import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const ClientDetails = () => {
  const { id } = useParams();
  const {clientDetails, fetchClientDetails, clientDelete} = useContext(StoreContext); 
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchClientDetails(id);
  }, [id]);

  const handleClientDelete = () => {
    clientDelete(id); 
    navigate('/clients'); 
    setTimeout(() => {
      window.location.reload(); 
    },2000)
  }

  // if data still loading
  if (!clientDetails) {
    return (
      <div className="p-6 bg-[#0a0f1a] min-h-screen text-gray-300 flex items-center justify-center">
        <p>Loading client details...</p>
      </div>
    );
  }

  // main UI
  return (
    <div className="p-6 bg-[#0a0f1a] min-h-screen text-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Client Details</h1>
        <NavLink
          to="/clients"
          className="bg-gray-700 text-gray-200 px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Back to Clients
        </NavLink>
      </div>

      {/* Client Info Card */}
      <div className="bg-[#1f2937] p-6 rounded-lg shadow border border-gray-700 mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">{clientDetails.name}</h2>
        <p className="text-gray-400 mb-1">Email: {clientDetails.email}</p>
        <p className="text-gray-400 mb-1">Phone: {clientDetails.phone}</p>
        <p className="text-gray-400 mb-1">Company: {clientDetails.industry || "N/A"}</p>
        <p className="text-gray-400">Address: {clientDetails.billingAddress || "N/A"}</p>
      </div>

      <button onClick={() => handleClientDelete()} className="px-3 py-4 bg-blue-600 rounded-lg font-medium shadow-md hover:bg-blue-700 ease-in-out">Delete Client</button>
    </div>
  );
};

export default ClientDetails;
