import { gql } from 'apollo-server';

// Schema
const commonSchema = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

export default commonSchema;
