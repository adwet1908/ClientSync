import express from 'express';
import {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient,
} from '../controllers/client.controller.js';
import verifyToken from '../middleware/verifyToken.js';
import isAdmin from '../middleware/isAdmin.js';

const clientRouter = express.Router();

clientRouter.post('/add', verifyToken, isAdmin, createClient);
clientRouter.get('/all', verifyToken, isAdmin, getAllClients);
clientRouter.get('/:id', verifyToken, isAdmin, getClientById);
clientRouter.put('/:id', verifyToken, isAdmin, updateClient);
clientRouter.delete('/:id', verifyToken, isAdmin, deleteClient);

export default clientRouter;
