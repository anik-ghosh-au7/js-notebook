// importing packages
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import passport from "passport";
import { isEmpty } from "lodash";
import nodemailer from "nodemailer";

// models
import model from "../models/user.model";
// utils
import response from "../utils/response";
import generateOTP from "../utils/otpGenerator";
// catching errors
import catchError from "../utils/catchError";
// secret key for jwt
import { secret } from "../configs/secretKey";
import userModel from "../models/user.model";

const controller = {};
let dict = {};

//  user signin control -------------------------------------------
controller.signup = catchError(async (req, res, next) => {
  if (!!req.validationErr)
    return response(res, null, req.validationErr, true, 400);
  let hashed_password = await bcrypt.hash(req.body.password, 5);
  let userData = { ...req.body, password: hashed_password };
  const user = new model(userData);
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

// function to clear OTP after 30 mins
const clearOTP = (dict, key) => {
  return setTimeout(() => {
    delete dict[key];
  }, 1000 * 60 * 30);
};

// checking email for password reset ------------------------------------------------
controller.verify = catchError(async (req, res, next) => {
  console.log(req.headers);
  let { email } = req.body;
  let user = await model.findOne({ email });

  // if user not found
  if (!user) return response(res, null, "email not registered", true, 404);

  // -------------------------------------------

  const otp = generateOTP();

  // to set OTP and clear timer
  if (dict[email]) {
    clearInterval(dict[email][1]);
    delete dict[email];
  }
  dict[email] = [otp, clearOTP(dict, email)];

  await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      port: 465,
      secure: true,
      pass: process.env.PASSWORD,
    },
  });
  await transporter.sendMail({
    from: "JS-NoteBook ",
    to: email,
    subject: "OTP from JS-Notebook",
    // plain text body
    text: `For sign up in JS-Notebook", please use this OTP ${otp}. This OTP will be valid for 30 mins`,
    // html body
    html: `<b><H2>For sign in JS-Notebook, please use this OTP ${otp}</H2><br> OTP will be valid for 30 mins</b>`,
  });

  // -------------------------------------------

  // else create otp
  response(res, null, "OTP sent to email", false, 200);
});

// check otp -----------------------------------------------------------------------
controller.otp = catchError(async (req, res, next) => {
  let { otp, email } = req.body;
  if (dict[email] && dict[email][0] === otp)
    return response(res, null, "OTP verified successfully", false, 200);

  response(res, null, "OTP didn`t match", true, 401);
});

// set new password ----------------------------------------------------------------
controller.setPassword = catchError(async (req, res, next) => {
  let { email, password } = req.body;
  let hashed_password = await bcrypt.hash(password, 5);
  let user = await model.findOneAndUpdate(
    { email },
    { $set: { password: hashed_password } }
  );
  // if user not found
  if (!user) return response(res, null, "email not registered", true, 404);

  response(res, null, "password changed successfully", false, 200);
});

// custom register ----------------------------------------------------------------------
controller.customRegister = catchError(async (req, res, next) => {
  if (!!req.validationErr)
    return response(res, null, req.validationErr, true, 400);

  let user = null;

  if (!!req.body.email) {
    // finding user by email
    user = await model.findOne({ email: req.body.email });
  } else if (!!req.body.github) {
    // finding user by github
    user = await model.findOne({ github: req.body.github });
  }

  if (!user) {
    // if user not found
    user = new model({ ...req.body });
    user = await user.save();
  } else {
    // if user is found but github is not there
    if (!!req.body.github && !user.github) {
      user = await model.findOneAndUpdate(
        {
          email: req.body.email,
        },
        { $set: { github: req.body.github } },
        { new: true }
      );
    }
    // if user is found but email is not there
    if (!!req.body.email && !user.email) {
      user = await model.findOneAndUpdate(
        {
          github: req.body.github,
        },
        { $set: { email: req.body.email } },
        { new: true }
      );
    }
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
  let user;

  if (!isEmpty(req.fields)) {
    let { Name: name, Email: email, Github: github } = req.fields;
    let names = name.split(" ");
    let firstName = names[0];
    let lastName = names.slice(1, names.length).join(" ");

    user = await userModel.findByIdAndUpdate(
      req.user._id,
      { $set: { firstName, lastName, email, github } },
      { new: true, useFindAndModify: false }
    );
  }

  if (!!req.imgUrl) {
    user = await userModel.findByIdAndUpdate(
      req.user._id,
      { $set: { img: req.imgUrl } },
      { new: true, useFindAndModify: false }
    );
  }

  if (!user) return response(res, null, "invalid data", true, 404);
  response(res, user, "profile update successful", false, 200);
});

export default controller;
