import { Router } from "express";

// validateJobInput is imported
import {
  validateJobInput,
  validateParamId,
} from "../middleWare/validateMiddleWare.js";

import { testUserCheck } from "../middleWare/authMiddleWare.js";
const router = Router();

import {
  getAllJobs,
  getJob,
  addJob,
  deleteJob,
  updateJob,
} from "../controller/jobController.js";
// before getting to add/update/delete job, need to check whether it's a test user
router.route("/jobs").get(getAllJobs).post(testUserCheck,validateJobInput, addJob);
router
  .route("/job/:id")
  .get(validateParamId, getJob)
  .patch(testUserCheck,validateJobInput, validateParamId, updateJob)
  .delete(testUserCheck,validateParamId, deleteJob);

export default router;
