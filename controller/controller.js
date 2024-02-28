// express async package for avoiding try, catch block for every time
import "express-async-errors";
// status code lib
import { StatusCodes } from "http-status-codes";
// mongo schema
import Job from "../models/jobModel.js";

export const getAllJobs = async (req, res) => {
  //get only the jobs created by the user
  console.log(req.user);
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  res.status(StatusCodes.OK).json({ STATUS: "success", job });
};

export const addJob = async (req, res) => {
  //const { company, position } = req.body;
  // add the created by field to the object while creating it
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ STATUS: "success", job });
};

export const deleteJob = async (req, res) => {
  const removeJob = await Job.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ STATUS: "removed job success", job: removeJob });
};

export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ STATUS: "success", job: updatedJob });
};
