import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    adminId: {
      type: Object.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    clientId: {
      type: Object.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Completed", "In progress", "Not Started", "Paused"],
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

const Project = mongoose.model("Project", projectSchema); 
export default Project; 
