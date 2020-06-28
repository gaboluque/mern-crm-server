import Product from '../../db/models/Product';

export default async (productDTO) => {
  try {
    const product = new Product(productDTO);
    const response = await product.save();
    return response;
  } catch (e) {
    throw new Error(e);
  }
};
