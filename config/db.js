import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "klinika_db",
  password: "qwerty2025",
  port: 5432,
});

export default pool;