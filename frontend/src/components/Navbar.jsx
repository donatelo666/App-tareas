import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/inicio");
    toast.success("Sesion cerrada");
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">App tareas xd</h1>
      <Link to="/" className="nav-link">
        Inicio
      </Link>
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
          <button onClick={handleLogout} className="logout-button">
            Cerrar sesion
          </button>
        </>
      )}
    </nav>
  );
}
