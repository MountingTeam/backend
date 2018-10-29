import { GraphQLString, GraphQLNonNull } from "graphql";
import { UserType, User } from "../types/UserType";

const createUser = {
  type: UserType,
  description: "Add a User",
  args: {
    name: {
      name: "Name",
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root: any, args: any) => {
    const newUser = new User({
      name: args.name
    });
    newUser.id = newUser._id;
    return new Promise((resolve, reject) => {
      newUser.save(function(err) {
        if (err) reject(err);
        else resolve(newUser);
      });
    });
  }
};

const deleteUser = {
  type: UserType,
  description: "delete the user",
  args: {
    id: {
      name: "UserId",
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root: any, args: any) => {
    return new Promise((resolve, reject) => {
      User.findById(args.id, (err, user) => {
        if (err) {
          reject(err);
        } else if (!user) {
          reject("User NOT found");
        } else {
          user.remove(err => {
            if (err) reject(err);
            else resolve(user);
          });
        }
      });
    });
  }
};

const updateUser = {
  type: UserType,
  description: "Edit the user",
  args: {
    id: {
      name: "UserId",
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      name: "Name",
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root: any, args: any) => {
    return new Promise((resolve, reject) => {
      User.findById(args.id, (err: any, user: any) => {
        if (err) {
          reject(err);
          return;
        }

        if (!user) {
          reject("User NOT found");
          return;
        }

        user.name = args.name;
        user.save((err: any) => {
          if (err) reject(err);
          else resolve(user);
        });
      });
    });
  }
};

export { createUser, deleteUser, updateUser };
