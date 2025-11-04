import { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import api from "../../services/api";
import { toast } from "react-toastify";

const NewInvoiceForm = () => {
  const { clients, fetchClients, allProjects, fetchProjects } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    clientId: "",
    projectId: "",
    services: "",
    dueDate: "",
    totalAmount: "",
    paymentMethod: "Razorpay",
  });

  useEffect(() => {
    fetchClients();
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      services: formData.services.split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      const res = await api.post("/invoice/create", payload);
      if (res.data.success) {
        toast.success("Invoice created successfully");
        setFormData({
          clientId: "",
          projectId: "",
          dueDate: "",
          totalAmount: "",
          paymentMethod: "Razorpay",
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Internal Server Error");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#111827] text-gray-100">
    <div className="w-full max-w-xl bg-[#1f2937] p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">
        Create New Invoice
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select Client */}
        <select
          name="clientId"
          value={formData.clientId}
          onChange={handleChange}
          className="w-full p-2 bg-[#111827] border border-gray-600 rounded focus:outline-none focus:border-indigo-500"
          required
        >
          <option value="">Select Client</option>
          {clients?.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name} ({client.email})
            </option>
          ))}
        </select>

        {/* Attach Project */}
        <select
          name="projectId"
          value={formData.projectId}
          onChange={handleChange}
          className="w-full p-2 bg-[#111827] border border-gray-600 rounded focus:outline-none focus:border-indigo-500"
        >
          <option value="">Attach Project (optional)</option>
          {allProjects?.map((project) => (
            <option key={project._id} value={project._id}>
              {project.title}
            </option>
          ))}
        </select>

        {/* Total Amount */}
        <input
          type="number"
          name="totalAmount"
          placeholder="Total Amount"
          value={formData.totalAmount}
          onChange={handleChange}
          className="w-full p-2 bg-[#111827] border border-gray-600 rounded focus:outline-none focus:border-indigo-500"
          required
        />

        {/* Payment Method */}
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full p-2 bg-[#111827] border border-gray-600 rounded focus:outline-none focus:border-indigo-500"
        >
          <option value="Razorpay">Razorpay</option>
          <option value="Stripe">Stripe</option>
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="UPI">UPI</option>
        </select>

        {/* Due Date */}
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="w-full p-2 bg-[#111827] border border-gray-600 rounded focus:outline-none focus:border-indigo-500"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 transition w-full py-2 rounded text-white font-semibold"
        >
          Create Invoice
        </button>
      </form>
    </div>
  </div>
);

};

export default NewInvoiceForm;
