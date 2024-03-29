import { Router } from "express";

import {
  getCurrentUser,
  updateUserDetails,
  getApplicationContents,
} from "../controller/userController.js";

import {
  authenticateCheck,
  authorizePermissions,
  testUserCheck
} from "../middleWare/authMiddleWare.js";

//for update
import { validateUpdateUserInput } from "../middleWare/validateMiddleWare.js";
import upload from "../middleWare/muleMiddleWare.js";

const router = Router();
router.route("/current-user").get(authenticateCheck, getCurrentUser);
router
  .route("/admin/app-stats")
  .get(authorizePermissions("admin"), getApplicationContents);
// router
//   .route("/update-user")
//   .patch(upload.single("avatar"), validateUpdateUserInput, updateUserDetails);


// before update we need to check its a test user
router.patch(
  "/update-user",
  upload.single("avatar"),
  testUserCheck,
  validateUpdateUserInput,
  updateUserDetails
);

export default router;
