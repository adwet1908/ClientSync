import mongoose from "mongoose";

const leadSchema = mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Proposal Sent", "Converted", "Dead"],
      default: "New",
    },
  },
  {
    timestamps: true, 
  }
);

// Export model
const Lead = mongoose.model("Lead", leadSchema);
export default Lead;
