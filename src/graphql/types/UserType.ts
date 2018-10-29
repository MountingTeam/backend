import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

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

export { User, UserType };
