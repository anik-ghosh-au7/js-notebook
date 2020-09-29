// importing package
import express, { response } from "express";

// middleware
import formidableMiddleware from "../middlewares/formidable/middleware";
import cloudinaryMiddleware from "../middlewares/upload/cloudinary.middleware";

// controller
import userController from "../controllers/user.controller";

// route
let route = express.Router();

route.post("/image", formidableMiddleware, cloudinaryMiddleware, (req, res) => {
  if (!!req.imgUrl) {
    res.status(200).send({ url: req.imgUrl });
  } else {
    res.status(400).send({ err: "Upload unsuccessful, try again!!" });
  }
});

export default route;
