// importing package
import express from "express";

// controller
import userController from "../controllers/user.controller";

// response
import response from "../utils/response";

// route
let route = express.Router();

route.get("/profile", (req, res) => {
  console.log(req.body);
  console.dir(req);
  response(res, req.user, "user profile", false, 200);
});

export default route;
