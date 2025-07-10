import Client from "../models/client.model.js";

export const createClient = async (req, res) => {
  const { name, email, billingAddress, projects } = req.body;

  try {
    if (!name || !email || !billingAddress || !projects) {
      return res.status(401).json({
        success: false,
        message: "Data missing",
      });
    }

    const newUser = await Client.create({
      name,
      email,
      billingAddress,
      projects, // not "project"
      adminId: req.user.id,
    });

    return res.status(201).json({
      success: true, // should be true
      message: "New Client registered successfully, Congratulations",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({ adminId: req.user.id });

    if (!clients) {
      return res.status(401).json({
        success: false,
        message: "No clients found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: clients,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found.",
      });
    }
    if (client.adminId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.status(200).json({
      success: true,
      client,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateClient = async (req, res) => {
  const { name, email, billingAddress, projects } = req.body;
  const { id } = req.params;
  try {
    const client = await Client.findById(id);

    if (!client) {
      return res.status(401).json({
        success: false,
        message: "Client not found.",
      });
    }
    if (client.adminId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { name, email, billingAddress, projects },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Client updated successfully",
      updatedClient,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);

    if (!client) {
      return res.status(401).json({
        success: false,
        message: "Client not found.",
      });
    }

    if (client.adminId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }
    await Client.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Client deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
