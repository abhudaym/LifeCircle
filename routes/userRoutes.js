import express from "express";
import {
  getUsers,
  registerUser,
  updateCircle,
  authUser,
  SOS,
  handleSOS,
} from "../controllers/userController.js";
import { protectHospital, protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").get(getUsers).post(registerUser);
router.route("/circle").post(protectUser, updateCircle);
router.route("/sos").put(protectUser, SOS);
router.post("/login", authUser);
router.route("/handleSOS").put(protectUser, handleSOS);

export default router;
