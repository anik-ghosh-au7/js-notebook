// importing package
import express from "express";

// middleware
import formidableMiddleware from "../middlewares/formidable/middleware";
import cloudinaryMiddleware from "../middlewares/upload/cloudinary.middleware";

// controller
import userController from "../controllers/user.controller";
import notebookController from "../controllers/notebook.controller";

// route
let route = express.Router();

route.post(
  "/profile",
  formidableMiddleware,
  cloudinaryMiddleware,
  userController.profile
);

route.post("/add", notebookController.create);

route.get("/all", notebookController.all);

route.post("/share", notebookController.share);

route.get("/shared", notebookController.shared);

route.get("/received", notebookController.received);

route.post("/delete", notebookController.delete);

export default route;
