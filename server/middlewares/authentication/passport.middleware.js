import passportJWT from "passport-jwt";
import passport from "passport";

// secret key
import { secret } from "../../configs/secretKey";

// user model
import userModel from "../../models/user.model";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// logic
const logic = async (jwtPayload, cb) => {
  console.log(jwtPayload, "line 15");
  try {
    let user = await userModel.findOne({ email: jwtPayload.email });
    console.log(user, "line 18");
    // if user not found
    if (!user) return cb(new Error("user not found"), null);

    return cb(null, user);
  } catch (err) {
    return cb(err);
  }
};

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    },
    logic
  )
);
