import Product from '../../db/models/Product';

export default async (query = {}) => {
  const products = await Product.find(query);
  return products;
};
