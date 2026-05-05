import express from "express";

import {
  createPatient,
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient
} from "../controllers/patientController.js";

const router = express.Router();

router.post("/", createPatient);

router.get("/", getAllPatients);

router.get("/:id", getSinglePatient);

router.put("/:id", updatePatient);

router.delete("/:id", deletePatient);

export default router;