// importing packages
import passport from "passport";
import local from "passport-local";
import bcrypt from "bcrypt";

// user model
import userModel from "./models/user.model";

// local strategy
const LocalStrategy = local.Strategy;

const logic = async (email, password, cb) => {
  try {
    const user = await userModel.findOne({ email });

    // if user not found
    if (!user)
      return cb(null, false, {
        msg: "Incorrect email id.",
        isError: true,
        data: null,
      });

    if (!(await bcrypt.compare(password, user.password)))
      return cb(null, false, {
        msg: "Incorrect password.",
        isError: true,
        data: null,
      });

    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    // if user found
    return cb(null, user, {
      msg: "Logged In Successfully",
      isError: false,
      data,
    });
  } catch (err) {
    cb(err);
  }
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    logic
  )
);
