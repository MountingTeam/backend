import { Router } from "express";

import users from "./users/users";

const router = Router();

router.get('/', function(req:any, res:any) {
    res.send('api version 1.0');
  });

router.use("/users", users);

export default router;