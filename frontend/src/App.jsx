import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admindashboard from "./pages/Admindashboard";
import Adminusers from "./components/Adminusers";
import AdminTasks from "./components/Admintasks";

// Componente para proteger rutas
const RutaPrivada = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [modoOscuro, setModoOscuro] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", modoOscuro);
  }, [modoOscuro]);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Navbar />

      <div className="App">
        <button
          onClick={() => setModoOscuro(!modoOscuro)}
          className="toggle-mode"
        >
          {modoOscuro ? "Modo claro" : "Modo oscuro"}
        </button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <RutaPrivada>
                <Dashboard />
              </RutaPrivada>
            }
          />
          <Route path="/admin/dashboard" element={<Admindashboard />} />

          <Route path="/admin/usuarios" element={<Adminusers />} />
          <Route path="/admin/tareas" element={<AdminTasks />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
