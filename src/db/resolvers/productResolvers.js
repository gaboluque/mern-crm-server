import productCreator from '../../services/productServices/productCreator';
import productDeleter from '../../services/productServices/productDeleter';
import productsFetcher from '../../services/productServices/productsFetcher';
import productShower from '../../services/productServices/productShower';
import productUpdater from '../../services/productServices/productUpdater';

const getProducts = async () => {
  const products = await productsFetcher();
  return products;
};

const getProduct = async (_, { id }) => {
  const product = await productShower(id);
  return product;
};

const searchProduct = async (_, { text }) => {
  const products = await productsFetcher({ $text: { $search: text } });
  return products;
};

const newProduct = async (_, { input }) => {
  const result = await productCreator(input);
  return result;
};

const updateProduct = async (_, { id, input }) => {
  const product = await productUpdater(id, input);
  return product;
};

const deleteProduct = async (_, { id }) => {
  await productDeleter(id);
  return { id };
};

export const productQueries = { getProducts, getProduct, searchProduct };
export const productMutations = { newProduct, updateProduct, deleteProduct };
