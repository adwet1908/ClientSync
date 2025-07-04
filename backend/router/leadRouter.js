import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  convertLeadToClient,
} from "../controllers/lead.controller.js";
import express from "express";

const leadRouter = express.Router();

leadRouter.post('/create', createLead);
leadRouter.get('/all', getAllLeads);
leadRouter.get('/:id', getLeadById);
leadRouter.put('/:id', updateLead);
leadRouter.delete('/:id', deleteLead);
leadRouter.post('/:id/convert', convertLeadToClient);

export default leadRouter;
