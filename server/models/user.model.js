import mongoose from "mongoose";

// making schema
const userSchema = mongoose.Schema;

// defining schema
const user = new userSchema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

// creating model
const userModel = mongoose.model("user", user);

export default userModel;
