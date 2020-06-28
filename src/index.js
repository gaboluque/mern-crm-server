import { ApolloServer } from 'apollo-server';
import jwt from 'jsonwebtoken';
import typeDefs from './db/graphql/schema';
import resolvers from './db/graphql/resolvers';
import mongodb from './db/mongodb';

mongodb();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers['authorization'] || '';
    const context = {};
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET);
        context.user = user;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    }
    return context;
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
