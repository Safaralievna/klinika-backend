import express from "express";

import {
  createPrescription,
  getAllPrescriptions,
  getSinglePrescription,
  updatePrescription,
  deletePrescription
} from "../controllers/prescriptionController.js";

const router = express.Router();

router.post("/", createPrescription);

router.get("/", getAllPrescriptions);

router.get("/:id", getSinglePrescription);

router.put("/:id", updatePrescription);

router.delete("/:id", deletePrescription);

export default router;