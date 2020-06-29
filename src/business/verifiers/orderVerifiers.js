import Product from '../../db/models/Product';

const verifyItemQuantity = async ({ id, quantity }) => {
  const product = await Product.findById(id);

  if (quantity > product.stock) {
    throw new Error(`Item ${product.name} exceeds stock`);
  } else {
    product.stock -= quantity;
    await product.save();
  }
};
// eslint-disable-next-line import/prefer-default-export
export { verifyItemQuantity };
