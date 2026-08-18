// ============================================================
//  Archivo: src/pages/Dashboard/TaskModal.js
//  Descripción: Modal para crear y editar tareas
// ============================================================

import { useState, useEffect, useRef } from "react";
import { ESTADOS } from "./estados";
import "./TaskModal.css";

const FORM_VACIO = { titulo: "", descripcion: "", estado: "pendiente" };

function TaskModal({ tarea, onGuardar, onCerrar }) {
  const [form, setForm] = useState(FORM_VACIO);
  const [errores, setErrores] = useState({});
  const primerInputRef = useRef(null);

  // Rellena el form si es edición, lo limpia si es creación
  useEffect(() => {
    if (tarea) {
      setForm({ titulo: tarea.titulo, descripcion: tarea.descripcion, estado: tarea.estado });
    } else {
      setForm(FORM_VACIO);
    }
    setErrores({});
  }, [tarea]);

  // Foco automático en el primer campo al abrir
  useEffect(() => {
    primerInputRef.current?.focus();
  }, []);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onCerrar(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onCerrar]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const validar = () => {
    const err = {};
    if (!form.titulo.trim())      err.titulo      = "El título es obligatorio.";
    if (!form.descripcion.trim()) err.descripcion = "La descripción es obligatoria.";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validar();
    if (Object.keys(newErrors).length > 0) { setErrores(newErrors); return; }
    onGuardar({ ...form, id: tarea?.id || null });
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        <div className="modal-header">
          <h3 className="modal-title">{tarea ? "Editar Tarea" : "Nueva Tarea"}</h3>
          <button className="modal-close" onClick={onCerrar} aria-label="Cerrar">✕</button>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          <div className="modal-field">
            <label className="modal-label">Título</label>
            <input
              ref={primerInputRef}
              className={`modal-input ${errores.titulo ? "error" : ""}`}
              type="text" name="titulo"
              placeholder="Ej: Diseñar navbar"
              maxLength={60}
              value={form.titulo} onChange={handleChange}
            />
            {errores.titulo && <span className="modal-error">{errores.titulo}</span>}
          </div>

          <div className="modal-field">
            <label className="modal-label">Descripción</label>
            <textarea
              className={`modal-textarea ${errores.descripcion ? "error" : ""}`}
              name="descripcion"
              placeholder="Describe la tarea..."
              maxLength={200}
              value={form.descripcion} onChange={handleChange}
              rows={3}
            />
            {errores.descripcion && <span className="modal-error">{errores.descripcion}</span>}
          </div>

          <div className="modal-field">
            <label className="modal-label">Estado</label>
            <div className="modal-pills">
              {ESTADOS.map(({ value, label, emoji }) => (
                <button
                  key={value}
                  type="button"
                  className={`modal-pill ${value} ${form.estado === value ? "active" : ""}`}
                  onClick={() => setForm({ ...form, estado: value })}
                >
                  {emoji} {label}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-btns">
            <button type="button" className="modal-btn-cancel" onClick={onCerrar}>
              Cancelar
            </button>
            <button type="submit" className="modal-btn-save">
              {tarea ? "Guardar cambios →" : "Crear tarea →"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default TaskModal;