import Product from '../../db/models/Product';
import productShower from './productShower';

const verifyBusinessRules = async (productId) => {
  await productShower(productId);
};

export default async (_id, productDTO) => {
  await verifyBusinessRules(_id);
  try {
    const product = await Product.findOneAndUpdate({ _id }, productDTO, {
      new: true,
    });
    return product;
  } catch (e) {
    throw new Error(e);
  }
};
