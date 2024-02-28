import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

const jobSchema = mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.APPLIED,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "My Location",
    },
    createdBy:{
      type: mongoose.Types.ObjectId,
      ref : "user"
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);
