import { useEffect, useState } from "react";
import "../styles/adminusers.css";
import { toast } from "react-toastify";
import { useRef } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usuarioEditando, setUsuarioEditando] = useState(null); // nuevo estado
  const formRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/admin/usuarios`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Acceso denegado o error en el servidor");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const iniciarEdicion = (usuario) => {
    setUsuarioEditando(usuario);
    // pequeño delay para asegurar que el formulario se renderice
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Confirmación
  const confirmarEliminacion = (callback) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>¿Eliminar usuario?</p>
          <button
            onClick={() => {
              callback();
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

  // Función para eliminar usuario
  const eliminarUsuario = (id) => {
    confirmarEliminacion(async () => {
      try {
        const res = await fetch(`${API_URL}/admin/usuarios/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.ok) {
          toast.success("Usuario eliminado correctamente");
          setUsers((prev) => prev.filter((u) => u.id !== id));
        } else {
          const data = await res.json();
          toast.error(data.error || "Error al eliminar usuario");
        }
      } catch (err) {
        toast.error("Error de conexión con el servidor");
      }
    });
  };

  // Función para guardar edición
  const guardarUsuario = async () => {
    try {
      const res = await fetch(
        `${API_URL}/admin/usuarios/${usuarioEditando.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(usuarioEditando),
        }
      );

      if (res.ok) {
        toast.success("Usuario actualizado correctamente");
        setUsers((prev) =>
          prev.map((u) => (u.id === usuarioEditando.id ? usuarioEditando : u))
        );
        setUsuarioEditando(null);
      } else {
        const data = await res.json();
        toast.error(data.error || "Error al actualizar usuario");
      }
    } catch (err) {
      toast.error("Error de conexión con el servidor");
    }
  };

  return (
    <div className="usuarios-container">
      <h2>Usuarios registrados</h2>
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>
                <button
                  className="btn btn-edit"
                  onClick={() => iniciarEdicion(u)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => eliminarUsuario(u.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {usuarioEditando && (
        <div className="editar-usuario-form" ref={formRef}>
          <h3>Editar Usuario</h3>
          <label>
            Nombre:
            <input
              type="text"
              value={usuarioEditando.nombre}
              onChange={(e) =>
                setUsuarioEditando({
                  ...usuarioEditando,
                  nombre: e.target.value,
                })
              }
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={usuarioEditando.email}
              onChange={(e) =>
                setUsuarioEditando({
                  ...usuarioEditando,
                  email: e.target.value,
                })
              }
            />
          </label>
          <label>
            Rol:
            <select
              value={usuarioEditando.rol}
              onChange={(e) =>
                setUsuarioEditando({ ...usuarioEditando, rol: e.target.value })
              }
            >
              <option value="usuario">Usuario</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <div className="form-actions">
            <button className="btn btn-edit" onClick={guardarUsuario}>
              Guardar
            </button>
            <button
              className="btn btn-delete"
              onClick={() => setUsuarioEditando(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
