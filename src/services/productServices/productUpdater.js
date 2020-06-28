import Product from '../../db/models/Product';

export default async (_id, productDTO) => {
  try {
    let product = await Product.findById(_id);
    if (!product) throw new Error('Producto no encontrado');
    product = await Product.findOneAndUpdate({ _id }, productDTO, {
      new: true,
    });
    return product;
  } catch (e) {
    throw new Error(e);
  }
};
