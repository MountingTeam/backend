import { GraphQLString, GraphQLList } from "graphql";
import { UserType } from "../types/UserType";
import { User } from "../../models";

const userQuery = {
  type: new GraphQLList(UserType),
  args: {
    id: {
      name: "id",
      type: GraphQLString
    },
    userId: {
      name: "name",
      type: GraphQLString
    }
  },
  resolve: (args: any) => {
    return new Promise((resolve, reject) => {
      User.find(args, (err, users) => {
        if (err) reject(err);
        else resolve(users);
      });
    });
  }
};

export { userQuery };
