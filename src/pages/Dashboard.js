// ============================================================
//  Archivo: src/pages/Dashboard/Dashboard.js
//  Descripción: Página principal — Kanban de tareas
// ============================================================

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import { ESTADOS } from "./estados";
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

  // Carga tareas guardadas, o usa las iniciales si es la primera vez
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem("tareas");
    return guardadas ? JSON.parse(guardadas) : TAREAS_INICIALES;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [tareaEdit, setTareaEdit] = useState(null);
  const [menuOpen, setMenuOpen]   = useState(false);
  const dropdownRef = useRef(null);

  const nombre = localStorage.getItem("usuario_nombre") || "Usuario";

  // Proteger ruta
  useEffect(() => {
    if (!localStorage.getItem("usuario_nombre")) navigate("/login");
  }, [navigate]);

  // Persistir tareas en cada cambio
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

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

  return (
    <div className="dash-wrapper">

      {/* ══════════════════════════════
          NAVBAR
          ══════════════════════════════ */}
      <nav className="dash-nav">
        <div className="dash-nav-logo" onClick={() => navigate("/")}>
          Help<span>Task</span>
        </div>
        <div className="dash-nav-right">
          <button className="dash-agregar-btn" onClick={() => { setTareaEdit(null); setModalOpen(true); }}>
            Agregar Tarea +
          </button>
          {/* Avatar con dropdown */}
          <div className="dash-user-wrap" ref={dropdownRef}>
            <button
              className="dash-avatar"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú de usuario"
            >
              {nombre.charAt(0).toUpperCase()}
            </button>
           {menuOpen && (
  <div className="dash-dropdown">
    <div className="dash-dropdown-name">{nombre}</div>
    <div className="dash-dropdown-divider" />
    <button className="dash-dropdown-item" onClick={() => navigate("/perfil")}>
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
        {ESTADOS.map(({ value, label, dot }) => {
          const tareasDeEsteEstado = tareas.filter(t => t.estado === value);
          return (
            <div className="kanban-col" key={value}>
              <div className="kanban-col-header">
                <div className="kanban-col-title">
                  <span className={`kanban-dot ${dot}`} />
                  {label}
                </div>
                <span className="kanban-count">{tareasDeEsteEstado.length}</span>
              </div>
              <div className="kanban-cards">
                {tareasDeEsteEstado.length === 0 && (
                  <p className="kanban-empty">Sin tareas aquí todavía.</p>
                )}
                {tareasDeEsteEstado.map(t => (
                  <TaskCard key={t.id} tarea={t} onEditar={handleEditar} onEliminar={handleEliminar} />
                ))}
              </div>
            </div>
          );
        })}
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