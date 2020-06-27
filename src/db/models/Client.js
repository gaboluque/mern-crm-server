import mongoose from 'mongoose';

const ClientsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    seller: {
      type: mongoose.Types.ObjectId,
      required: true,
      red: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Client', ClientsSchema);
