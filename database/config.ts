import mongoose from 'mongoose';

const dbConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DBCONNECTION || '');
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error);
    throw new Error('MongoDB Connection Error');
  }
};

export default dbConnection;
