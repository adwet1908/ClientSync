import express from 'express';
import {
    createInvoice,
    fetchAllInvoiceForAdmin,
    fetchInvoiceById,
    fetchInvoicesByClient,
    markAsPaid,
    deleteInvoice,
} from '../controllers/invoice.controller.js';
import verifyToken from '../middleware/verifyToken.js';
import isAdmin from '../middleware/isAdmin.js';

const invoiceRouter = express.Router();

invoiceRouter.post('/create', verifyToken, isAdmin, createInvoice);
invoiceRouter.get('/all', verifyToken, isAdmin, fetchAllInvoiceForAdmin);
invoiceRouter.get('/:id', verifyToken, isAdmin, fetchInvoiceById);
invoiceRouter.get('/client/:clientId', verifyToken, isAdmin, fetchInvoicesByClient);
invoiceRouter.patch('/:id/paid', verifyToken, isAdmin, markAsPaid);
invoiceRouter.delete('/:id', verifyToken, isAdmin, deleteInvoice);

export default invoiceRouter;
