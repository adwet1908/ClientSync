// Import mongoose to connect to MongoDB
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("ClientSync Central Database Connected");
  } catch (error) {
    console.error(` MongoDB Connection Failed: ${error.message}`);
    process.exit(1); 
  }
};

export default connectDB;
