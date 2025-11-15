//crear contraseñas encriptadas
const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 10; // nivel de seguridad, 10 es estándar
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Ejemplo de uso
(async () => {
  const plainPassword = "donnie";
  const hashed = await hashPassword(plainPassword);
  console.log("Password hasheado:", hashed);
})();
