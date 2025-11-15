//conexion a base de datos
import conexion from "../config/database.js";

//endpoint para listar usuarios
export const verUsuarios = async (req, res) => {
  try {
    const [rows] = await conexion.query(
      "SELECT id, nombre, email, rol FROM usuarios"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// PUT /usuarios/:id para editar ususarios
export const editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, rol } = req.body;

  try {
    const [result] = await conexion.query(
      "UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?",
      [nombre, email, rol, id]
    );

    //busqueda mas error
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ mensaje: "Usuario actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /usuarios/:id para usuarios
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await conexion.query("DELETE FROM usuarios WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET /tareas → listar tareas
export const verTareas = async (req, res) => {
  try {
    const [rows] = await conexion.query(
      "SELECT id, titulo, descripcion, fecha_limite, completada, prioridad FROM tareas"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error en verTareas:", error);
    res.status(500).json({ message: "Error al obtener tareas" });
  }
};

// PUT /tareas/:id → editar tarea
export const editarTarea = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, completada, prioridad, fecha_limite } = req.body;

  try {
    const [result] = await conexion.query(
      "UPDATE tareas SET titulo = ?, descripcion = ?, completada = ?, prioridad = ?, fecha_limite = ? WHERE id = ?",
      [titulo, descripcion, completada, prioridad, fecha_limite, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json({
      mensaje: "Tarea actualizada correctamente",
      tarea: { id, titulo, descripcion, completada, prioridad, fecha_limite },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /tareas/:id para tareas
export const eliminarTarea = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await conexion.query("DELETE FROM tareas WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.json({ mensaje: "Tarea eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
