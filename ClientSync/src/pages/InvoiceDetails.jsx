// src/pages/InvoiceDetailsPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const InvoiceDetails = () => {
  const navigate = useNavigate(); 
  const { id } = useParams();
  const { invoiceDetails, fetchInvoiceDetails, deleteInvoice } = useContext(StoreContext);

  useEffect(() => {
    fetchInvoiceDetails(id);
    console.log(invoiceDetails);
  }, [id]);

  const handleInvoiceDelete = () => {
    deleteInvoice(id);
    navigate('/invoices')
    setTimeout(() => {
      window.location.reload(); 
    },500); 
  };
  if (!invoiceDetails) return <p className="p-6 text-gray-400">Loading...</p>;

  return (
    <div className="p-6 bg-[#0a0f1a] min-h-screen text-gray-200">
      <Link
        to="/invoices"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back to Invoices
      </Link>

      <div className="bg-[#111827] border border-gray-700 rounded-lg p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Invoice Details</h1>
        <p>
          <strong>Client:</strong> {invoiceDetails.clientId?.name}
        </p>
        <p>
          <strong>Email:</strong> {invoiceDetails.clientId?.email}
        </p>
        <p>
          <strong>Amount:</strong> INR {invoiceDetails.totalAmount}
        </p>
        <p>
          <strong>Due Date:</strong>{" "}
          {new Date(invoiceDetails.dueDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Status:</strong> {invoiceDetails.status}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {invoiceDetails.description || "No details provided"}
        </p>
      </div>

      <div className="flex justify-start gap-6 mt-10">
        <button
          onClick={() => handleInvoiceDelete()}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all duration-200 ease-in-out"
        >
          Delete Invoice
        </button>

        <button className="px-6 py-3 rounded-xl bg-gray-800 text-white font-medium shadow-md hover:bg-gray-900 hover:shadow-lg active:scale-95 transition-all duration-200 ease-in-out">
          Client's Invoices (X)
        </button>
        <button className="px-6 py-3 rounded-xl bg-gray-800 text-white font-medium shadow-md hover:bg-gray-900 hover:shadow-lg active:scale-95 transition-all duration-200 ease-in-out">
          Send Reminder (X)
        </button>
      </div>
    </div>
  );
};

export default InvoiceDetails;
