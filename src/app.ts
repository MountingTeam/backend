const createError = require("http-errors");

import * as Express from "express";
import api from "./api";

const router = Express();

router.use(Express.json());
router.use(Express.urlencoded({ extended: false }));

router.all("/*", function(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  res.contentType("json");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

router.use("/api", api);

router.use(function(next: Express.NextFunction) {
  next(createError(404));
});

router.use(function(err: any, req: Express.Request, res: Express.Response) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

export default router;
