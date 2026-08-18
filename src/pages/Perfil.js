// ============================================================
//  Archivo: src/pages/Perfil.js
//  Descripción: Edición de datos del usuario registrado
// ============================================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";

function Perfil() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [errores, setErrores] = useState({});
  const [guardado, setGuardado] = useState(false);

  // Proteger ruta + cargar datos actuales
  useEffect(() => {
    const nombreActual = localStorage.getItem("usuario_nombre");
    if (!nombreActual) {
      navigate("/login");
      return;
    }
    setForm({
      nombre:   localStorage.getItem("reg_nombre")   || "",
      email:    localStorage.getItem("reg_email")    || "",
      password: localStorage.getItem("reg_password") || "",
    });
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
    setGuardado(false);
  };

  const validar = () => {
    const err = {};
    if (!form.nombre.trim())       err.nombre   = "El nombre es obligatorio.";
    if (!form.email.includes("@")) err.email    = "Ingresa un email válido.";
    if (form.password.length < 6)  err.password = "Mínimo 6 caracteres.";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validar();
    if (Object.keys(newErrors).length > 0) { setErrores(newErrors); return; }

    localStorage.setItem("reg_nombre",   form.nombre);
    localStorage.setItem("reg_email",    form.email);
    localStorage.setItem("reg_password", form.password);
    localStorage.setItem("usuario_nombre", form.nombre);

    setGuardado(true);
  };

  return (
    <div className="perfil-wrapper">

      {/* NAVBAR simple, vista autenticada */}
      <nav className="perfil-nav">
        <div className="perfil-nav-logo" onClick={() => navigate("/")}>
          Help<span>Task</span>
        </div>
        <button className="perfil-btn-volver" onClick={() => navigate("/dashboard")}>
          ← Volver al tablero
        </button>
      </nav>

      <div className="perfil-body">
        <p className="perfil-tagline">Actualiza tus datos cuando quieras.</p>

        <div className={`perfil-card ${loaded ? "show" : ""}`}>
          <h2 className="perfil-card-title">Mi Perfil</h2>

          <form onSubmit={handleSubmit} noValidate>

            <div className="perfil-field">
              <label className="perfil-label">Nombre Completo</label>
              <input
                className={`perfil-input ${errores.nombre ? "error" : ""}`}
                type="text" name="nombre"
                value={form.nombre} onChange={handleChange}
              />
              {errores.nombre && <span className="perfil-error">{errores.nombre}</span>}
            </div>

            <div className="perfil-field">
              <label className="perfil-label">Email</label>
              <input
                className={`perfil-input ${errores.email ? "error" : ""}`}
                type="email" name="email"
                value={form.email} onChange={handleChange}
              />
              {errores.email && <span className="perfil-error">{errores.email}</span>}
            </div>

            <div className="perfil-field">
              <label className="perfil-label">Contraseña</label>
              <input
                className={`perfil-input ${errores.password ? "error" : ""}`}
                type="password" name="password"
                value={form.password} onChange={handleChange}
              />
              {errores.password && <span className="perfil-error">{errores.password}</span>}
            </div>

            <button type="submit" className="perfil-btn-submit">
              Guardar cambios →
            </button>

            {guardado && <p className="perfil-guardado">✓ Cambios guardados correctamente.</p>}

          </form>
        </div>
      </div>

    </div>
  );
}

export default Perfil;