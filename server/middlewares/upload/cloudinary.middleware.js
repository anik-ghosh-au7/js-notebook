import cloudLib from "cloudinary";
import fs from "fs";

// importing cloudinary config variables
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../../configs/cloudinary";

const cloudinary = cloudLib.v2;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const middleware = async (req, res, next) => {
  let image_url;

  if (!!req.files && !!req.files.file) {
    await cloudinary.uploader.upload(
      req.files.file.path,
      (err, imageResponse) => {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          image_url = imageResponse.secure_url;

          //   req object has cloudinary image url
          req.imgUrl = image_url;

          fs.unlink(req.files.file.path, (err) => {
            if (err) {
              console.log(err);
              return next(err);
            }
          });
          return next();
        }
      }
    );
  } else {
    next();
  }
};

export default middleware;
