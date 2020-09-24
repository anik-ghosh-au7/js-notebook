// importing package
import express from "express";

// controller
import userController from "../controllers/user.controller";

// route
let route = express.Router();

route.post("/profile", (req, res) => userController.profile);

export default route;
