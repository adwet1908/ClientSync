import React, { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";

const InvoicesPage = () => {
  const { invoices, fetchInvoices } = useContext(StoreContext);

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    console.log(invoices);
  }, []);

  return (
    <div className="p-6 bg-[#0a0f1a] min-h-screen text-gray-200">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition">
          Add Invoice
        </button>
      </div>

      {/* Invoices List */}
      <div className="bg-[#111827] border border-gray-700 rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-semibold text-gray-100 mb-4">All Invoices</h2>

        {invoices && invoices.length > 0 ? (
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
                  <tr key={invoice.id} className="border-t border-gray-700 hover:bg-gray-900">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{invoice.clientId}</td>
                    <td className="px-4 py-3">₹ {invoice.totalAmount}</td>
                    <td className="px-4 py-3">{new Date(invoice.dueDate).toLocaleDateString()}</td>
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
        ) : (
          <p className="text-gray-400">No invoices found.</p>
        )}
      </div>
    </div>
  );
};

export default InvoicesPage;
