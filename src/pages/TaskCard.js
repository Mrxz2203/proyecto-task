// ============================================================
//  Archivo: src/pages/Dashboard/TaskCard.js
//  Descripción: Componente de cada tarjeta de tarea
// ============================================================

import "./TaskCard.css";

function TaskCard({ tarea, onEditar, onEliminar }) {
  const handleEliminar = () => {
    if (window.confirm(`¿Eliminar "${tarea.titulo}"? Esta acción no se puede deshacer.`)) {
      onEliminar(tarea.id);
    }
  };

  return (
    <div className={`taskcard ${tarea.estado}`}>
      <h4 className="taskcard-title" title={tarea.titulo}>{tarea.titulo}</h4>
      <p className="taskcard-desc" title={tarea.descripcion}>{tarea.descripcion}</p>
      <div className="taskcard-actions">
        <button className="taskcard-btn edit" onClick={() => onEditar(tarea)}>
          Editar
        </button>
        <button className="taskcard-btn delete" onClick={handleEliminar}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default TaskCard;