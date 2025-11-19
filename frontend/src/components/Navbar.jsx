import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css"; //css
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); //define token

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/inicio");
    toast.success("Sesion cerrada");
  }; //funcion cerrar sesion

  //se usa para mostrar o no botones del navbar (si hay token y si es admin o no )
  const user = JSON.parse(localStorage.getItem("user")); // info  directo de mysql

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Gestor de tareas</h1>
      <Link to="/" className="nav-link">
        Inicio
      </Link>
      {/*muestra dashboard solo si hay token  */}
      {!token ? (
        <>
          <Link to="/login" className="nav-link">
            Iniciar sesion
          </Link>
          <Link to="/register" className="nav-link">
            Registro
          </Link>
        </>
      ) : (
        <>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>

          {/* Mostrar solo si el usuario es admin */}
          {user?.rol === "admin" && (
            <Link to="/admin/dashboard" className="nav-link">
              Metricas
            </Link>
          )}

          {/* Mostrar solo si el usuario es admin */}
          {user?.rol === "admin" && (
            <Link to="/admin/usuarios" className="nav-link">
              Ver Usuarios
            </Link>
          )}

          {/* Mostrar solo si el usuario es admin */}
          {user?.rol === "admin" && (
            <Link to="/admin/tareas" className="nav-link">
              Ver Tareas
            </Link>
          )}
          <button onClick={handleLogout} className="logout-button">
            Cerrar sesion
          </button>
        </>
      )}
    </nav>
  );
}
