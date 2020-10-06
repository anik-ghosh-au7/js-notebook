import { check, validationResult } from "express-validator";
import isGitUrl from "is-git-url";

// simplify error
import simplyfyErr from "../../utils/simplyfyErr";

// custom validator for github
const isGitHubUrl = (value, { req }) => {
  if (value === "" && !!req.body.email) return true;

  if (!!value && value !== "") return true;

  throw new Error("");
};

const isEmailBlank = (value, { req }) => {
  if (!value && req.body.github) return true;

  if (!!value) return true;

  throw new Error("");
};

export const registerChecker = [
  check("email")
    .custom(isEmailBlank)
    .withMessage("Please provide either email or github url"),

  check("firstName")
    .exists()
    .withMessage("Please provide first name")
    .trim()
    .isLength({ min: 1, max: 40 })
    .withMessage("first name must be between 1 to 40 char long"),

  check("github")
    .trim()
    .custom(isGitHubUrl)
    .withMessage("Please provide either email or github url"),
];

export const registerError = (req, res, next) => {
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

// check("github")
// .custom(isGitHubUrl)
// .withMessage("Please Provide a valid github url"),
