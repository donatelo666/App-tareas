// is-admin.js middleware
export function isAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ message: "Usuario no autenticado" });
  }

  if (req.user.rol !== "admin") {
    return res.status(403).json({ message: "Acceso denegado" });
  }

  next();
}
