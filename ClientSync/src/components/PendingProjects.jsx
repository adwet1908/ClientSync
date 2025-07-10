import React from "react";

const PendingProjects = () => {
  const pendingProjectsJson = [
    {
      id: 1,
      title: "Portfolio Website",
      client: "John Doe",
      dueDate: "2025-07-15",
      status: "In progress",
    },
    {
      id: 2,
      title: "E-commerce Backend API",
      client: "Acme Corp",
      dueDate: "2025-07-20",
      status: "Paused",
    },
    {
      id: 3,
      title: "Task Management App",
      client: "Jane Smith",
      dueDate: "2025-07-25",
      status: "Not Started",
    },
  ];

  return (
    <div className="mt-6 bg-[#1f1f1f] p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold text-white mb-4">
        Pending Projects
      </h2>
      <ul className="space-y-3">
        {pendingProjectsJson.map((project) => (
          <li
            key={project.id}
            className="text-gray-300 border-b border-gray-600 pb-2"
          >
            <div className="font-medium">{project.title}</div>
            <div className="text-sm">Client: {project.client}</div>
            <div className="text-sm">Due: {project.dueDate}</div>
            <div className="text-sm">Status: {project.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingProjects;
