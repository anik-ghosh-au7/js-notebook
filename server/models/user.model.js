import mongoose from "mongoose";

import { secretPassword } from "../configs/secretKey";

// making schema
const userSchema = mongoose.Schema;

// defining schema
const user = new userSchema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
      default: secretPassword,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    img: {
      type: String,
      default:
        "https://res.cloudinary.com/dtyzqbg4a/image/upload/v1600945821/Default/default_image_rjiswa.png",
    },
    github: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

user.index({ email: 1, github: 1 }, { unique: true });
user.index({ email: 1, github: 1 }, { required: true });
// creating model
const userModel = mongoose.model("user", user);

export default userModel;
