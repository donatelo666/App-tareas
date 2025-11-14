//rutas de las tareas con express, verificar token
import express from "express";
import {
  crearSubtarea,
  verSubtareas,
  marcarSubtarea,
} from "../controllers/subtareascontroller.js";
import { verificarToken } from "../middleware/auth.js";

const router = express.Router();
router.post("/tareas/:id/subtareas", verificarToken, crearSubtarea);
router.get("/tareas/:id/subtareas", verificarToken, verSubtareas);
router.put("/subtareas/:id", verificarToken, marcarSubtarea);

export default router;
