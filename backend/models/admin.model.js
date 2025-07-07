import mongoose from "mongoose";

// Define Admin schema with name, email, password
const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String, 
      enum: ["admin"], 
      default: "admin"
    }
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Export Admin model
const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
