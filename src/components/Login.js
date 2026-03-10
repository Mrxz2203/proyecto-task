// ============================================================
//  Archivo: src/components/Login.js
// ============================================================

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ usuario: "", password: "" });
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
    if (!form.usuario.trim())  err.usuario  = "El usuario es obligatorio.";
    if (!form.password.trim()) err.password = "La contraseña es obligatoria.";
    return err;
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = validar();
  if (Object.keys(newErrors).length > 0) { setErrores(newErrors); return; }

  // Recupera los datos registrados
  const emailGuardado    = localStorage.getItem("reg_email");
  const passwordGuardada = localStorage.getItem("reg_password");
  const nombreGuardado   = localStorage.getItem("reg_nombre");

  // Valida
  if (form.usuario === emailGuardado && form.password === passwordGuardada) {
    localStorage.setItem("usuario_nombre", nombreGuardado);
    navigate("/dashboard");
  } else {
    setErrores({ password: "Usuario o contraseña incorrectos." });
  }
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
          <h2 className="auth-card-title">Iniciar Sesión</h2>

          <form onSubmit={handleSubmit} noValidate>

            <div className="auth-field">
              <label className="auth-label">Usuario</label>
              <input
                className={`auth-input ${errores.usuario ? "error" : ""}`}
                type="text" name="usuario"
                placeholder="Gabriel0123"
                value={form.usuario} onChange={handleChange}
              />
              {errores.usuario && <span className="auth-error">{errores.usuario}</span>}
            </div>

            <div className="auth-field">
              <label className="auth-label">Contraseña</label>
              <div className="auth-input-wrap">
                <input
                  className={`auth-input ${errores.password ? "error" : ""}`}
                  type={showPass ? "text" : "password"} name="password"
                  placeholder="••••••••"
                  value={form.password} onChange={handleChange}
                />
                <span className="auth-eye" onClick={() => setShowPass(!showPass)}>
                  {showPass ? "🙈" : "👁️"}
                </span>
              </div>
              {errores.password && <span className="auth-error">{errores.password}</span>}
            </div>

            <button type="submit" className="auth-btn-submit">Iniciar Sesión →</button>

          </form>

          <p className="auth-switch">
            ¿No tienes cuenta?{" "}
            <span onClick={() => navigate("/register")}>Regístrate aquí</span>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Login;