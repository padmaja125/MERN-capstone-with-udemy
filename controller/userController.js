// status code lib
import { StatusCodes } from "http-status-codes";
// mongo schema
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";
// express async package for avoiding try, catch block for every time
import "express-async-errors";

//image api
import cloudinary from "cloudinary";
//file system manage
import { promises as fs } from "fs";

export const getCurrentUser = async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findOne({ _id: userId });
  const userWithoutPass = user.toJson();
  res.json({ user: userWithoutPass });
};

export const getApplicationContents = async (req, res) => {
  const userCount = await User.countDocuments();
  const jobsCount = await Job.countDocuments();
  res.json({ user: userCount, jobs: jobsCount });
};

export const updateUserDetails = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;

  //upload and unlink the path
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    console.log(response);
    obj.avatar = response.secure_url
    obj.avatarPublicId = response.public_id
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
  // if wants the updated one as the response {new: true}
  //   const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body, {
  //   new: true,
  // });
  
//if file and publicId already present then destroy them
  if(req.file && obj.avatarPublicId){
    await cloudinary.v2.uploader.destroy(obj.avatarPublicId)
  }
  res.json({ msg: "updated" });
};
