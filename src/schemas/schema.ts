import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} from "graphql";

const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const User = mongoose.model(
  "User",
  new Schema({
    id: mongoose.Types.ObjectId,
    name: String
  })
);

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

const promiseListAll = () => {
  return new Promise((resolve, reject) => {
    User.find((err, users) => {
      if (err) reject(err);
      else resolve(users);
    });
  });
};

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: () => {
        return promiseListAll();
      }
    },
    user: {
      type: new GraphQLList(UserType),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: function(source, { id }) {
        return new Promise((resolve, reject) => {
          User.find({ id }, (err, user) => {
            if (!user || err) reject(err);
            else resolve(user);
          });
        });
      }
    }
  })
});

const MutationAdd = {
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

const MutationDelete = {
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

const MutationUpdate = {
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

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    add: MutationAdd,
    delete: MutationDelete,
    update: MutationUpdate
  }
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

export default schema;
