const createError = require("http-errors");

import * as Express from "express";
import router from "./api";

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

app.use("/api", router);

app.use(function(next: any) {
  next(createError(404));
});

app.use(function(err: any, req: any, res: any) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

export default app;
