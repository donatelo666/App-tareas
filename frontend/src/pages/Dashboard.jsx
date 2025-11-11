import React, { useEffect, useState } from "react";
import TareaForm from "../components/TareaForm";
import TareaList from "../components/TareaList";
import "../styles/dashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [tareas, setTareas] = useState([]);
  const token = localStorage.getItem("token");

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
      <TareaForm fetchTareas={fetchTareas} />
      <TareaList tareas={tareas} fetchTareas={fetchTareas} />
    </div>
  );
};

export default Dashboard;
