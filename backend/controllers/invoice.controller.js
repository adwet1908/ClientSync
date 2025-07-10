import Invoice from "../models/invoice.model.js";
import Client from "../models/client.model.js";

// This is to create an Invoice
export const createInvoice = async (req, res) => {
  const { clientId, projectId, services, dueDate, totalAmount, paymentMethod } =
    req.body;

  try {
    if (!clientId || !services || !totalAmount || !dueDate) {
      return res.status(401).json({
        success: false,
        message: "Required Data is missing to create invoice",
      });
    }

    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(401).json({
        success: false,
        message: "Client not found.",
      });
    }

    const invoice = await Invoice.create({
      adminId: req.user.id,
      clientId,
      projectId: projectId || null,
      services,
      dueDate,
      totalAmount,
      paymentMethod: paymentMethod || "Razorpay",
      status: "Unpaid",
    });

    return res.status(201).json({
      success: true,
      invoice,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// This is to fetch all invoices for a particular Admin
export const fetchAllInvoiceForAdmin = async (req, res) => {
  try {
    const invoice = await Invoice.find({ adminId: req.user.id });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "No Invoices found",
      });
    }

    return res.status(200).json({
      success: true,
      message: invoice,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// This is to fetch a particular invoice
export const fetchInvoiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    return res.status(200).json({
      success: true,
      invoice,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// This is to get all invoices sent to a particular client
export const fetchInvoicesByClient = async (req, res) => {
  const { clientId } = req.params;

  try {
    const invoices = await Invoice.find({ clientId });

    if (!invoices) {
      return res.status(404).json({
        success: false,
        message: "Invoices not found for this client",
      });
    }

    return res.status(200).json({
      success: true,
      invoices,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Server Error",
    });
  }
};

// This is to mark an invoice paid
export const markAsPaid = async (req, res) => {
  const { id } = req.params;
  try {
    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    invoice.status = "Paid";
    await invoice.save();

    return res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// To delete an Invoice Only if it is unpaid
export const deleteInvoice = async (req, res) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    if (invoice.status === "Paid") {
      return res.status(403).json({
        success: false,
        message: "This invoice cannot be deleted as it has been paid.",
      });
    }

    await Invoice.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
