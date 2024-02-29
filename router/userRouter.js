import { Router } from "express";

import {
  getCurrentUser,
  updateUserDetails,
  getApplicationContents,
} from "../controller/userController.js";

const router = Router();
router.route("/current-user").get(getCurrentUser);
router.route("/admin/app-stats").get(getApplicationContents);
router.route("/update-user").patch(updateUserDetails);

export default router;
