//rutas de las tareas con express, verificar token
import express from "express";
import { verUsuarios } from "../controllers/admincontroller.js";
import { verificarToken } from "../middleware/auth.js";
import { isAdmin } from "../middleware/is-admin.js";

const router = express.Router();
router.get("/usuarios", verificarToken, isAdmin, verUsuarios);

export default router;
