import Project from "../models/project.model.js";
import Client from "../models/client.model.js";

export const createProject = async (req, res) => {
  const { name, description, clientId, status, deadline, amount } = req.body;

  try {
    if (!name || !clientId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ success: false, message: "Client not found" });
    }

    const project = await Project.create({
      name,
      description,
      adminId: req.user._id,
      clientId,
      status: status || "Pending",
      deadline,
      amount,
    });

    return res.status(201).json({ success: true, project });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ adminId: req.user._id });
    return res.status(200).json({ success: true, projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }
    return res.status(200).json({ success: true, project });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    return res.status(200).json({ success: true, updatedProject });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    await Project.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};