// importing packages
import jwt from "jsonwebtoken";
import passport from "passport";
import formidable from "formidable";
import path from "path";
import fs from "fs";
import cloudLib from "cloudinary";

// models
import model from "../models/user.model";
// utils
import response from "../utils/response";
// catching errors
import catchError from "../utils/catchError";
// secret key for jwt
import { secret } from "../configs/secretKey";

// importing cloudinary config variables
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../configs/cloudinary";

const cloudinary = cloudLib.v2;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const controller = {};

//  user signin control -------------------------------------------
controller.signup = catchError(async (req, res, next) => {
  const user = new model(req.body);
  const data = await user.save();
  response(res, data, "register successful", false, 200);
});

// user login control --------------------------------------------
controller.login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("Error===>", err);
    console.log(user);
    if (err || !user)
      return response(res, null, "Credentials incorrect", true, 404);

    req.login(user, { session: false }, (err) => {
      if (err) return next(err);

      // generate a signed json web token with the contents of user object and return it in the response
      const { firstName, lastName, email, _id } = user;
      const token = jwt.sign({ firstName, lastName, email, _id }, secret);
      //  return res.json({user, token});
      response(res, { user, token }, "Login Successful", false, 200);
    });
  })(req, res);
};

// checking email for password reset ------------------------------------------------
controller.verify = catchError(async (req, res, next) => {
  console.log(req.headers);
  let { email } = req.body;
  let user = await model.findOne({ email });

  // if user not found
  if (!user) return response(res, null, "email not registered", true, 404);

  // else create otp
  response(res, null, "OTP sent to email", false, 200);
});

// check otp -----------------------------------------------------------------------
controller.otp = catchError(async (req, res, next) => {
  let { otp } = req.body;
  if (otp === "1234")
    return response(res, null, "OTP verified successfully", false, 200);

  response(res, null, "OTP didn`t match", true, 401);
});

// set new password ----------------------------------------------------------------
controller.setPassword = catchError(async (req, res, next) => {
  let { email, password } = req.body;
  let user = await model.findOneAndUpdate({ email }, { $set: { password } });

  // if user not found
  if (!user) return response(res, null, "email not registered", true, 404);

  response(res, null, "password changed successfully", false, 200);
});

// custom register ----------------------------------------------------------------------
controller.customRegister = catchError(async (req, res, next) => {
  let user = null;

  if (!!req.body.email) {
    // finding user by email
    user = await model.findOne({ email: req.body.email });
  } else if (!!req.body.github) {
    // finding user by github
    user = await model.findOne({ github: req.body.github });
  }

  // if user not found
  if (!user) {
    user = new model({ ...req.body });
    user = await user.save();
  }

  // generate token
  const { firstName, lastName, email, _id, img, github } = user;
  const token = jwt.sign({ firstName, lastName, email, _id, github }, secret);
  response(
    res,
    { user: { firstName, lastName, email, _id, img, github }, token },
    "Register Successful",
    false,
    200
  );
});

// user profile update --------------------------------------------------------------------
controller.profile = catchError(async (req, res, next) => {
  // formidable config
  const form = formidable({
    multiples: true,
    uploadDir: path.join(__dirname, "../../public/tempAssets"),
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
    }
    console.log("fields --> ", fields, files);

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
    }
  });

  // console.log("from profile -- server --> ", req);
  response(res, req.user, "user profile", false, 200);
});

export default controller;
