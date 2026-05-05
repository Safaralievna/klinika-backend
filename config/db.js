import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: "klinika_db_ii4e_user",

  host: "dpg-d7s4qja8qa3s73dt2mmg-a.oregon-postgres.render.com",

  database: "klinika_db_ii4e",

  password: "btK6txfYiz8UCHhFccjCDgypZO0IlBaw",

  port: 5432,

  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;