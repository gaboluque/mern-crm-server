import Product from '../models/Product';

const getProducts = async () => {
  const products = await Product.find({});
  return products;
};

const getProduct = async (_, { id }) => {
  const product = await Product.findById(id);
  if (!product) throw new Error('Producto no encontrado');
  return product;
};

const searchProduct = async (_, { text }) => {
  const products = await Product.find({ $text: { $search: text } });
  return products;
};

const newProduct = async (_, { input }) => {
  try {
    const product = new Product(input);
    const response = await product.save();
    return response;
  } catch (e) {
    throw new Error(e);
  }
};

const updateProduct = async (_, { id, input }) => {
  try {
    let product = await Product.findById(id);
    if (!product) throw new Error('Producto no encontrado');
    product = await Product.findOneAndUpdate({ _id: id }, input, {
      new: true,
    });
    return product;
  } catch (e) {
    throw new Error(e);
  }
};

const deleteProduct = async (_, { id }) => {
  try {
    const product = await Product.findById(id);
    if (!product) throw new Error('Producto no encontrado');
    await Product.findByIdAndDelete({ _id: id });
    return 'Producto eliminado';
  } catch (e) {
    throw new Error(e);
  }
};

export const productQueries = { getProducts, getProduct, searchProduct };
export const productMutations = { newProduct, updateProduct, deleteProduct };
