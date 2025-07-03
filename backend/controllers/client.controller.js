import Client from "../models/client.model.js";

export const createClient = async (req, res) => {
    const {name, email, billingAddress, projects} = req.body; 

    try {
        if(!name || !email || !billingAddress || !projects){
            return res.status(401).json({
                success: false, 
                message: "Data missing"
            }); 
        }

        const newUser = await Client.create({
            name, 
            email, 
            billingAddress, 
            project: 0, 
            adminId: req.user._id
        });

        return res.status(201).json({
            success: false,
            message: "New Client registered successfully, Congratualtions", 
            newUser
        }); 

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
};

export const getAllClients = async(req, res) => {
    try {
        const {email}
    } catch (error) {
        
    }
};

export const getClientById = async (req, res) => {};

export const updateClient = async (req, res) => {};

export const deleteClient = async (req, res) => {};
