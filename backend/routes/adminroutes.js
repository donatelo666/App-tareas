//importacion express, rutas de admin mas middlewares
import express from "express";
import {
  obtenerMetricas,
  verUsuarios,
} from "../controllers/admincontroller.js";
import {
  editarUsuario,
  eliminarUsuario,
} from "../controllers/admincontroller.js";
import { verTareas } from "../controllers/admincontroller.js";
import { editarTarea } from "../controllers/admincontroller.js";
import { eliminarTarea } from "../controllers/admincontroller.js";
import { verificarToken } from "../middleware/auth.js";
import { isAdmin } from "../middleware/is-admin.js";

//router mas funciones admin  y middlewares
const router = express.Router();
router.get("/admin/usuarios", verificarToken, isAdmin, verUsuarios);
router.put("/admin/usuarios/:id", verificarToken, isAdmin, editarUsuario);
router.delete("/admin/usuarios/:id", verificarToken, isAdmin, eliminarUsuario);
router.get("/admin/tareas", verificarToken, isAdmin, verTareas);
router.put("/admin/tareas/:id", verificarToken, isAdmin, editarTarea);
router.delete("/admin/tareas/:id", verificarToken, isAdmin, eliminarTarea);
router.get("/admin/tareas/metricas", verificarToken, isAdmin, obtenerMetricas);

export default router;
