//conexion a base de datos
import conexion from "../config/database.js";

export const verUsuarios = async (req, res) => {
  try {
    const [rows] = await conexion.query(
      "SELECT id, nombre, email, rol FROM usuarios"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};
