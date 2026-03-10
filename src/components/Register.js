// ============================================================
//  Archivo: src/components/Register.js
// ============================================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [errores, setErrores] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const validar = () => {
    const err = {};
    if (!form.nombre.trim())        err.nombre   = "El nombre es obligatorio.";
    if (!form.email.includes("@"))  err.email    = "Ingresa un email válido.";
    if (form.password.length < 6)   err.password = "Mínimo 6 caracteres.";
    return err;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = validar();
  if (Object.keys(newErrors).length > 0) { setErrores(newErrors); return; }

  // Guarda los datos en localStorage
  localStorage.setItem("reg_nombre",   form.nombre);
  localStorage.setItem("reg_email",    form.email);
  localStorage.setItem("reg_password", form.password);

  navigate("/login");
};

  return (
    <div className="auth-wrapper">

      {/* NAVBAR */}
      <nav className="auth-nav">
        <div className="auth-nav-logo" onClick={() => navigate("/")}>Help<span>Task</span></div>
        <div className="auth-nav-links">
          <span className="auth-nav-link">Acerca de</span>
          <span className="auth-nav-link">Características</span>
          <span className="auth-nav-link">Contacto</span>
        </div>
        <div className="auth-nav-btns">
          <button className="auth-btn-ghost" onClick={() => navigate("/login")}>Iniciar Sesion</button>
          <button className="auth-btn-solid" onClick={() => navigate("/register")}>Empezar →</button>
        </div>
      </nav>

      {/* CONTENIDO */}
      <div className="auth-body">
        <p className="auth-tagline">Organiza tu día, un task a la vez.</p>

        <div className={`auth-card ${loaded ? "show" : ""}`}>
          <h2 className="auth-card-title">Crear Cuenta</h2>

          <form onSubmit={handleSubmit} noValidate>

            <div className="auth-field">
              <label className="auth-label">Nombre Completo</label>
              <input
                className={`auth-input ${errores.nombre ? "error" : ""}`}
                type="text" name="nombre"
                placeholder="Gabriel0123"
                value={form.nombre} onChange={handleChange}
              />
              {errores.nombre && <span className="auth-error">{errores.nombre}</span>}
            </div>

            <div className="auth-field">
              <label className="auth-label">Email</label>
              <input
                className={`auth-input ${errores.email ? "error" : ""}`}
                type="email" name="email"
                placeholder="Gab15@gmail.com"
                value={form.email} onChange={handleChange}
              />
              {errores.email && <span className="auth-error">{errores.email}</span>}
            </div>

            <div className="auth-field">
              <label className="auth-label">Contraseña</label>
              <input
                className={`auth-input ${errores.password ? "error" : ""}`}
                type="password" name="password"
                placeholder="••••••••••••••••"
                value={form.password} onChange={handleChange}
              />
              {errores.password && <span className="auth-error">{errores.password}</span>}
            </div>

            <button type="submit" className="auth-btn-submit">Crear Cuenta →</button>

          </form>

          <p className="auth-switch">
            ¿Ya tienes cuenta?{" "}
            <span onClick={() => navigate("/login")}>Inicia sesión aquí</span>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Register;