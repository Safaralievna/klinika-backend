import express from "express";
import { registerDoctor, loginDoctor, getCurrentDoctor } from "../controllers/doctorController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerDoctor);
router.post("/login", loginDoctor);
router.get("/me", protect, getCurrentDoctor);
export default router;