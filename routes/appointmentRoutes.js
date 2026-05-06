import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
  getDoctorAppointments
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", createAppointment);

router.get("/", getAllAppointments);

router.get("/doctor/me", protect, getDoctorAppointments);

router.get("/:id", getSingleAppointment);

router.put("/:id", updateAppointment);

router.delete("/:id", deleteAppointment);


export default router;