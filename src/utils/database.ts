import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';


const connectDB = async () => {

    const mongoMemoryServer = await MongoMemoryServer.create();
    let mongoUri = mongoMemoryServer.getUri();
  

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
