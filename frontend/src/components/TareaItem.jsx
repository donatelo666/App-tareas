import { React, useEffect, useState } from "react";
import "../styles/tarea-item.css";
import { toast } from "react-toastify";
import Subtareas from "./Subtareas";

const API_URL = import.meta.env.VITE_API_URL;

const TareaItem = ({ tarea, fetchTareas, setTareaEditando }) => {
  const token = localStorage.getItem("token");
  const hoy = new Date();
  const limite = new Date(tarea.fecha_limite);
  const vencida = limite < hoy;
  const porVencer = limite - hoy < 3 * 24 * 60 * 60 * 1000; // menos de 3 días
  const [visible, setVisible] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const toggleCompletada = async () => {
    await fetch(`${API_URL}/tareas/${tarea.id}/completar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completada: !tarea.completada }),
    });
    toast.success("Estado de tarea actualizado");
    fetchTareas();
  };

  const confirmarEliminacion = async () => {
    await fetch(`${API_URL}/tareas/${tarea.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Tarea eliminada correctamente");
    fetchTareas();
    setMostrarModal(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`task-item tarea-item tarea
    ${tarea.completada ? "completada" : ""}
    ${vencida ? "vencida" : porVencer ? "por-vencer" : ""}
    ${visible ? "visible" : ""}
  `}
    >
      <div className="task-content">
        <h3 className="task-title">{tarea.titulo}</h3>

        <p className="task-description">{tarea.descripcion}</p>
        <p className="task-priority">Prioridad: {tarea.prioridad}</p>

        <p className="fecha-limite">
          Vence: {new Date(tarea.fecha_limite).toLocaleDateString()}
        </p>
        <Subtareas tareaId={tarea.id} token={token} />
      </div>
      <div className="task-actions">
        <button onClick={toggleCompletada}>
          {tarea.completada ? "Marcar pendiente" : "Marcar completada"}
        </button>
        <button onClick={() => setTareaEditando(tarea)}>✏️ Editar</button>
        <button onClick={() => setMostrarModal(true)}>Eliminar</button>
      </div>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>¿Estás seguro de que quieres eliminar esta tarea?</p>
            <div className="modal-buttons">
              <button onClick={confirmarEliminacion}>Sí, eliminar</button>
              <button onClick={() => setMostrarModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TareaItem;
