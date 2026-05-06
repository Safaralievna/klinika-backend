import express from "express";

import {
  createMedicine,
  getAllMedicines,
  getSingleMedicine,
  updateMedicine,
  deleteMedicine
} from "../controllers/medicineController.js";

const router = express.Router();

router.post("/", createMedicine);

router.get("/", getAllMedicines);

router.get("/:id", getSingleMedicine);

router.put("/:id", updateMedicine);

router.delete("/:id", deleteMedicine);

export default router;