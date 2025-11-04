// src/components/InvoicesTable.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const InvoicesTable = ({ invoices }) => {
  const navigate = useNavigate();

  // Handle row click
  const handleRowClick = (id) => {
    navigate(`/invoices/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-gray-800 text-gray-300">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Client</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Due Date</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr
              key={invoice._id}
              className="border-t border-gray-700 hover:bg-gray-900 cursor-pointer transition"
              onClick={() => handleRowClick(invoice._id)}
            >
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">{invoice.clientId?.name || "N/A"}</td>
              <td className="px-4 py-3">₹ {invoice.totalAmount}</td>
              <td className="px-4 py-3">
                {new Date(invoice.dueDate).toLocaleDateString()}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    invoice.status === "Paid"
                      ? "bg-green-600 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {invoice.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesTable;
