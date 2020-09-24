// importing package
import express from "express";

// middleware
import formidableMiddleware from "../middlewares/formidable/middleware";
import cloudinaryMiddleware from "../middlewares/upload/cloudinary.middleware";

// controller
import userController from "../controllers/user.controller";

// route
let route = express.Router();

route.post(
  "/profile",
  formidableMiddleware,
  cloudinaryMiddleware,
  userController.profile
);

export default route;
