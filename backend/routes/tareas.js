//rutas de las tareas con express, verificar token
import express from "express";
import {
  obtenerTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
  toggleCompletada,
} from "../controllers/tareascontroller.js";
import { verificarToken } from "../middleware/auth.js";

const router = express.Router();
router.get("/", verificarToken, obtenerTareas);
router.post("/", verificarToken, crearTarea);
router.put("/:id", verificarToken, actualizarTarea);
router.delete("/:id", verificarToken, eliminarTarea);
router.patch("/:id/completar", verificarToken, toggleCompletada);

export default router;
