import { Router } from "express";

import { register, login, logout } from "../controller/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleWare/validateMiddleWare.js";

const router = Router();

router.route("/login").post(validateLoginInput, login);
router.route("/register").post(validateRegisterInput, register);
router.route("/logout").post(logout);
export default router;
