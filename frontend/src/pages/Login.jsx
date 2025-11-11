import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al iniciar sesión");

      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard"; // fuerza recarga y reevaluación del token
    } catch (err) {
      setError(`❌ ${err.message}`);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Iniciar sesión</h2>
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
        <button type="submit">Entrar</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
