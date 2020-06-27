// Resolvers

import { clientMutations, clientQueries } from '../resolvers/clientResolvers';
import { orderMutations, orderQueries } from '../resolvers/orderResolvers';
import {
  productMutations,
  productQueries,
} from '../resolvers/productResolvers';
import { userMutations, userQueries } from '../resolvers/userResolvers';

const resolvers = {
  Query: {
    ...userQueries,
    ...productQueries,
    ...orderQueries,
    ...clientQueries,
  },
  Mutation: {
    ...userMutations,
    ...productMutations,
    ...orderMutations,
    ...clientMutations,
  },
};

export default resolvers;
