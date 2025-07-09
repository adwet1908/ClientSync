import mongoose from "mongoose";

// Define Invoice schema
const invoiceSchema = mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    services: [
      {
        description: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },

    invoiceDate: {
      type: Date,
      default: Date.now,
    },

    dueDate: {
      type: Date,
    },

    paymentMethod: {
      type: String,
      enum: ["Stripe", "Razorpay", "Card", ""],
      default: "Razorpay",
    },

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
