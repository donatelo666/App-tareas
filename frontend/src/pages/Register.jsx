import React, { useState } from "react";
import "../styles/register.css";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al registrar");

      setMensaje("✅ Usuario registrado correctamente");
      setNombre("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(`❌ ${err.message}`);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h2>Registro</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
        {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
