import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: {
      type: GraphQLID,
      description: "UserId"
    },
    name: {
      type: GraphQLString,
      description: "Name"
    }
  })
});

export { UserType };
