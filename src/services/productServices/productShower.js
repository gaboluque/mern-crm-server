import Product from '../../db/models/Product';

export default async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error('Producto no encontrado');
  return product;
};
