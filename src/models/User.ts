import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

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

export default User;
