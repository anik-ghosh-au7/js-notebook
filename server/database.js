// importing package
import mongoose from "mongoose";
import MONGODB_URL from "./configs/mongoURL";

// connecting to db
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log("database is connected..."))
  .catch((err) => console.log(err));
