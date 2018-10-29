import { GraphQLObjectType, GraphQLSchema } from "graphql";

import { userQuery } from "./queries";

const QueryType = new GraphQLObjectType({
  name: "Query",
  description:
    "This is the query which holds all possible READ entrypoints for the GraphQL API",
  fields: () => ({
    userQuery
  })
});

import { createUser, deleteUser, updateUser } from "./mutations";

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  description:
    "This is the mutation which holds all possible WRITE entrypoints for the GraphQL API",
  fields: () => ({
    createUser,
    deleteUser,
    updateUser
  })
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

export default schema;
