import { useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <img
        src="/img/dragon2.jpg"
        alt="dragon de la app"
        className="home-image"
      />

      <h1>Bienvenido al gestor de Tareas</h1>
      <p>
        Organiza tus pendientes, gestiona prioridades y mantente productivo.
      </p>
      <div className="button-group">
        <button onClick={() => navigate("/login")}>Iniciar Sesión</button>
        <button onClick={() => navigate("/register")}>Registrarse</button>
      </div>
    </div>
  );
}
