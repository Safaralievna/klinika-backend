import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./config/db.js";
import doctorRoutes from "./routes/doctorRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

db.connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch(err => console.log(err));


//API routes
app.use("/api/doctors", doctorRoutes);




app.get("/", (req, res) => {
  res.send("Klinika API ishlayapti");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});