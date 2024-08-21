import mongoose from "mongoose";

const connection = {};

const connectToMongoDB = async () => {
  try {
    if (connection.isConnected) {
      console.log("MongoDB is already connected!");
      return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongoDB;
