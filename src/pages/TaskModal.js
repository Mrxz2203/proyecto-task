// ============================================================
//  Archivo: src/pages/Dashboard/TaskModal.js
//  Descripción: Modal para crear y editar tareas
// ============================================================

import { useState, useEffect } from "react";
import "./TaskModal.css";

function TaskModal({ tarea, onGuardar, onCerrar }) {
  const [form, setForm] = useState({
    titulo:      "",
    descripcion: "",
    estado:      "pendiente",
  });
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (tarea) setForm({ titulo: tarea.titulo, descripcion: tarea.descripcion, estado: tarea.estado });
  }, [tarea]);

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
          <button className="modal-close" onClick={onCerrar}>✕</button>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          <div className="modal-field">
            <label className="modal-label">Título</label>
            <input
              className={`modal-input ${errores.titulo ? "error" : ""}`}
              type="text" name="titulo"
              placeholder="Ej: Diseñar navbar"
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
              value={form.descripcion} onChange={handleChange}
              rows={3}
            />
            {errores.descripcion && <span className="modal-error">{errores.descripcion}</span>}
          </div>

          <div className="modal-field">
            <label className="modal-label">Estado</label>
            <div className="modal-pills">
              {["pendiente", "en-progreso", "completado"].map(estado => (
                <button
                  key={estado}
                  type="button"
                  className={`modal-pill ${estado} ${form.estado === estado ? "active" : ""}`}
                  onClick={() => setForm({ ...form, estado })}
                >
                  {estado === "pendiente"   && "📌 Pendiente"}
                  {estado === "en-progreso" && "🔄 En Progreso"}
                  {estado === "completado"  && "✅ Completado"}
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