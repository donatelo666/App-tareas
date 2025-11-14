//conexion a base de datos
import conexion from "../config/database.js";

//crear sub tareas con titulo
export const crearSubtarea = async (req, res) => {
  const { titulo } = req.body;
  const { id } = req.params;

  if (!titulo)
    return res.status(400).json({ error: "El título es obligatorio" });

  try {
    await conexion.query(
      "INSERT INTO subtareas (tarea_id, titulo) VALUES (?, ?)",
      [id, titulo]
    );
    res.status(201).json({ mensaje: "Subtarea creada" });
  } catch (error) {
    console.error("Error al crear subtarea:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Ver subtareas por ID de tarea
export const verSubtareas = async (req, res) => {
  const { id } = req.params;

  try {
    const [subtareas] = await conexion.query(
      "SELECT * FROM subtareas WHERE tarea_id = ?",
      [id]
    );

    res.status(200).json(subtareas);
  } catch (error) {
    console.error("Error al obtener subtareas:", error);
    res.status(500).json({ error: "Error al obtener las subtareas" });
  }
};

//marcar subtareas por id
export const marcarSubtarea = async (req, res) => {
  const { completada } = req.body;
  const { id } = req.params;

  try {
    await conexion.query("UPDATE subtareas SET completada = ? WHERE id = ?", [
      completada,
      id,
    ]);
    res.status(201).json({ mensaje: "Subtarea actualizada" });
  } catch (error) {
    console.error("Error al actualizar subtarea:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
