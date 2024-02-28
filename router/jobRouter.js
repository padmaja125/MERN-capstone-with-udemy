import { Router } from "express";

// validateJobInput is imported
import {
  validateJobInput,
  validateParamId,
} from "../middleWare/validateMiddleWare.js";

const router = Router();

import {
  getAllJobs,
  getJob,
  addJob,
  deleteJob,
  updateJob,
} from "../controller/controller.js";

router.route("/jobs").get(getAllJobs).post(validateJobInput, addJob);
router
  .route("/job/:id")
  .get(validateParamId, getJob)
  .patch(validateJobInput, validateParamId, updateJob)
  .delete(validateParamId, deleteJob);

export default router;
