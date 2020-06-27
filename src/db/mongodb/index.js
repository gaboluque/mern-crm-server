import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log('DB Connected!');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default dbConnect;
