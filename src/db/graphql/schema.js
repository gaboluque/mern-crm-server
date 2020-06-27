import clientSchema from '../schemas/clientSchema';
import commonSchema from '../schemas/common';
import orderSchema from '../schemas/orderSchema';
import productSchema from '../schemas/productSchema';
import userSchema from '../schemas/userSchema';

const schemaArray = [
  commonSchema,
  productSchema,
  orderSchema,
  clientSchema,
  userSchema,
];

export default schemaArray;
