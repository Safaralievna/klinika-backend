import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//Register doctor

const registerDoctor = async (req, res) => {
  try {
    const {
      full_name,
      specialization,
      phone,
      email,
      password,
      experience_year,
      room_number,
    } = req.body;

    //email tekshirish
    const existingDoctor = await db.query(
      "SELECT * FROM doctors WHERE email = $1",
      [email],
    );

    if (existingDoctor.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Bu email allaqachon ro'yxatdan o'tgan" });
    }

    //Passwordni hashing qiliw
    const hashedPassword = await bcrypt.hash(password, 10);

    //Insert doctor
    const newDoctor = await db.query(
      `INSERT INTO doctors
        (full_name,specialization,phone,email,password,experience_year,room_number)
        VALUES($1,$2,$3,$4,$5,$6,$7)
        RETURNING *`,
      [
        full_name,
        specialization,
        phone,
        email,
        hashedPassword,
        experience_year,
        room_number,
      ],
    );

    res.status(201).json({
        message:"Shifokor muvaffaqiyatli ro'yxatdan o'tdi",
        doctor:newDoctor.rows[0]
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({ 
        message: "Server xatosi" 
    });
  }
};


//Login qilish

const loginDoctor = async (req,res) => {
    try {
        const {email,password} = req.body;

        //doctorni tekshirish
        const doctor = await db.query(
            "SELECT * FROM doctors WHERE email = $1",
            [email]
        );

        if (doctor.rows.length === 0){
            return res.status(400).json({
                message:"Doktor topilmadi!"
            });
        }

        //parolni taqqoslash
        const validPassword = await bcrypt.compare(
            password,
            doctor.rows[0].password
        );

        if(!validPassword){
            return res.status(400).json({
                message:"Noto'g'ri parol"
            });
        }

        //token
        const token = jwt.sign(
            {
                id: doctor.rows[0].id,
                role: doctor.rows[0].role
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.status(200).json({
            message: "Login succesful",
            token
        });

    }catch (error) {
        console.log(error);

        res.status(500).json({ 
            message: "Server xatosi" 
        });
    }
};


const getCurrentDoctor = async (req, res) => {

  try {

    const doctor = await db.query(
      `
      SELECT
      id,
      full_name,
      specialization,
      phone,
      email,
      experience_year,
      room_number

      FROM doctors

      WHERE id = $1
      `,
      [req.user.id]
    );

    res.json(doctor.rows[0]);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


export  {
    registerDoctor,
    loginDoctor,
    getCurrentDoctor
};
