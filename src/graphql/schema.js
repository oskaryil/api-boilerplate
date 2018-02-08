import { makeExecutableSchema } from 'graphql-tools';

import { resolvers } from './resolvers'; // Will be implemented at a later stage.

const typeDefs = `
    scalar Date

    type User {
      useruuid: ID!
      username: String
      email: String!
      name: String
      accesstoken: String
      createdat: Date!
      updatedat: Date!
    }

    type Product {
      _id: ID!
      title: String
      price: Float
      currency: String
      category: String
      subCategory: String
      description: String
      createdBy: String
      imageUrl: String
      createdAt: Date!
      updatedAt: Date!
    }

    # This type specifies the entry points into our API.
    type Query {
      products: [Product]
      getUser(useruuid: ID!): User
    }

    # The mutation root type, used to define all mutations.
    #type Mutation {
    #  # A mutation to add a new channel to the list of channels
    #  addChannel(name: String!): Channel
    #}
    `;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
