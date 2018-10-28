/**
 * node-mongodbのドキュメント
 * http://mongodb.github.io/node-mongodb-native/2.1/
 */
import * as MongoDB from "mongodb";
const assert = require("assert");

let mongodb: any;
const MongoClient = MongoDB.MongoClient;

// Connection URL
const url = "mongodb://localhost:27017/local";

// Use connect method to connect to the Server
MongoClient.connect(
  url,
  function(err: any, client: any) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    mongodb = client.db("local");
  }
);

const collection = (name: any) => {
  return mongodb.collection(name);
};

export default collection;
