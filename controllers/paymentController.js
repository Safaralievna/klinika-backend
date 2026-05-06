import db from "../config/db.js";

const createPayment = async (req, res) => {
  try {

    const {
      appointment_id,
      amount,
      payment_method,
      payment_status,
      paid_at
    } = req.body;

    const newPayment = await db.query(
      `
      INSERT INTO payments
      (
        appointment_id,
        amount,
        payment_method,
        payment_status,
        paid_at
      )

      VALUES ($1, $2, $3, $4, $5)

      RETURNING *
      `,
      [
        appointment_id,
        amount,
        payment_method,
        payment_status,
        paid_at
      ]
    );

    res.status(201).json(newPayment.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const getAllPayments = async (req, res) => {
  try {

    const payments = await db.query(
      `
      SELECT
      payments.*,
      patients.full_name AS patient_name,
      doctors.full_name AS doctor_name

      FROM payments

      JOIN appointments
      ON payments.appointment_id = appointments.id

      JOIN patients
      ON appointments.patient_id = patients.id

      JOIN doctors
      ON appointments.doctor_id = doctors.id

      ORDER BY payments.id DESC
      `
    );

    res.json(payments.rows);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const getSinglePayment = async (req, res) => {
  try {

    const { id } = req.params;

    const payment = await db.query(
      `
      SELECT * FROM payments
      WHERE id = $1
      `,
      [id]
    );

    res.json(payment.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const updatePayment = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      appointment_id,
      amount,
      payment_method,
      payment_status,
      paid_at
    } = req.body;

    const updatedPayment = await db.query(
      `
      UPDATE payments

      SET
      appointment_id = $1,
      amount = $2,
      payment_method = $3,
      payment_status = $4,
      paid_at = $5

      WHERE id = $6

      RETURNING *
      `,
      [
        appointment_id,
        amount,
        payment_method,
        payment_status,
        paid_at,
        id
      ]
    );

    res.json(updatedPayment.rows[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


const deletePayment = async (req, res) => {
  try {

    const { id } = req.params;

    await db.query(
      `
      DELETE FROM payments
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      message: "Payment deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export {
  createPayment,
  getAllPayments,
  getSinglePayment,
  updatePayment,
  deletePayment
};