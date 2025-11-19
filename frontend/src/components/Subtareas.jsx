// Subtareas
import { useState, useEffect } from "react";
import "../styles/subtareas.css";

const API_URL = import.meta.env.VITE_API_URL;

const Subtareas = ({ tareaId, token }) => {
  const [subtareas, setSubtareas] = useState([]);
  const [nuevaSubtarea, setNuevaSubtarea] = useState("");

  const obtenerSubtareas = async () => {
    const res = await fetch(`${API_URL}/tareas/${tareaId}/subtareas`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setSubtareas(data); // info mysql
  };

  useEffect(() => {
    obtenerSubtareas();
  }, [tareaId]); //renderiza subtareas

  const agregarSubtarea = async (e) => {
    e.preventDefault();
    if (!nuevaSubtarea.trim()) return;

    await fetch(`${API_URL}/tareas/${tareaId}/subtareas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ titulo: nuevaSubtarea }),
    });

    setNuevaSubtarea(""); //pone en vacio
    obtenerSubtareas(); // recarga sub tareas
  };

  //marcar subtareas
  const toggleSubtarea = async (id, estado) => {
    await fetch(`${API_URL}/subtareas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completada: estado }),
    });

    obtenerSubtareas(); // recarga después de marcar
  };

  return (
    <div className="subtareas">
      <form onSubmit={agregarSubtarea}>
        <input
          type="text"
          value={nuevaSubtarea}
          onChange={(e) => setNuevaSubtarea(e.target.value)}
          placeholder="Nueva subtarea"
        />
        <button type="submit">Agregar</button>
      </form>
      {/*lista subtareas iterando con checkbox */}
      <ul className="lista-subtareas">
        {subtareas.map((sub) => (
          <li key={sub.id} className={sub.completada ? "completada" : ""}>
            <input
              type="checkbox"
              checked={sub.completada}
              onChange={() => toggleSubtarea(sub.id, !sub.completada)}
            />
            {sub.titulo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subtareas;
