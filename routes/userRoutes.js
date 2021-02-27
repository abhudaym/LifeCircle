import express from "express";
import {
  getUsers,
  registerUser,
  updateCircle,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").get(getUsers).post(registerUser);
router.route("/circle").post(protect, updateCircle);

export default router;
