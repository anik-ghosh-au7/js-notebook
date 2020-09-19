// importing packages
import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// response function
import response from "./utils/response";

// routes
import userRoute from "./routes/user.route";

// connecting to database
import "./database";

// passport local strategy
import "./passport";

dotenv.config();

// init app
const app = express();

// setting port
const port = process.env.PORT || 5000;

// let users = [
//   {
//     firstname: "Admin",
//     lastname: "Admin",
//     email: "admin@gmail.com",
//     password: "aA@1",
//     otp: "1234",
//   },
// ];

// middleware
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "../src/client/build")));

// routes
app.use("/api/users", userRoute);

// app.post("/password", (req, res) => {
//   const { password } = req.body;
//   let found = users.find((user) => user.email === req.body.email);
//   if (found) {
//     found.password = password;
//     return res
//       .status(200)
//       .send({ isError: false, msg: "Password changed successfully" });
//   } else {
//     return res.send({ msg: "Email not registered", isError: true });
//   }
// });

// app.post("/reset", function (req, res) {
//   let found = users.find((user) => user.email === req.body.email);
//   if (found) {
//     return res
//       .status(200)
//       .send({ isError: false, msg: "We have sent OTP to given email" });
//   } else {
//     return res.status(404).send({ msg: "Email not registered", isError: true });
//   }
// });

// app.post("/verify", function (req, res) {
//   let found = users.find((user) => user.email === req.body.email);
//   if (found) {
//     if (found.otp === req.body.otp)
//       return res
//         .status(200)
//         .send({ isError: false, msg: "Create New Password" });
//     else res.send({ msg: "Wrong OTP provided", isError: true });
//   } else {
//     return res.send({ msg: "Email not registered", isError: true });
//   }
// });

// 404 error handling
app.use("/api/*", (req, res, next) => {
  const err = new Error("Path not found");
  next(err);
});

// react routes
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../src/client/build", "index.html"));
});

// global error handler
app.use((err, req, res, next) => {
  if (err.message === "Path not found")
    return response(res, null, "Path not found", true, 404);

  response(res, null, "Internal error. Sorry!!!", true, 500);
});

app.listen(port);
