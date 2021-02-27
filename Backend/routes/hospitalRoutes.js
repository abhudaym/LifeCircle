import express from "express";
import {
  addAmbulance,
  getHospitals,
  authUser,
  registerHospital,
} from "../controllers/hospitalController.js";
import { protectHospital } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").post(registerHospital).get(getHospitals);
router.route("/ambulance").put(protectHospital, addAmbulance);
router.post("/login", authUser);

export default router;
