import db from "../config/db.js";

const createPatient = async (req, res) => {
  try {

    const {
      full_name,
      gender,
      date_of_birth,
      phone,
      address,
      blood_group
    } = req.body;

    const newPatient = await db.query(
      `
      INSERT INTO patients
      (full_name, gender, date_of_birth, phone, address, blood_group)
      
      VALUES ($1, $2, $3, $4, $5, $6)

      RETURNING *
      `,
      [
        full_name,
        gender,
        date_of_birth,
        phone,
        address,
        blood_group
      ]
    );

    res.status(201).json(newPatient.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getAllPatients = async (req, res) => {
  try {

    const patients = await db.query(
      `
      SELECT * FROM patients
      ORDER BY id DESC
      `
    );

    res.json(patients.rows);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getSinglePatient = async (req, res) => {
  try {

    const { id } = req.params;

    const patient = await db.query(
      `
      SELECT * FROM patients
      WHERE id = $1
      `,
      [id]
    );

    res.json(patient.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updatePatient = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      full_name,
      gender,
      date_of_birth,
      phone,
      address,
      blood_group
    } = req.body;

    const updatedPatient = await db.query(
      `
      UPDATE patients

      SET
      full_name = $1,
      gender = $2,
      date_of_birth = $3,
      phone = $4,
      address = $5,
      blood_group = $6

      WHERE id = $7

      RETURNING *
      `,
      [
        full_name,
        gender,
        date_of_birth,
        phone,
        address,
        blood_group,
        id
      ]
    );

    res.json(updatedPatient.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deletePatient = async (req, res) => {
  try {

    const { id } = req.params;

    await db.query(
      `
      DELETE FROM patients
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      message: "Patient deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export {
  createPatient,
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient
};