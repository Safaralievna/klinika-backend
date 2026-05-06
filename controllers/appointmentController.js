import db from "../config/db.js";

const createAppointment = async (req, res) => {
  try {

    const {
      patient_id,
      doctor_id,
      appointment_date,
      appointment_time,
      status,
      notes
    } = req.body;

    const newAppointment = await db.query(
      `
      INSERT INTO appointments
      (
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        status,
        notes
      )

      VALUES ($1, $2, $3, $4, $5, $6)

      RETURNING *
      `,
      [
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        status,
        notes
      ]
    );

    res.status(201).json(newAppointment.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const getAllAppointments = async (req, res) => {
  try {

    const appointments = await db.query(
      `
      SELECT
      appointments.*,
      patients.full_name AS patient_name,
      doctors.full_name AS doctor_name

      FROM appointments

      JOIN patients
      ON appointments.patient_id = patients.id

      JOIN doctors
      ON appointments.doctor_id = doctors.id

      ORDER BY appointments.id DESC
      `
    );

    res.json(appointments.rows);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const getSingleAppointment = async (req, res) => {
  try {

    const { id } = req.params;

    const appointment = await db.query(
      `
      SELECT * FROM appointments
      WHERE id = $1
      `,
      [id]
    );

    res.json(appointment.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const updateAppointment = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      patient_id,
      doctor_id,
      appointment_date,
      appointment_time,
      status,
      notes
    } = req.body;

    const updatedAppointment = await db.query(
      `
      UPDATE appointments

      SET
      patient_id = $1,
      doctor_id = $2,
      appointment_date = $3,
      appointment_time = $4,
      status = $5,
      notes = $6

      WHERE id = $7

      RETURNING *
      `,
      [
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        status,
        notes,
        id
      ]
    );

    res.json(updatedAppointment.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const deleteAppointment = async (req, res) => {
  try {

    const { id } = req.params;

    await db.query(
      `
      DELETE FROM appointments
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      message: "Appointment deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getDoctorAppointments = async (req, res) => {

  try {

    const appointments = await db.query(
      `
      SELECT
      appointments.*,
      patients.full_name AS patient_name

      FROM appointments

      JOIN patients
      ON appointments.patient_id = patients.id

      WHERE doctor_id = $1

      ORDER BY appointments.id DESC
      `,
      [req.user.id]
    );

    res.json(appointments.rows);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export {
  createAppointment,
  getAllAppointments,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
  getDoctorAppointments
};