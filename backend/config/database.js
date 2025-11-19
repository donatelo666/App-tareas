// database , mysql ,  uso dotenv
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const conexion = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

//conexion con console log y exportacion
conexion
  .getConnection()
  .then(() => console.log("✅ Conexión a MySQL exitosa"))
  .catch((err) => console.error("❌ Error de conexión:", err.message));

export default conexion;
