import { check, validationResult } from "express-validator";
// import isGitUrl from "is-git-url";

import simplyfyErr from "../../utils/simplyfyErr";

export const signUpChecker = [
  check("email")
    .exists()
    .withMessage("Please provide email.")
    .isEmail()
    .withMessage("Please provide correct email."),

  check("password")
    .exists()
    .withMessage("Please provide password.")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 to 20 char long."),

  check("firstName")
    .exists()
    .withMessage("Please provide first name")
    .trim()
    .isLength({ min: 2, max: 10 })
    .withMessage("first name must be between 2 to 10 char long"),

  check("lastName")
    .exists()
    .withMessage("Please provide last name")
    .trim()
    .isLength({ min: 2, max: 10 })
    .withMessage("last name must be between 2 to 10 char long"),
];

export const signUpError = (req, res, next) => {
  try {
    validationResult(req).throw();
  } catch (err) {
    const singleKeyError = simplyfyErr(err.array());
    const errors = singleKeyError.map((e) => e.msg);
    const message = errors.join(",");
    req.validationErr = message;
  }
  next();
};

// custom validator for github
// const isGitHubUrl = ({ req }) => {
//     if (isGitUrl(req.body.github)) return true;

//     throw new Error("not a github url");
//   };

// check("github")
// .custom(isGitHubUrl)
// .withMessage("Please Provide a valid github url"),
