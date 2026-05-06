import db from "../config/db.js";

const createPrescription = async (req, res) => {
  try {

    const {
      appointment_id,
      diagnosis,
      notes
    } = req.body;

    const newPrescription = await db.query(
      `
      INSERT INTO prescriptions
      (
        appointment_id,
        diagnosis,
        notes
      )

      VALUES ($1, $2, $3)

      RETURNING *
      `,
      [
        appointment_id,
        diagnosis,
        notes
      ]
    );

    res.status(201).json(newPrescription.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const getAllPrescriptions = async (req, res) => {
  try {

    const prescriptions = await db.query(
      `
      SELECT
      prescriptions.*,
      patients.full_name AS patient_name,
      doctors.full_name AS doctor_name

      FROM prescriptions

      JOIN appointments
      ON prescriptions.appointment_id = appointments.id

      JOIN patients
      ON appointments.patient_id = patients.id

      JOIN doctors
      ON appointments.doctor_id = doctors.id

      ORDER BY prescriptions.id DESC
      `
    );

    res.json(prescriptions.rows);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const getSinglePrescription = async (req, res) => {
  try {

    const { id } = req.params;

    const prescription = await db.query(
      `
      SELECT * FROM prescriptions
      WHERE id = $1
      `,
      [id]
    );

    res.json(prescription.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const updatePrescription = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      appointment_id,
      diagnosis,
      notes
    } = req.body;

    const updatedPrescription = await db.query(
      `
      UPDATE prescriptions

      SET
      appointment_id = $1,
      diagnosis = $2,
      notes = $3

      WHERE id = $4

      RETURNING *
      `,
      [
        appointment_id,
        diagnosis,
        notes,
        id
      ]
    );

    res.json(updatedPrescription.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const deletePrescription = async (req, res) => {
  try {

    const { id } = req.params;

    await db.query(
      `
      DELETE FROM prescriptions
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      message: "Prescription deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export {
  createPrescription,
  getAllPrescriptions,
  getSinglePrescription,
  updatePrescription,
  deletePrescription
};