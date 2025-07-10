import React, { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";

const Projects = () => {
  const { allProjects, fetchProjects } = useContext(StoreContext);

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6 bg-[#0a0f1a] min-h-screen text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
          Add Project
        </button>
      </div>

      <div className="bg-[#1f2937] shadow rounded-lg p-4 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">All Projects</h3>
        {allProjects?.length > 0 ? (
          <ul className="divide-y divide-gray-800">
            {allProjects.map((project) => (
              <li key={project._id} className="py-3">
                <p className="text-gray-200 font-medium">{project.title}</p>
                <p className="text-sm text-gray-400">{project.description}</p>
                <p className="text-xs text-gray-500">
                  Due: {new Date(project.dueDate).toLocaleDateString()}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                  project.status === "In progress" ? "bg-yellow-500" :
                  project.status === "Completed" ? "bg-green-500" : "bg-gray-500"
                } text-white`}>
                  {project.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No projects available.</p>
        )}
      </div>
    </div>
  );
};

export default Projects;
