import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  convertLeadToClient,
} from "../controllers/lead.controller.js";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";

const leadRouter = express.Router();

leadRouter.post('/create',  verifyToken, isAdmin, createLead);
leadRouter.get('/all', verifyToken, isAdmin, getAllLeads);
leadRouter.get('/:id',  verifyToken, isAdmin,getLeadById);
leadRouter.put('/:id', verifyToken, isAdmin, updateLead);
leadRouter.delete('/:id', verifyToken, isAdmin, deleteLead);
leadRouter.post('/:id/convert', verifyToken, isAdmin, convertLeadToClient);

export default leadRouter;
