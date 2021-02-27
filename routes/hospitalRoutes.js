import express from "express";
import {
  getHospitals,
  registerHospital,
} from "../controllers/hospitalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").post(registerHospital).get(getHospitals);
// router.post("/login", authUser);

export default router;
