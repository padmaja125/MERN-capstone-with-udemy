// validator
import { body, param, validationResult } from "express-validator";

// custom error
import { BadRequestError, DataNotFoundError } from "../errors/customErrors.js";

// model constants imported
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

// mongoose db
import mongoose from "mongoose";

// job model
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

const withValidationError = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job"))
          throw new DataNotFoundError(errorMessages);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationError([
  body("company").notEmpty().withMessage("company name is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("jobLocation is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type value"),
]);

export const validateParamId = withValidationError([
  param("id")
    .custom(async (id) => {
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) throw new BadRequestError("invalid MongoId");
      const job = await Job.findById(id);
      if (!job) throw new DataNotFoundError(`no job with id ${id}`);
    })
    .withMessage("not a valid mongo id"),
]);

export const validateRegisterInput = withValidationError([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("Email already exists");
        }
      } catch (error) {
        throw new Error("Error checking for existing email");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength(8)
    .withMessage("min length should be 8"),
]);

export const validateLoginInput = withValidationError([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);
