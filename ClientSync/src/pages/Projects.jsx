import React, { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { NavLink } from "react-router-dom";

const Projects = () => {
  const { allProjects, fetchProjects } = useContext(StoreContext);

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-b from-[#050a15] via-[#0a1122] to-[#0e1830] text-gray-200 p-8 min-h-screen text-gray-200">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-white tracking-wide mb-1">
            Projects Dashboard
          </h1>
          <p className="text-sm text-gray-400">
            Track active, completed, and pending client projects here.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Stats Cards */}
          <div className="hidden md:flex gap-4">
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-4 text-center">
              <p className="text-gray-400 text-xs uppercase tracking-wide">
                Total Projects
              </p>
              <p className="text-2xl font-semibold text-blue-400 mt-1">
                {allProjects?.length || 0}
              </p>
            </div>
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-4 text-center">
              <p className="text-gray-400 text-xs uppercase tracking-wide">
                Completed
              </p>
              <p className="text-2xl font-semibold text-green-400 mt-1">
                {
                  allProjects?.filter((p) => p.status === "Completed")?.length ||
                  0
                }
              </p>
            </div>
          </div>

          {/* Add Project Button */}
          <NavLink to="/projects/new">
            <button className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
              + Add Project
            </button>
          </NavLink>
        </div>
      </div>

      {/* Stats for mobile */}
      <div className="grid grid-cols-2 md:hidden gap-4 mb-6">
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wide">
            Total Projects
          </p>
          <p className="text-2xl font-semibold text-blue-400 mt-1">
            {allProjects?.length || 0}
          </p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-4 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-wide">
            Completed
          </p>
          <p className="text-2xl font-semibold text-green-400 mt-1">
            {
              allProjects?.filter((p) => p.status === "Completed")?.length ||
              0
            }
          </p>
        </div>
      </div>

      {/* Projects List Section */}
      <div className="bg-[#111827] rounded-2xl border border-gray-800 shadow-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold text-white">All Projects</h3>
          <span className="text-sm text-gray-500">
            ({allProjects?.length || 0})
          </span>
        </div>

        {allProjects?.length > 0 ? (
          <ul className="divide-y divide-gray-800">
            {allProjects.map((project) => (
              <li
                key={project._id}
                className="block py-4 px-4 rounded-lg hover:bg-[#1e293b] transition-all duration-150 ease-in-out flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >
                <div>
                  <p className="font-medium text-gray-100 text-lg">
                    {project.title}
                  </p>
                  <p className="text-sm text-gray-400 max-w-xl line-clamp-2">
                    {project.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Due:{" "}
                    {project.dueDate
                      ? new Date(project.dueDate).toLocaleDateString()
                      : "Not set"}
                  </p>
                </div>

                <div className="flex items-center gap-3 md:gap-5">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      project.status === "In progress"
                        ? "bg-yellow-500 text-white"
                        : project.status === "Completed"
                        ? "bg-green-500 text-white"
                        : "bg-gray-600 text-white"
                    }`}
                  >
                    {project.status || "Pending"}
                  </span>
                  <div className="hidden md:flex flex-col text-right">
                    <span className="text-xs text-gray-400">Created</span>
                    <span className="text-sm text-gray-200">
                      {new Date(project.createdAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-10">
            No projects available. Click{" "}
            <span className="font-medium text-white">Add Project</span> to
            create one.
          </p>
        )}
      </div>
    </div>
  );
};

export default Projects;
