const createError = require("http-errors");
const bodyParser = require("body-parser");

import * as mongoose from "mongoose";
import * as Express from "express";
import * as graphQLHTTP from "express-graphql";
import schema from "./schemas/schema";

const COMPOSE_URI_DEFAULT = "mongodb://localhost:27017/local";
const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

mongoose.connect(
  process.env.COMPOSE_URI || COMPOSE_URI_DEFAULT,
  { useNewUrlParser: true },
  function(error) {
    if (error) console.error(error);
    else console.log("mongo connected");
  }
);

app.use(bodyParser.text({ type: "application/graphql" }));
app.use(
  "/",
  graphQLHTTP({
    schema,
    pretty: true,
    graphiql: true
  })
);

app.use((next: Express.NextFunction) => {
  console.log(next);
  next(createError(404));
});

app.use(function(err: any, req: any, res: any) {
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

export default app;
