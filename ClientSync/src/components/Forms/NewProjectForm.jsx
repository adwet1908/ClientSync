import React from "react";
import { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import api from "../../services/api";
import { toast } from "react-toastify";

const NewProjectForm = () => {
  const { clients, fetchClients, fetchProjects } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    clientId: "",
    status: "Pending",
    dueDate: "",
  });

  const statusOptions = ["Not Started", "In progress", "Completed", "Paused"];

  useEffect(() => {
    fetchClients();
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

    const response = await api.post("/project/create", formData);

    try {
      if (response.data.success) {
        toast.success("Project created successfully!");
        setFormData({
          title: "",
          description: "",
          clientId: "",
          status: "Pending",
          dueDate: "",
        });
        console.log(formData);
        fetchProjects();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error creating project");
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen flex justify-center items-start pt-24">
      <div className="bg-[#111827] text-gray-100 p-6 rounded-lg shadow max-w-xl mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 bg-[#1f2937] border border-gray-600 rounded"
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 bg-[#1f2937] border border-gray-600 rounded"
          />

          <select
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            className="w-full p-2 bg-[#1f2937] border border-gray-600 rounded"
          >
            <option value="" disabled>
              Select Client
            </option>
            {clients && clients.length > 0 ? (
              clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name} ({client.email})
                </option>
              ))
            ) : (
              <option disabled>No clients available</option>
            )}
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 bg-[#1f2937] border border-gray-600 rounded"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full p-2 bg-[#1f2937] border border-gray-600 rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition w-full py-2 rounded text-white"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProjectForm;
