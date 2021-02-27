import express from "express";
import {
  getUsers,
  registerUser,
  updateCircle,
  authUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").get(getUsers).post(registerUser);
router.route("/circle").post(protect, updateCircle);
router.post("/login", authUser);

export default router;
