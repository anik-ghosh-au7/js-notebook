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
    error: "",
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
  res.status(200).send({ msg: "signup successfull" });
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../src/client/build", "index.html"));
});
app.listen(port);
