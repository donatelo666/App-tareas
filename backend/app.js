// servidor con express, dotenv , rutas , json y escuchando en puerto 3000
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import tareasRoutes from "./routes/tareas.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // URL de tu frontend Vite
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // si vas a usar cookies o JWT
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tareas", tareasRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
