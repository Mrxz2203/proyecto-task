// ============================================================
//  Archivo: src/pages/Dashboard/Dashboard.js
//  Descripción: Página principal — Kanban de tareas
// ============================================================

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import "./Dashboard.css";

const TAREAS_INICIALES = [
  { id: 1, titulo: "Diseñar landing page",     descripcion: "Crear los mockups en Figma para el cliente.",          estado: "pendiente"   },
  { id: 2, titulo: "Configurar base de datos", descripcion: "Instalar PostgreSQL y crear las tablas.",               estado: "pendiente"   },
  { id: 3, titulo: "Conectar frontend con API",descripcion: "Integrar los endpoints de FastAPI con React.",          estado: "en-progreso" },
  { id: 4, titulo: "Crear componente Login",   descripcion: "Formulario con validación frontend lista.",             estado: "completado"  },
  { id: 5, titulo: "Setup del proyecto React", descripcion: "Instalación y estructura de carpetas lista.",           estado: "completado"  },
];

function Dashboard() {
  const navigate  = useNavigate();
  const [tareas, setTareas]       = useState(TAREAS_INICIALES);
  const [modalOpen, setModalOpen] = useState(false);
  const [tareaEdit, setTareaEdit] = useState(null);
  const [menuOpen, setMenuOpen]   = useState(false);
  const dropdownRef = useRef(null);

  const nombre = localStorage.getItem("usuario_nombre") || "Usuario";

  // Proteger ruta
  useEffect(() => {
    if (!localStorage.getItem("usuario_nombre")) navigate("/login");
  }, [navigate]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ── CRUD ──
  const handleGuardar = (tarea) => {
    if (tarea.id) {
      setTareas(tareas.map(t => t.id === tarea.id ? tarea : t));
    } else {
      setTareas([...tareas, { ...tarea, id: Date.now() }]);
    }
    setModalOpen(false);
    setTareaEdit(null);
  };

  const handleEditar = (tarea) => {
    setTareaEdit(tarea);
    setModalOpen(true);
  };

  const handleEliminar = (id) => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem("usuario_nombre");
    navigate("/");
  };

  const pendientes   = tareas.filter(t => t.estado === "pendiente");
  const enProgreso   = tareas.filter(t => t.estado === "en-progreso");
  const completadas  = tareas.filter(t => t.estado === "completado");

  return (
    <div className="dash-wrapper">

      {/* ══════════════════════════════
          NAVBAR
          ══════════════════════════════ */}
      <nav className="dash-nav">
        <div className="dash-nav-logo" onClick={() => navigate("/")}>
          Help<span>Task</span>
        </div>
        <div className="dash-nav-links">
          <span className="dash-nav-link">Acerca de</span>
          <span className="dash-nav-link">Características</span>
          <span className="dash-nav-link">Contacto</span>
        </div>
        <div className="dash-nav-right">
          <button className="dash-agregar-btn" onClick={() => { setTareaEdit(null); setModalOpen(true); }}>
            Agregar Tarea +
          </button>
          {/* Avatar con dropdown */}
          <div className="dash-user-wrap" ref={dropdownRef}>
            <div className="dash-avatar" onClick={() => setMenuOpen(!menuOpen)}>
              {nombre.charAt(0).toUpperCase()}
            </div>
            {menuOpen && (
              <div className="dash-dropdown">
                <div className="dash-dropdown-name">{nombre}</div>
                <div className="dash-dropdown-divider" />
                <button className="dash-dropdown-item" onClick={() => setMenuOpen(false)}>
                  👤 Ver Perfil
                </button>
                <button className="dash-dropdown-item danger" onClick={handleCerrarSesion}>
                  🚪 Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════
          KANBAN BOARD
          ══════════════════════════════ */}
      <div className="dash-board">

        {/* PENDIENTE */}
        <div className="kanban-col">
          <div className="kanban-col-header">
            <div className="kanban-col-title">
              <span className="kanban-dot red" />
              Pendiente
            </div>
            <span className="kanban-count">{pendientes.length}</span>
          </div>
          <div className="kanban-cards">
            {pendientes.map(t => (
              <TaskCard key={t.id} tarea={t} onEditar={handleEditar} onEliminar={handleEliminar} />
            ))}
          </div>
        </div>

        {/* EN PROGRESO */}
        <div className="kanban-col">
          <div className="kanban-col-header">
            <div className="kanban-col-title">
              <span className="kanban-dot yellow" />
              En Progreso
            </div>
            <span className="kanban-count">{enProgreso.length}</span>
          </div>
          <div className="kanban-cards">
            {enProgreso.map(t => (
              <TaskCard key={t.id} tarea={t} onEditar={handleEditar} onEliminar={handleEliminar} />
            ))}
          </div>
        </div>

        {/* COMPLETADO */}
        <div className="kanban-col">
          <div className="kanban-col-header">
            <div className="kanban-col-title">
              <span className="kanban-dot green" />
              Completado
            </div>
            <span className="kanban-count">{completadas.length}</span>
          </div>
          <div className="kanban-cards">
            {completadas.map(t => (
              <TaskCard key={t.id} tarea={t} onEditar={handleEditar} onEliminar={handleEliminar} />
            ))}
          </div>
        </div>

      </div>

      {/* ══════════════════════════════
          MODAL
          ══════════════════════════════ */}
      {modalOpen && (
        <TaskModal
          tarea={tareaEdit}
          onGuardar={handleGuardar}
          onCerrar={() => { setModalOpen(false); setTareaEdit(null); }}
        />
      )}

    </div>
  );
}

export default Dashboard;