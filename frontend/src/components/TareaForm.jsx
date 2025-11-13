//importacion de ref para saltos, estado y efecto , css y notificaciones
import React, { forwardRef, useState, useEffect } from "react";
import "../styles/tarea-form.css";
import { toast } from "react-toastify";

//uso de .env
const API_URL = import.meta.env.VITE_API_URL;

//formulario con referencia de salto , definicionde tareas y edicion
const TareaForm = forwardRef(
  ({ fetchTareas, tareaEditando, setTareaEditando, setBusqueda }, ref) => {
    //estados de campos en vacio y media
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [prioridad, setPrioridad] = useState("media");
    const [fecha_limite, setFechaLimite] = useState("");
    const fechaFormateada = fecha_limite
      ? new Date(fecha_limite).toISOString().split("T")[0]
      : "";

    const validarFormulario = () => {
      if (!titulo.trim()) {
        toast.error("El título es obligatorio");
        return false;
      }

      if (fecha_limite && new Date(fecha_limite) < new Date()) {
        toast.error("La fecha límite no puede estar en el pasado");
        return false;
      }
      return true;
    };

    //pone el token
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (tareaEditando) {
        // Cargar datos en el formulario si hay edicion
        setTitulo(tareaEditando.titulo);
        setDescripcion(tareaEditando.descripcion);
        setPrioridad(tareaEditando.prioridad);
        setFechaLimite(tareaEditando.fecha_limite);
      } else {
        // Limpiar formulario al cancelar edicion
        setTitulo("");
        setDescripcion("");
        setPrioridad("media");
        setFechaLimite("");
      }
    }, [tareaEditando]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validarFormulario()) return;

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
          body: JSON.stringify({
            titulo,
            descripcion,
            prioridad,
            fecha_limite,
          }), //convierte a json
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
        setFechaLimite("");
        fetchTareas(); //devuelve datos a cero, media , null y recarga las tareas
      } catch (err) {
        toast.error(`❌ Error: ${err.message}`);
      }
    };

    return (
      //formulario con referencia, escucha de click, cambio de estado de valores
      //placeholder, campos requeridos y un select
      <form ref={ref} onSubmit={handleSubmit} className="tarea-form">
        <h1>Crear y editar tareas</h1>
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
        <p>Prioridad:</p>
        <select
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value)}
        >
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        <p>Fecha limite:</p>

        <input
          type="date"
          value={fechaFormateada}
          onChange={(e) => setFechaLimite(e.target.value)}
          className="input-fecha"
          required
        />

        <button type="submit">
          {" "}
          {/* doble boton dependiendo de clics de usuario*/}
          {tareaEditando ? "Actualizar tarea" : "Crear tarea"}
        </button>

        {tareaEditando && (
          <button
            type="button"
            onClick={() => setTareaEditando(null)}
            className="btn-cancelar"
          >
            Cancelar edición
          </button>
        )}
      </form>
    );
  }
);

export default TareaForm;
