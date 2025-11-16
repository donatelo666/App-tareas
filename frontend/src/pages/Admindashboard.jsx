import { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import "../styles/admin-dashboard.css";

import { Chart as ChartJS } from "chart.js/auto";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/admin/tareas/metricas`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setMetrics(data));
  }, []);

  if (!metrics) return <p>Cargando métricas...</p>;

  const estadoData = {
    labels: ["Completadas", "Pendientes"],
    datasets: [
      {
        data: [metrics.completadas, metrics.pendientes],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  const prioridadData = {
    labels: ["Alta", "Media", "Baja"],
    datasets: [
      {
        label: "Tareas por prioridad",
        data: [metrics.alta, metrics.media, metrics.baja],
        backgroundColor: ["#e53935", "#ffb300", "#43a047"],
      },
    ],
  };

  const vencimientoData = {
    labels: ["Vencidas", "Próximas a vencer"],
    datasets: [
      {
        data: [metrics.vencidas, metrics.proximas],
        backgroundColor: ["#d32f2f", "#fbc02d"],
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#dde4ebff", // color de los textos de la leyenda
          font: {
            size: 20, // tamaño de fuente
            weight: "bold", // grosor
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#daccccff", // color de los textos del eje X
          font: {
            size: 16,
          },
        },
      },
      y: {
        ticks: {
          color: "#cdddceff", // color de los textos del eje Y
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1 className="titulo">Dashboard de métricas</h1>
      <div className="cards">
        <div className="card">Total tareas: {metrics.total}</div>
        <div className="card">Completadas: {metrics.completadas}</div>
        <div className="card">Pendientes: {metrics.pendientes}</div>
      </div>

      <div className="charts">
        <div className="chart">
          <h2>Estado de tareas</h2>
          <Pie data={estadoData} options={options} />
        </div>
        <div className="chart">
          <h2>Prioridad de tareas</h2>
          <Bar data={prioridadData} options={options} />
        </div>

        <div className="chart">
          <h2>Tareas vencidas vs próximas</h2>
          <Pie data={vencimientoData} options={options} />
        </div>
      </div>
    </div>
  );
}
