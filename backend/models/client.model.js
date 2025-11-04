import mongoose from "mongoose";

// Define Client schema
const clientSchema = mongoose.Schema(
  {
    // Name of the client
    name: {
      type: String,
      required: true,
    },

    // Email address (must be unique)
    email: {
      type: String,
      unique: true,
      required: true,
    },
    // Admin who has this
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    // Billing address (optional)
    billingAddress: {
      type: String,
    },

    // Number of projects under this client
    projects: {
      type: Number,
      required: true,
      default: 0,
    },

    phone: {
      type: Number, 
      required: true,  
    }, 
    
    industry :{
      type: String, 
      required: true
    }, 

    averageBudget:{
      type: Number, 
    },
    website: {
      type: String, 
    },
    notes:{
      type: String, 
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Export Client model
const Client = mongoose.model("Client", clientSchema);
export default Client;
