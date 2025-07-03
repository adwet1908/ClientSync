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
            project: 0,
            adminId: req.user._id,
        });

        return res.status(201).json({
            success: false,
            message: "New Client registered successfully, Congratualtions",
            newUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find({ adminId: req.user._id });

        if (!clients) {
            return res.status(401).json({
                success: false,
                message: "No clients found.",
            });
        }

        return res.status(201).json({
            success: false,
            clients,
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
            return res.status(401).json({
                success: false,
                message: "Client not found.",
            });
        }

        return res.status(401).json({
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

        const updatedClient = await Client.findByIdAndUpdate(id);

        return res.status(201).json({
            success: true,
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

        await Client.findByIdAndDelete(id);

        return res.status(201).json({
            success: true,
            message: "Client Delete successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
