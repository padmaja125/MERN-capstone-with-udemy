import { Router } from "express";

import {
  getCurrentUser,
  updateUserDetails,
  getApplicationContents,
} from "../controller/userController.js";

import {
  authenticateCheck,
  authorizePermissions,
} from "../middleWare/authMiddleWare.js";

const router = Router();
router.route("/current-user").get(authenticateCheck, getCurrentUser);
router
  .route("/admin/app-stats")
  .get(authorizePermissions("admin"), getApplicationContents);
router.route("/update-user").patch(updateUserDetails);

export default router;
