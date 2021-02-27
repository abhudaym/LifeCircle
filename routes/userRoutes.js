import express from "express";
import {
  getUsers,
  registerUser,
  updateCircle,
  authUser,
} from "../controllers/userController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").get(getUsers).post(registerUser);
router.route("/circle").post(protectUser, updateCircle);
router.post("/login", authUser);

export default router;
