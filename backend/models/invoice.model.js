import mongoose from "mongoose";

// Define Invoice schema
const invoiceSchema = mongoose.Schema(
  {
    // Admin who created the invoice
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    // Client who is being billed
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    // Optional: Project tied to this invoice
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    // Line items in the invoice (can be services or products)
    services: [
      {
        description: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],

    // Total amount before taxes/discounts (optional calc field)
    totalAmount: {
      type: Number,
      required: true,
    },

    // Status of the invoice
    status: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },

    // When invoice was generated
    invoiceDate: {
      type: Date,
      default: Date.now,
    },

    // Due date for payment
    dueDate: {
      type: Date,
    },

    // Payment method used
    paymentMethod: {
      type: String,
      enum: ["Stripe", "Razorpay", "Card", ""],
      default: "Razorpay",
    },

    // Razorpay/Stripe payment ID (if used)
    paymentId: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);

// Export Invoice model
const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
