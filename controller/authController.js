// express async package for avoiding try, catch block for every time
import "express-async-errors";
// status code lib
import { StatusCodes } from "http-status-codes";
// mongo schema
import User from "../models/userModel.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
// custom error
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJwt } from "../utils/tokenUtils.js";
import { cookie } from "express-validator";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError("invalid user");
  const token = createJwt({ userId: user._id, role: user.role });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "success" });
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "logout successfully" });
};
