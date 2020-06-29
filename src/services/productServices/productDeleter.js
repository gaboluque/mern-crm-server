import Product from '../../db/models/Product';
import productShower from './productShower';

const verifyBusinessRules = async (productId) => {
  await productShower(productId);
};

export default async (_id) => {
  await verifyBusinessRules(_id);
  try {
    await Product.findByIdAndDelete({ _id });
  } catch (e) {
    throw new Error(e);
  }
};
