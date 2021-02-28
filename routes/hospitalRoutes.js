import express from "express";
import {
  addAmbulance,
  getHospitals,
  authUser,
  registerHospital,
  getHospitalInfo,
} from "../controllers/hospitalController.js";
import { protectHospital } from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/").post(registerHospital).get(getHospitals);
router.route("/ambulance").put(protectHospital, addAmbulance);
router.post("/login", authUser);
router.route("/profile").get(protectHospital, getHospitalInfo);

export default router;
