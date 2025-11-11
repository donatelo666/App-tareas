import React from "react";
import "../styles/tarea-item.css";

const API_URL = import.meta.env.VITE_API_URL;

const TareaItem = ({ tarea, fetchTareas }) => {
  const token = localStorage.getItem("token");

  const toggleCompletada = async () => {
    await fetch(`${API_URL}/tareas/${tarea.id}/completar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completada: !tarea.completada }),
    });
    fetchTareas();
  };

  const eliminarTarea = async () => {
    await fetch(`${API_URL}/tareas/${tarea.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTareas();
  };

  return (
    <div className={`task-item ${tarea.completada ? "completada" : ""}`}>
      <div className="task-content">
        <h3 className="task-title">{tarea.titulo}</h3>
        <p className="task-description">{tarea.descripcion}</p>
        <p className="task-priority">Prioridad: {tarea.prioridad}</p>
      </div>
      <div className="task-actions">
        <button onClick={toggleCompletada}>
          {tarea.completada ? "Marcar pendiente" : "Marcar completada"}
        </button>
        <button onClick={eliminarTarea}>Eliminar</button>
      </div>
    </div>
  );
};

export default TareaItem;
