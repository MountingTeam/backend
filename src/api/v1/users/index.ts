import { Router } from "express";

import * as MongoDB from "mongodb";
import collection from "../../../mongo";

const ObjectID = MongoDB.ObjectId;
const COL = "restapi";

const router = Router();

router.get("/", function(req: any, res: any) {
  collection(COL)
    .find()
    .toArray(function(err: MongoDB.MongoError, docs: any) {
      res.send(docs);
    });
});

router.get("/:id", function(req: any, res: any) {
  collection(COL).findOne({ _id: new ObjectID(req.params.id) }, {}, function(
    err: any,
    r: any
  ) {
    res.send(r);
  });
});

router.post("/", function(req: any, res: any) {
  collection(COL)
    .insertOne(req.body)
    .then(function(r: any) {
      res.send(r);
    });
});

router.put("/:id", function(req: any, res: any) {
  collection(COL).findOneAndUpdate(
    { _id: new ObjectID(req.params.id) },
    req.body,
    {},
    function(err: any, r: any) {
      res.send(r);
    }
  );
});

router.delete("/:id", function(req: any, res: any) {
  collection(COL).findOneAndDelete(
    { _id: new ObjectID(req.params.id) },
    {},
    function(err: any, r: any) {
      res.send(r);
    }
  );
});

export default router;
