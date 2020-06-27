import mongoose from 'mongoose';

const ProductsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductsSchema.index({ name: 'text' });

export default mongoose.model('Product', ProductsSchema);
