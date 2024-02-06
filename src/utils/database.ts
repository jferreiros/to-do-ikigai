import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  let mongoUri = process.env.MONGODB_URI;

  // Check if we want to use an in-memory database
  if (process.env.USE_MEMORY_DB === 'true') {
    const mongoMemoryServer = await MongoMemoryServer.create();
    mongoUri = mongoMemoryServer.getUri();
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
