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
      />
      <TareaList
        tareas={tareas}
        fetchTareas={fetchTareas}
        setTareaEditando={(tarea) => {
          setTareaEditando(tarea);
          formRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </div>
  );
};

export default Dashboard;
