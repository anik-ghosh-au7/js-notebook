// importing packages
import jwt from "jsonwebtoken";

// models
import model from "../models/user.model";
// utils
import response from "../utils/response";
// catching errors
import catchError from "../utils/catchError";

const controller = {};

//  user signin control
controller.signup = catchError(async (req, res, next) => {
  const user = new model(req.body);
  const data = await user.save();
  response(res, data, "register successful", false, 200);
});

// user login control
controller.login = catchError(async (req, res, next) => {
  const user = await model.findOne({ email: req.body.email });

  // checking if user found
  if (!user) return response(res, null, "Email is not registered", true, 404);

  // checking password
  if (user.password !== req.body.password)
    return response(res, null, "Password is incorrect", true, 401);

  // creating token
  let token = jwt.sign(
    {
      email: req.body.email,
      password: req.body.password,
    },
    "secret_key"
  );

  //   // storing it in response
  //   res.cookie("token", token, cookieConfig);

  let userData = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  const data = { token, user: userData };
  response(res, data, "Login successful", false, 200);
});

// checking email for password reset
controller.verify = catchError(async (req, res, next) => {
  console.log(req.headers);
  let { email } = req.body;
  let user = await model.findOne({ email });

  // if user not found
  if (!user) return response(res, null, "email not registered", true, 404);

  // else create otp
  response(res, null, "OTP sent to email", false, 200);
});

// check otp
controller.otp = catchError(async (req, res, next) => {
  let { otp } = req.body;
  if (otp === "1234")
    return response(res, null, "OTP verified successfully", false, 200);

  response(res, null, "OTP didn`t match", true, 401);
});

// set new password
controller.setPassword = catchError(async (req, res, next) => {
  let { email, password } = req.body;
  let user = await model.findOneAndUpdate({ email }, { $set: { password } });

  // if user not found
  if (!user) return response(res, null, "email not registered", true, 404);

  response(res, null, "password changed successfully", false, 200);
});

export default controller;
