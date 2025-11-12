//importacion de ref para saltos, estado y efecto , css y notificaciones
import React, { forwardRef, useState, useEffect } from "react";
import "../styles/tarea-form.css";
import { toast } from "react-toastify";

//uso de .env
const API_URL = import.meta.env.VITE_API_URL;

//formulario con referencia de salto , definicionde tareas y edicion
const TareaForm = forwardRef(
  ({ fetchTareas, tareaEditando, setTareaEditando }, ref) => {
    //estados de campos en vacio y media
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [prioridad, setPrioridad] = useState("media");

    //pone el token
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (tareaEditando) {
        setTitulo(tareaEditando.titulo);
        setDescripcion(tareaEditando.descripcion);
        setPrioridad(tareaEditando.prioridad);
      }
    }, [tareaEditando]); //toma los datos si hay

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!token) {
        toast.error("No hay sesión iniciada, debes registrarte antes");
        return; //error ausencia de token
      }

      const url = tareaEditando
        ? `${API_URL}/tareas/${tareaEditando.id}`
        : `${API_URL}/tareas`; //rutas de editar o crear

      const method = tareaEditando ? "PUT" : "POST"; //selecciona

      try {
        const res = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //token
          },
          body: JSON.stringify({ titulo, descripcion, prioridad }), //convierte a json
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || `Error ${res.status}`);
        } //error por respuesta errada

        //doble notificacion
        toast.success(
          tareaEditando
            ? "Tarea actualizada con exito"
            : "Tarea creada con exito"
        );
        setTitulo("");
        setDescripcion("");
        setPrioridad("media");
        setTareaEditando(null);
        fetchTareas(); //devuelve datos a cero, media , null y recarga las tareas
      } catch (err) {
        toast.error(`❌ Error: ${err.message}`);
      }
    };

    return (
      //formulario con referencia, escucha de click, cambio de estado de valores
      //placeholder, campos requeridos y un select
      <form ref={ref} onSubmit={handleSubmit} className="tarea-form">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <select
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value)}
        >
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>

        <button type="submit">
          {" "}
          {/* doble boton dependiendo de clics de usuario*/}
          {tareaEditando ? "Actualizar tarea" : "Crear tarea"}
        </button>
      </form>
    );
  }
);

export default TareaForm;
