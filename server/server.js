// importing packages
import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import passport from "passport";

// response function
import response from "./utils/response";

// routes
import userRoute from "./routes/user.route";
import protectedRoute from "./routes/protected.route";
import publicRoute from "./routes/public.route";

// connecting to database
import "./database";

// passport strategies
import "./local.passport";
import "./middlewares/authentication/passport.middleware";

dotenv.config();

// init app
const app = express();

// setting port
const port = process.env.PORT || 5000;

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
app.use(
  "/api/protected",
  passport.authenticate("jwt", { session: false }),
  protectedRoute
);
app.use("/api/public", publicRoute);

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
  console.log("global error handler ==>>", err);

  if (err.message === "Path not found")
    return response(res, null, "Path not found", true, 404);

  response(res, null, "Internal error. Sorry!!!", true, 500);
});

app.listen(port);
