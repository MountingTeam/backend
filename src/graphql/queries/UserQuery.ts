import { GraphQLString, GraphQLList } from "graphql";
import { UserType } from "../types/UserType";
import { User } from "../../models";

const userQuery = {
  type: new GraphQLList(UserType),
  users: {
    id: {
      name: "id",
      type: GraphQLString
    },
    userId: {
      name: "name",
      type: GraphQLString
    }
  },
  resolve: args => {
    return new Promise((resolve, reject) => {
      User.find(args, (err, users) => {
        if (err) reject(err);
        else resolve(users);
      });
    });
  }
};

// const UserQuery = {
//     args: {
//         type: new GraphQLList(UserType),
//         resolve: () => {
//             return new Promise((resolve, reject) => {
//                 User.find((err, users) => {
//                     if (err) reject(err);
//                     else resolve(users);
//                 });
//             });
//         }
//     },
//     users: {
//         type: new GraphQLList(UserType),
//         resolve: () => {
//             return new Promise((resolve, reject) => {
//                 User.find((err, users) => {
//                     if (err) reject(err);
//                     else resolve(users);
//                 });
//             });
//         }
//     },
//     user: {
//         type: new GraphQLList(UserType),
//         args: {
//             id: {
//                 type: new GraphQLNonNull(GraphQLString)
//             }
//         },
//         resolve: function (source, { id }) {
//             return new Promise((resolve, reject) => {
//                 User.find({ id }, (err, user) => {
//                     if (!user || err) reject(err);
//                     else resolve(user);
//                 });
//             });
//         }
//     }
// }

export { userQuery };
