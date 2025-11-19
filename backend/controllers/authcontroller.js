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
      return res.status(400).json({ error: "Usuario ya existe" }); //error

    const hash = await bcrypt.hash(password, 10); //encriptacion

    await conexion.query(
      "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
      [nombre, email, hash]
    ); //insercion

    res.status(201).json({ mensaje: "Usuario creado" });
  } catch (err) {
    console.error("Error en registro:", err.message);
    res.status(500).json({ error: err.message });
  }
};

//ruta login con seguridad  mas datos de usuario para usar en el login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // verificación por email
    const [rows] = await conexion.query(
      "SELECT * FROM usuarios WHERE email=?",
      [email]
    );

    if (!rows.length)
      return res.status(400).json({ error: "Usuario no encontrado" });

    const user = rows[0]; // aquí ya tienes el objeto usuario

    // comparación de contraseña
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Contraseña incorrecta" });

    // generar token con datos del usuario
    const token = jwt.sign(
      { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // 1hora
    );

    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      }, // user para usar en el frontend y otras rutas
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
