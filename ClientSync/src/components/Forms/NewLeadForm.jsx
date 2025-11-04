import React from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import { StoreContext } from "../../context/StoreContext";
import { useContext, useState, useEffect } from "react";

const NewLeadForm = () => {
  const { fetchLeads } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New",
  });

  const statusOptions = [
    "New",
    "Contacted",
    "Proposal Sent",
    "Converted",
    "Dead",
  ];

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/lead/create", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchLeads();
        setFormData({
          name: "",
          email: "",
          phone: "",
          status: "New",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen flex justify-center items-start pt-24">
      <div className="bg-[#111827] p-6 rounded-md shadow-md text-gray-100 w-full max-w-md mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">Create New Lead</h2>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={changeHandler}
            placeholder="Full Name"
            className="p-2 rounded bg-[#1f2937] border border-gray-600 focus:outline-none"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Email"
            className="p-2 rounded bg-[#1f2937] border border-gray-600 focus:outline-none"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={changeHandler}
            placeholder="Phone Number"
            className="p-2 rounded bg-[#1f2937] border border-gray-600 focus:outline-none"
          />

          <select
            name="status"
            value={formData.status}
            onChange={changeHandler}
            className="p-2 rounded bg-[#1f2937] border border-gray-600 text-gray-100"
          >
            {statusOptions.map((option) => (
              <option
                key={option}
                value={option}
                className="text-gray-100 bg-[#1f2937]"
              >
                {option}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded"
          >
            Create Lead
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewLeadForm;
