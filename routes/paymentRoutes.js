import express from "express";

import {
  createPayment,
  getAllPayments,
  getSinglePayment,
  updatePayment,
  deletePayment
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", createPayment);

router.get("/", getAllPayments);

router.get("/:id", getSinglePayment);

router.put("/:id", updatePayment);

router.delete("/:id", deletePayment);

export default router;