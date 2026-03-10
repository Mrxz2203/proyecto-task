// ============================================================
//  Archivo: src/pages/Dashboard/TaskCard.js
//  Descripción: Componente de cada tarjeta de tarea
// ============================================================

import "./TaskCard.css";

function TaskCard({ tarea, onEditar, onEliminar }) {
  return (
    <div className={`taskcard ${tarea.estado}`}>
      <h4 className="taskcard-title">{tarea.titulo}</h4>
      <p className="taskcard-desc">{tarea.descripcion}</p>
      <div className="taskcard-actions">
        <button className="taskcard-btn edit" onClick={() => onEditar(tarea)}>
          Editar
        </button>
        <button className="taskcard-btn delete" onClick={() => onEliminar(tarea.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TaskCard;