import React, { useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewClientForm = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    clientType: "", 
    billingAddress: "",
    phone: "",
    industry: "",
    averageBudget: "",
    notes: "",
    website: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/client/add", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          clientType: "", 
          billingAddress: "",
          industry: "",
          averageBudget: "",
          notes: "",
          website: "",
        });

        navigate('/clients')
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error creating client");
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen flex justify-center items-start pt-24">

      <div className="bg-[#111827] text-gray-100 p-10 rounded-lg shadow max-w-xl mx-auto mt-0 md:mt-4">
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Add New Client
        </h2>

        {/* Client Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name (required) */}
          <input
            type="text"
            name="name"
            placeholder="Client Name *"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 bg-[#1f2937] border border-gray-600 rounded focus:outline-none focus:border-indigo-500"
          />

          {/* Email (required) */}
          <input
            type="email"
            name="email"
            placeholder="Client Email *"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 bg-[#1f2937] border border-gray-600 rounded focus:outline-none focus:border-indigo-500"
          />

          {/* Phone (required) */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number *"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 bg-[#1f2937] border border-gray-600 rounded focus:outline-none focus:border-indigo-500"
          />
          {/* client type */}
          <select
            type="tel"
            name="clientType"
            placeholder="Client Type *"
            value={formData.clientType}
            onChange={handleChange}
            required
            className="w-full p-2 bg-[#1f2937] border border-gray-600 rounded focus:outline-none focus:border-indigo-500"
          >
            <option value="Individual">Individual</option>
            <option value="Startup">Startup</option>
            <option value="Corporation">Corporation</option>
          </select>

          {/* Billing Address (required) */}
          <textarea
            name="billingAddress"
            placeholder="Billing Address *"
            value={formData.billingAddress}
            onChange={handleChange}
            required
            rows={3}
            className="w-full p-2 bg-[#1f2937] border border-gray-600 rounded focus:outline-none focus:border-indigo-500"
          />

          {/* Industry (required) */}
          {/* Industry (required) */}
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
            className="w-full p-2 bg-[#1f2937] border border-gray-600 rounded focus:outline-none focus:border-indigo-500 text-gray-300"
          >
            <option value="">Select Industry *</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance & Banking">Finance & Banking</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Retail & E-commerce">Retail & E-commerce</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Marketing & Advertising">
              Marketing & Advertising
            </option>
            <option value="Media & Entertainment">Media & Entertainment</option>
            <option value="Travel & Hospitality">Travel & Hospitality</option>
            <option value="Construction & Engineering">
              Construction & Engineering
            </option>
            <option value="Logistics & Transportation">
              Logistics & Transportation
            </option>
            <option value="Legal Services">Legal Services</option>
            <option value="Non-Profit & NGOs">Non-Profit & NGOs</option>
            <option value="Government & Public Sector">
              Government & Public Sector
            </option>
            <option value="Energy & Utilities">Energy & Utilities</option>
            <option value="Food & Beverage">Food & Beverage</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Fashion & Apparel">Fashion & Apparel</option>
            <option value="Automotive">Automotive</option>
            <option value="Human Resources / Recruitment">
              Human Resources / Recruitment
            </option>
            <option value="Consulting">Consulting</option>
            <option value="Telecommunications">Telecommunications</option>
            <option value="Gaming">Gaming</option>
            <option value="Design & Creative Services">
              Design & Creative Services
            </option>
          </select>

          {/* Optional Section */}
          <div className="border-t border-gray-700 pt-4 mt-6">
            <h3 className="text-gray-400 text-sm mb-2">Optional Details</h3>

            {/* Average Budget */}
            <input
              type="number"
              name="averageBudget"
              placeholder="Average Budget (₹)"
              value={formData.averageBudget}
              onChange={handleChange}
              className="w-full p-2 bg-[#1f2937] border border-gray-600 rounded focus:outline-none focus:border-indigo-500 mb-3"
            />

            {/* Website */}
            <input
              type="url"
              name="website"
              placeholder="Website"
              value={formData.website}
              onChange={handleChange}
              className="w-full p-2 bg-[#1f2937] border border-gray-600 rounded focus:outline-none focus:border-indigo-500 mb-3"
            />

            {/* Notes */}
            <textarea
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 bg-[#1f2937] border border-gray-600 rounded focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 transition w-full py-2 rounded text-white font-semibold mt-4"
          >
            Add Client
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewClientForm;
