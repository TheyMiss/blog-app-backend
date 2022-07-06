import config from 'config';
import mongoose from 'mongoose';

const connectToDb = async (): Promise<void> => {
  const dbUri: string = config.get('mongodb_uri');
  try {
    await mongoose.connect(dbUri);
  } catch (error) {
    process.exit(1);
  }
};

export default connectToDb;
