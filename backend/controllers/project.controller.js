import Project from "../models/project.model.js";
import Client from "../models/client.model.js";

export const createProject = async (req, res) => {
  const { title, description, clientId, status, dueDate } = req.body;

  try {
    if (!title || !clientId || !status || !dueDate) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }

    const project = await Project.create({
      title,
      description,
      adminId: req.user.id,
      clientId,
      status,
      dueDate,
    });

    return res.status(201).json({ success: true, project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ adminId: req.user.id });
    return res.status(200).json({ success: true, message: projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    if (project.adminId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    return res.status(200).json({ success: true, project });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    if (project.adminId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    const updatedProject = await Project.findByIdAndUpdate(id, updates, { new: true });
    return res.status(200).json({ success: true, updatedProject });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    if (project.adminId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    await Project.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
