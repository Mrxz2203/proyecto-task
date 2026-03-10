// ============================================================
//  Archivo: src/components/Welcome.js
//  Descripción: Página de bienvenida — HelpTask
// ============================================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import Footer from "./Footer";

function Welcome() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="welcome-wrapper">

      {/* ══════════════════════════════
          NAVBAR
          ══════════════════════════════ */}
      <nav className="welcome-nav">
        <div className="welcome-nav-logo">
          Help<span>Task</span>
        </div>
        <div className="welcome-nav-links">
          <a href="#features" className="welcome-nav-link">Acerca de</a>
          <a href="#features" className="welcome-nav-link">Características</a>
          <a href="#features" className="welcome-nav-link">Contacto</a>
        </div>
        <div className="welcome-nav-btns">
          <button className="welcome-btn-ghost" onClick={() => navigate("/login")}>
            Iniciar Sesion
          </button>
          <button className="welcome-btn-solid" onClick={() => navigate("/register")}>
            Empezar →
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════
          HERO
          ══════════════════════════════ */}
      <section className="welcome-hero">

        {/* LEFT */}
        <div className={`welcome-hero-left ${loaded ? "show" : ""}`}>
          <h1 className="welcome-title">
            Gestiona<br />
            tus tareas<br />
            con<br />
            <span className="title-accent">claridad</span><br />
            <span className="title-accent2">y foco</span>
          </h1>
          <p className="welcome-desc">
            TaskHelp te ayuda a organizar, priorizar
            y completar tus tareas diarias de forma
            visual e intuitiva. Tu productividad,
            transformada.
          </p>
        </div>

        {/* RIGHT — Imagen Web.png */}
<div className={`welcome-hero-right ${loaded ? "show" : ""}`}>
  <img src={require("../assets/Web.png")} alt="TaskFlow preview" className="welcome-web-img" />
  <button
    className="welcome-cta-btn"
    onClick={() => navigate("/register")}
  >
    Crear Cuenta →
  </button>
</div>

      </section>

      {/* ══════════════════════════════
          FEATURES STRIP
          ══════════════════════════════ */}
      <div className="welcome-features" id="features">
        <div className="feature-item">
          <span className="feature-icon">📋</span>
          <div className="feature-text">
            <strong>Kanban Visual</strong>
            3 estados en tiempo real
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🔐</span>
          <div className="feature-text">
            <strong>Autenticación</strong>
            Login seguro con JWT
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">⚡</span>
          <div className="feature-text">
            <strong>Rápido y simple</strong>
            Crea tareas en segundos
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🎯</span>
          <div className="feature-text">
            <strong>Tu espacio</strong>
            Solo ves tus tareas
          </div>
        </div>
      </div>
<Footer />
    </div>

  );
}

export default Welcome;