import React, { useEffect, useState } from "react";
import { useRef } from "react";
import TareaForm from "../components/TareaForm";
import TareaList from "../components/TareaList";
import "../styles/dashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const formRef = useRef();
  const [tareas, setTareas] = useState([]);
  const [tareaEditando, setTareaEditando] = useState(null);
  const token = localStorage.getItem("token");
  const [busqueda, setBusqueda] = useState("");
  //filtros multiples
  const [filtroPrioridad, setFiltroPrioridad] = useState("todas");
  const [filtroEstado, setFiltroEstado] = useState("todas");

  const fetchTareas = async () => {
    try {
      const res = await fetch(`${API_URL}/tareas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTareas(data);
    } catch (err) {
      console.error("Error al obtener tareas:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTareas();
    } else {
      console.warn("No hay token. Redirigiendo o esperando login...");
    }
  }, []);

  return (
    <div className="dashboard-container">
      <TareaForm
        ref={formRef}
        fetchTareas={fetchTareas}
        tareaEditando={tareaEditando}
        setTareaEditando={setTareaEditando}
        setBusqueda={setBusqueda} // prop para buscar
      />
      <h2 className="buscador-i">Buscador inteligente</h2>

      <div className="contenedor-buscador">
        <input
          type="text"
          placeholder="Buscar tarea o descripcion..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador"
        />

        <select
          value={filtroPrioridad}
          onChange={(e) => setFiltroPrioridad(e.target.value)}
          className="filtro-prioridad"
        >
          <option value="todas">--Prioridad--</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>

        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="filtro-estado"
        >
          <option value="todas">--Estado--</option>
          <option value="pendientes">Pendientes</option>
          <option value="completadas">Completadas</option>
          <option value="vencidas">Vencidas</option>
          <option value="por-vencer">Por vencer</option>
        </select>
      </div>

      <TareaList
        tareas={tareas}
        fetchTareas={fetchTareas}
        setTareaEditando={(tarea) => {
          setTareaEditando(tarea);
          formRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
        busqueda={busqueda}
        filtroPrioridad={filtroPrioridad}
      />
    </div>
  );
};

export default Dashboard;
