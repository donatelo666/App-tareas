import React from "react";
import TareaItem from "./TareaItem";
import "../styles/tarea-list.css";

const TareaList = ({
  tareas,
  fetchTareas,
  setTareaEditando,
  busqueda,
  filtroPrioridad,
  filtroEstado,
}) => {
  const hoy = new Date();
  if (!tareas.length) return <p className="mensaje-vacio">No hay tareas</p>;

  //filtracion por titulo , descripcion, prioridad , estado y vencimiento

  const tareasFiltradas = tareas.filter((tarea) => {
    const coincideBusqueda =
      tarea.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      tarea.descripcion.toLowerCase().includes(busqueda.toLowerCase());

    const coincidePrioridad =
      filtroPrioridad === "todas" || tarea.prioridad === filtroPrioridad;

    const limite = new Date(tarea.fechaLimite);
    const vencida = limite < hoy;
    const porVencer = limite - hoy < 3 * 24 * 60 * 60 * 1000 && !vencida;

    switch (filtroEstado) {
      case "completadas":
        return tarea.completada;
      case "pendientes":
        return !tarea.completada;
      case "vencidas":
        return !tarea.completada && vencida;
      case "por-vencer":
        return !tarea.completada && porVencer;
      default:
        return coincideBusqueda && coincidePrioridad;
    }
  });

  return (
    <div className="tarea-list">
      {/*itera por tareas para listar */}
      {tareasFiltradas.length > 0 ? (
        tareasFiltradas.map((tarea) => (
          <TareaItem
            key={tarea.id}
            tarea={tarea}
            fetchTareas={fetchTareas}
            setTareaEditando={setTareaEditando}
          />
        ))
      ) : (
        <p>No se encontraron tareas.</p>
      )}
    </div>
  );
};

export default TareaList;
