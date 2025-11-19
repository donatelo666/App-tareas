//imoprtacion express funciones subtareas , controler y middleware
import express from "express";
import {
  crearSubtarea,
  verSubtareas,
  marcarSubtarea,
} from "../controllers/subtareascontroller.js";
import { verificarToken } from "../middleware/auth.js";

//router
const router = express.Router();
router.post("/tareas/:id/subtareas", verificarToken, crearSubtarea);
router.get("/tareas/:id/subtareas", verificarToken, verSubtareas);
router.put("/subtareas/:id", verificarToken, marcarSubtarea);

export default router;
