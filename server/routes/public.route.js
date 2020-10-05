// importing package
import express from "express";

// middleware
import formidableMiddleware from "../middlewares/formidable/middleware";
import cloudinaryMiddleware from "../middlewares/upload/cloudinary.middleware";
import codeComplier from "../middlewares/codeCompiler/codeCompiler";

// controller
import publicController from "../controllers/public.controller";

// route
let route = express.Router();

route.post(
  "/image",
  formidableMiddleware,
  cloudinaryMiddleware,
  publicController.imageController
);

route.post(
  "/compile",
  formidableMiddleware,
  codeComplier,
  publicController.codeController
);

route.get("/search", publicController.searchController);

export default route;
