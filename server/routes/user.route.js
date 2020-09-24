// importing package
import express from "express";

// middlewares
import {
  signUpChecker,
  signUpError,
} from "../middlewares/validators/signUp.middleware";
import {
  registerChecker,
  registerError,
} from "../middlewares/validators/register.middleware";

// controller
import userController from "../controllers/user.controller";

// route
let route = express.Router();

// paths
route.post("/login", userController.login);
route.post("/signup", signUpChecker, signUpError, userController.signup);
route.post("/verify", userController.verify);
route.post("/otp", userController.otp);
route.post("/password", userController.setPassword);
route.post(
  "/custom",
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  registerChecker,
  registerError,
  userController.customRegister
);

export default route;
