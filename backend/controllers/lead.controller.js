import Admin from "../models/admin.model.js";
import Lead from "../models/lead.model.js";
import Client from "../models/client.model.js";

const createLead = async (req, res) => {
    const { name, email, phone, status } = req.body;
    try {
        if (!name || !email || !phone || !status) {
            return res.status(401).json({
                success: false,
                message: "Data missing",
            });
        }

        const findUser = await Lead.findOne({ email, adminId: req.user.id });

        if (findUser) {
            return res.status(409).json({
                success: false,
                message: "Lead with this email already exists",
            });
        }

        const newUser = await Lead.create({
            name,
            email,
            phone,
            status: "New",
            adminId: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Lead created successfully",
            newUser,
        });
    } catch (error) {
        res.status(500).json({
            success: true,
            message: "Server Error",
        });
    }
};

const getAllLeads = async (req, res) => {
    try {
        const leads = await Lead.find({ adminId: req.user.id });

        if (!leads) {
            return res.status(401).json({
                success: false,
                message: "No leads found",
            });
        }

        return res.status(201).json({
            success: true,
            leads,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const getLeadById = async (req, res) => {
    const { id } = req.params;
    try {
        const lead = await Lead.findById(id);

        if (!lead) {
            return res.status(401).json({
                success: false,
                message: "Lead does not exist",
            });
        }

        if (lead.adminId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied" });
        }

        return res.status(201).json({
            success: true,
            lead,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const updateLead = async (req, res) => {
    const { name, email, phone, status } = req.body;
    const { id } = req.params;

    try {
        const lead = await Lead.findById(id);

        if (!lead) {
            return res.status(401).json({
                success: false,
                message: "Lead not found",
            });
        }

        if (lead.adminId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            })
        }

        const updateData = await Lead.findByIdAndUpdate(
            id,
            { name, email, phone, status },
            { new: true }
        );

        return res.status(201).json({
            success: true,
            message: "Data updated successfully",
            updateData,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const deleteLead = async (req, res) => {
    const { id } = req.params;

    try {
        const lead = await Lead.findById(id);
        if (!lead) {
            return res.status(401).json({
                success: false,
                message: "Lead not found",
            });
        }

        if (lead.adminId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            })
        }

        await Lead.findByIdAndDelete(id);
        return res.status(201).json({
            success: true,
            message: "Lead deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

const convertLeadToClient = async (req, res) => {
    const { billingAddress } = req.body || {};
    const { id } = req.params;

    try {
        const lead = await Lead.findById(id);

        if (!lead) {
            return res.status(401).json({
                success: false,
                message: "Lead not found",
            });
        }

        if (lead.adminId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: You don't own this lead."
            });
        }


        const newClient = await Client.create({
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            billingAddress,
            projects: 0,
            adminId: req.user.id,
        });


        await Lead.findByIdAndDelete(id);
        return res.status(201).json({
            success: true,
            message: "New client onboarded successfully :)",
            newClient
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Server Error",
        });
    }
};

export {
    createLead,
    getAllLeads,
    getLeadById,
    updateLead,
    deleteLead,
    convertLeadToClient,
};
