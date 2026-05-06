import db from "../config/db.js";

const createMedicine = async (req, res) => {
  try {

    const {
      prescription_id,
      medicine_name,
      dosage,
      duration
    } = req.body;

    const newMedicine = await db.query(
      `
      INSERT INTO medicines
      (
        prescription_id,
        medicine_name,
        dosage,
        duration
      )

      VALUES ($1, $2, $3, $4)

      RETURNING *
      `,
      [
        prescription_id,
        medicine_name,
        dosage,
        duration
      ]
    );

    res.status(201).json(newMedicine.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const getAllMedicines = async (req, res) => {
  try {

    const medicines = await db.query(
      `
      SELECT
      medicines.*,
      prescriptions.diagnosis

      FROM medicines

      JOIN prescriptions
      ON medicines.prescription_id = prescriptions.id

      ORDER BY medicines.id DESC
      `
    );

    res.json(medicines.rows);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const getSingleMedicine = async (req, res) => {
  try {

    const { id } = req.params;

    const medicine = await db.query(
      `
      SELECT * FROM medicines
      WHERE id = $1
      `,
      [id]
    );

    res.json(medicine.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const updateMedicine = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      prescription_id,
      medicine_name,
      dosage,
      duration
    } = req.body;

    const updatedMedicine = await db.query(
      `
      UPDATE medicines

      SET
      prescription_id = $1,
      medicine_name = $2,
      dosage = $3,
      duration = $4

      WHERE id = $5

      RETURNING *
      `,
      [
        prescription_id,
        medicine_name,
        dosage,
        duration,
        id
      ]
    );

    res.json(updatedMedicine.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const deleteMedicine = async (req, res) => {
  try {

    const { id } = req.params;

    await db.query(
      `
      DELETE FROM medicines
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      message: "Medicine deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export {
  createMedicine,
  getAllMedicines,
  getSingleMedicine,
  updateMedicine,
  deleteMedicine
};