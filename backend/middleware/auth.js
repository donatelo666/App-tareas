// token con jwt
import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("❌ No se recibió Authorization header");
    return res.status(401).json({ error: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    // decoded contiene { id, nombre, email, rol }
    next(); //  continuar al siguiente middleware/controlador
  } catch (err) {
    console.error("❌ Token inválido: inicia sesion nuevamente", err.message);
    res.status(403).json({ error: "Token inválido" });
  }
};
