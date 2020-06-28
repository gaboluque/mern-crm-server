import Product from '../../db/models/Product';

export default async (_id) => {
  try {
    const product = await Product.findById(_id);
    if (!product) throw new Error('Producto no encontrado');
    await Product.findByIdAndDelete({ _id });
  } catch (e) {
    throw new Error(e);
  }
};
