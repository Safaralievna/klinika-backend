import express from "express";
import { registerDoctor, loginDoctor, getCurrentDoctor } from "../controllers/doctorController.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", registerDoctor);
router.post("/login", loginDoctor);
router.get("/me", protect, getCurrentDoctor);
router.get(
  "/",
  protect,
  adminOnly
);

export default router;