const express = require("express");
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");

let users = [
  {
    firstname: "Admin",
    lastname: "Admin",
    email: "admin@gmail.com",
    password: "password",
    otp: "1234",
  },
];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "../src/client/build")));

app.post("/login", function (req, res) {
  let access_token, user;

  let found = users.find((elem) => elem.email === req.body.email);

  if (found) {
    if (found.password === req.body.password) {
      access_token = jwt.sign(
        {
          email: req.body.email,
          password: req.body.password,
        },
        "sercet_key"
      );
      user = {
        firstname: found.firstname,
        lastname: found.lastname,
        email: found.email,
        image: found.image ? found.image : "default_image.png",
      };
      res.status(200).send({ access_token, user });
    } else {
      res.send({ error: "invalid password" });
    }
  } else {
    res.send({ error: "username not found" });
  }
});

app.post("/signup", function (req, res) {
  users.push(req.body);
  // console.log(users);
  res.status(200).send({ msg: "signup successful" });
});

app.post("/password", (req, res) => {
  const { password } = req.body;
  let found = users.find((user) => user.email === req.body.email);
  if (found) {
    found.password = password;
    return res
      .status(200)
      .send({ isError: false, msg: "Password changed successfully" });
  } else {
    return res.send({ msg: "Email not registered", isError: true });
  }
});

app.post("/reset", function (req, res) {
  let found = users.find((user) => user.email === req.body.email);
  if (found) {
    return res
      .status(200)
      .send({ isError: false, msg: "We have sent OTP to given email" });
  } else {
    return res.send({ msg: "Email not registered", isError: true });
  }
});

app.post("/verify", function (req, res) {
  let found = users.find((user) => user.email === req.body.email);
  if (found) {
    if (found.otp === req.body.otp)
      return res
        .status(200)
        .send({ isError: false, msg: "Create New Password" });
    else res.send({ msg: "Wrong OTP provided", isError: true });
  } else {
    return res.send({ msg: "Email not registered", isError: true });
  }
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../src/client/build", "index.html"));
});
app.listen(port);
