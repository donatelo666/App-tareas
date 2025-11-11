import React, { useState } from "react";
import "../styles/tarea-form.css";

const API_URL = import.meta.env.VITE_API_URL;

const TareaForm = ({ fetchTareas }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("media");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!token) {
      setError("No hay token. Inicia sesión para crear tareas.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/tareas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo, descripcion, prioridad }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || `Error ${res.status}`);
      }

      setTitulo("");
      setDescripcion("");
      setPrioridad("media");
      setMensaje("✅ Tarea creada correctamente");
      fetchTareas();
    } catch (err) {
      setError(`❌ Error al crear tarea: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="tarea-form">
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>
      <button type="submit">Crear tarea</button>

      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default TareaForm;
