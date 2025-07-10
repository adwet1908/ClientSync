import React from "react";

const PendingInvoices = () => {
  const pendingInvoicesJson = [
    {
      id: 1,
      client: "John Doe",
      amount: 5000,
      dueDate: "2025-07-10",
      status: "Unpaid",
    },
    {
      id: 2,
      client: "Acme Corp",
      amount: 12000,
      dueDate: "2025-07-12",
      status: "Unpaid",
    },
    {
      id: 3,
      client: "Jane Smith",
      amount: 3000,
      dueDate: "2025-07-15",
      status: "Unpaid",
    },
  ];

  return (
    <div className="mt-6 bg-[#1f1f1f] p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-white mb-4">
        Pending Invoices
      </h2>
      <ul className="space-y-3">
        {pendingInvoicesJson.map((invoice) => (
          <li
            key={invoice.id}
            className="text-gray-300 border-b border-gray-600 pb-2"
          >
            <div className="font-medium">Client: {invoice.client}</div>
            <div className="text-sm">Amount: ₹{invoice.amount}</div>
            <div className="text-sm">Due: {invoice.dueDate}</div>
            <div className="text-sm text-yellow-400">
              Status: {invoice.status}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingInvoices;
