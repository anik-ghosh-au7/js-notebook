// importing package
import express from "express";

// controller
import userController from "../controllers/user.controller";

// route
let route = express.Router();

// paths
route.post("/login", userController.login);
route.post("/signup", userController.signup);
route.post("/verify", userController.verify);
route.post("/otp", userController.otp);
route.post("/password", userController.setPassword);

export default route;
