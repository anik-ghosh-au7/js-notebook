// importing package
import express from "express";
import formidable from "formidable";
import path from "path";
import fs from "fs";
import cloudLib from "cloudinary";

const cloudinary = cloudLib.v2;

// imprting cloudinary config variables
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../configs/cloudinary";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// controller
import userController from "../controllers/user.controller";

// response
import response from "../utils/response";

// route
let route = express.Router();

route.post("/profile", (req, res) => {
  const form = formidable({
    multiples: true,
    uploadDir: path.join(__dirname, "../../public/tempAssets"),
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
    }
    console.log("feilds --> ", fields, files);

    let image_url;

    if (!!files.file) {
      await cloudinary.uploader.upload(
        files.file.path,
        (err, imageResponse) => {
          if (err) console.log(err);
          else {
            image_url = imageResponse.secure_url;
            console.log("image url from from cloudinary ==> ", image_url);
            fs.unlink(files.file.path, (err) => {
              if (err) console.log(err);
            });
          }
        }
      );
      // res.json({ fields, files });
    }
  });

  // console.log("from profile -- server --> ", req);
  response(res, req.user, "user profile", false, 200);
});

export default route;
