//conexion a base de datos
import conexion from "../config/database.js";

//consulta de tareas por fecha y mas
export const obtenerTareas = async (req, res) => {
  try {
    const [tareas] = await conexion.query(
      `SELECT id, titulo, descripcion, prioridad, fecha_limite, completada
       FROM tareas
       WHERE usuario_id = ?
       ORDER BY fecha_limite ASC`, // ✅ ordena por fecha más próxima
      [req.usuarioId]
    );

    res.json(tareas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//crear tarea con query
export const crearTarea = async (req, res) => {
  const { titulo, descripcion, prioridad, fecha_limite } = req.body;
  if (!titulo) {
    return res.status(400).json({ error: "Título es obligatorio" });
  }

  if (fecha_limite && new Date(fecha_limite) < new Date()) {
    return res
      .status(400)
      .json({ error: "La fecha límite no puede estar en el pasado" });
  }

  try {
    await conexion.query(
      "INSERT INTO tareas (titulo, descripcion, prioridad, fecha_limite, usuario_id) VALUES (?, ?, ?, ?, ?)",
      [titulo, descripcion, prioridad || "media", fecha_limite, req.usuarioId]
    );
    res.status(201).json({ mensaje: "Tarea creada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//actualizar tarea
export const actualizarTarea = async (req, res) => {
  const { titulo, descripcion, prioridad, fecha_limite } = req.body; //body
  const { id } = req.params; // ID de la tarea a actualizar

  if (!titulo) {
    return res.status(400).json({ error: "Título es obligatorio" });
  }

  if (fecha_limite && new Date(fecha_limite) < new Date()) {
    return res
      .status(400)
      .json({ error: "La fecha límite no puede estar en el pasado" });
  }

  try {
    //query
    const [result] = await conexion.query(
      "UPDATE tareas SET titulo = ?, descripcion = ?, prioridad = ?, fecha_limite = ? WHERE id = ? AND usuario_id = ?",
      [
        titulo,
        descripcion,
        prioridad || "media",
        fecha_limite,
        id,
        req.usuarioId,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    } //sin coincidencia del update

    res.status(200).json({ mensaje: "Tarea actualizada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar tarea
export const eliminarTarea = async (req, res) => {
  const { id } = req.params;
  try {
    //consulta con query del id con usuario_id correspondiente
    const [result] = await conexion.query(
      "DELETE FROM tareas WHERE id=? AND usuario_id=?",
      [id, req.usuarioId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    } //falla por ausencia en base de datos

    res.json({ mensaje: "Tarea eliminada" }); //exito
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Marcar tarea como completada / incompleta
export const toggleCompletada = async (req, res) => {
  const { id } = req.params;
  const { completada } = req.body; // true o false
  try {
    const [result] = await conexion.query(
      "UPDATE tareas SET completada=? WHERE id=? AND usuario_id=?",
      [completada ? 1 : 0, id, req.usuarioId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json({
      mensaje: `Tarea marcada como ${completada ? "completada" : "pendiente"}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
