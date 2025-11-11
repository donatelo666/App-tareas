import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      {!token ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Registro</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}
