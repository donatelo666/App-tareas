import { useEffect, useState, useRef } from "react";
import "../styles/admintasks.css";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [taskEditando, setTaskEditando] = useState(null);
  const formRef = useRef(null);
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/admin/tareas`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        return res.json(); // aquí convertimos a JSON
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const eliminarTarea = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>¿Eliminar tarea?</p>
          <button
            onClick={async () => {
              try {
                const res = await fetch(`${API_URL}/admin/tareas/${id}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                });
                if (res.ok) {
                  toast.success("Tarea eliminada correctamente");
                  setTasks((prev) => prev.filter((t) => t.id !== id));
                } else {
                  const data = await res.json();
                  toast.error(data.error || "Error al eliminar tarea");
                }
              } catch {
                toast.error("Error de conexión con el servidor");
              }
              closeToast();
            }}
          >
            Sí
          </button>
          <button onClick={closeToast}>No</button>
        </div>
      ),
      { autoClose: false }
    );
  };

  const guardarTarea = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/tareas/${taskEditando.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(taskEditando),
      });

      if (res.ok) {
        toast.success("Tarea actualizada correctamente");
        setTasks((prev) =>
          prev.map((t) => (t.id === taskEditando.id ? taskEditando : t))
        );
        setTaskEditando(null);
      } else {
        const data = await res.json();
        toast.error(data.error || "Error al actualizar tarea");
      }
    } catch {
      toast.error("Error de conexión con el servidor");
    }
  };

  const iniciarEdicion = (tarea) => {
    setTaskEditando(tarea);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };
  console.log("Estado tasks:", tasks);

  return (
    <div className="tareas-container">
      <h2>Tareas registradas</h2>
      <table className="tareas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
            <th>Fecha limite</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.titulo}</td>
              <td>{t.descripcion}</td>
              <td>{t.fecha_limite.split("T")[0]}</td>

              <td>
                <button
                  className="btn btn-edit"
                  onClick={() => iniciarEdicion(t)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => eliminarTarea(t.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {taskEditando && (
        <div ref={formRef} className="editar-tarea-form">
          <h3>Editar Tarea</h3>
          <label>
            Título:
            <input
              type="text"
              value={taskEditando.titulo}
              onChange={(e) =>
                setTaskEditando({ ...taskEditando, titulo: e.target.value })
              }
            />
          </label>
          <label>
            Descripción:
            <input
              type="text"
              value={taskEditando.descripcion}
              onChange={(e) =>
                setTaskEditando({
                  ...taskEditando,
                  descripcion: e.target.value,
                })
              }
            />
          </label>
          <label>
            Fecha limite:
            <input
              type="date"
              value={taskEditando.fecha_limite}
              onChange={(e) =>
                setTaskEditando({
                  ...taskEditando,
                  fecha_limite: e.target.value,
                })
              }
            />
          </label>
          <label>
            Completada:
            <select
              value={taskEditando.completada ? "true" : "false"}
              onChange={(e) =>
                setTaskEditando({
                  ...taskEditando,
                  completada: e.target.value === "true",
                })
              }
            >
              <option value="false">Pendiente</option>
              <option value="true">Completada</option>
            </select>
          </label>
          <label>
            Prioridad:
            <select
              value={taskEditando.prioridad}
              onChange={(e) =>
                setTaskEditando({ ...taskEditando, prioridad: e.target.value })
              }
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </label>
          <div className="form-actions">
            <button className="btn btn-edit" onClick={guardarTarea}>
              Guardar
            </button>
            <button
              className="btn btn-delete"
              onClick={() => setTaskEditando(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
