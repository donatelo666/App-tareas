import React from "react";
import "../styles/tarea-item.css";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const TareaItem = ({ tarea, fetchTareas, setTareaEditando }) => {
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
    toast.success("Estado de tarea actualizado bien");
    fetchTareas();
  };

  const eliminarTarea = async () => {
    await fetch(`${API_URL}/tareas/${tarea.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Tarea eliminada correctamente");
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
        <button onClick={() => setTareaEditando(tarea)}>✏️ Editar</button>

        <button onClick={eliminarTarea}>Eliminar</button>
      </div>
    </div>
  );
};

export default TareaItem;
