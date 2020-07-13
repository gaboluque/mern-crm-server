import mongoose from 'mongoose';

const OrdersSchema = mongoose.Schema(
  {
    order: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Client',
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    status: {
      type: String,
      required: true,
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Order', OrdersSchema);
