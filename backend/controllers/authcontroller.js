//authController con modulos , conexion a base de datos
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import conexion from "../config/database.js";

//registro
export const register = async (req, res) => {
  const { nombre, email, password } = req.body;
  console.log({ nombre, email, password });

  try {
    const [exist] = await conexion.query(
      "SELECT * FROM usuarios WHERE email=?",
      [email]
    );

    if (exist.length)
      return res.status(400).json({ error: "Usuario ya existe" });

    const hash = await bcrypt.hash(password, 10);

    await conexion.query(
      "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
      [nombre, email, hash]
    );

    res.status(201).json({ mensaje: "Usuario creado" });
  } catch (err) {
    console.error("Error en registro:", err.message);
    res.status(500).json({ error: err.message });
  }
};

//login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //verificacion por email
    const [user] = await conexion.query(
      "SELECT * FROM usuarios WHERE email=?",
      [email]
    );
    if (!user.length)
      return res.status(400).json({ error: "Usuario no encontrado" });

    //comparacion de contraseña
    const valid = await bcrypt.compare(password, user[0].password);
    if (!valid) return res.status(400).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token }); //pone el token
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
