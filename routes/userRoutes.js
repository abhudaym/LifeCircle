import express from "express";
import {
  getUsers,
  registerUser,
  updateCircle,
  authUser,
  SOS,
  handleSOS,
  getUserInfo,
} from "../controllers/userController.js";
import { protectHospital, protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").get(getUsers).put(registerUser);
router.route("/circle").post(protectUser, updateCircle);
router.route("/SOS").put(protectUser, SOS);
router.post("/login", authUser);
router.route("/handleSOS").put(protectUser, handleSOS);
router.route("/profile").get(protectUser, getUserInfo);

export default router;
