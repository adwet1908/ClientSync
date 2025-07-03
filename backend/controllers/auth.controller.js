import express from 'express';
import bcrypt, { genSalt } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model.js';

export const adminRegister = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(401).json({
                success: false,
                message: "Data missing"
            });
        }

        const userExist = await Admin.findOne({ email });

        if (userExist) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        // if does not exists hash password 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // new user save to db 
        const newUser = await Admin.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: 'user registered successfully'
        });


    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "Data missing"
            });
        }

        // find the Admin
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            });
        };

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // token generation

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

        return res.status(201).json({
            success: true,
            message: "Logged in successfully", 
            token 
        }); 

    } catch (error) {
        return res
            .status(500)
            .json({ message: "Server error", error: error.message });
    }
}

export const adminLogout = async (req, res) => {
    return res.status(200).json({ message: "Logged out successfully" });
}