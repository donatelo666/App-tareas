import React from "react";
import TareaItem from "./TareaItem";
import "../styles/tarea-list.css";

const TareaList = ({ tareas, fetchTareas }) => {
  if (!tareas.length) return <p>No hay tareas</p>;

  return (
    <div className="tarea-list">
      {tareas.map((tarea) => (
        <TareaItem key={tarea.id} tarea={tarea} fetchTareas={fetchTareas} />
      ))}
    </div>
  );
};

export default TareaList;
