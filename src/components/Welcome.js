// ============================================================
//  Archivo: src/components/Welcome.js
//  Descripción: Página de bienvenida — HelpTask
// ============================================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import Footer from "./Footer";
import Section from "./Section";
import Header from "./Header";

const steps = [
  { n: "01", label: "Por hacer", state: "todo", text: "Anota lo que tienes que hacer, sin fricción." },
  { n: "02", label: "Haciendo", state: "doing", text: "Mueve la tarjeta cuando te pongas en marcha." },
  { n: "03", label: "Hecho", state: "done", text: "Ciérrala. Así de simple, cada día." },
];

function Welcome() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="welcome-wrapper">

      <Header />

      {/* HERO */}
      <section className="welcome-hero">
        <div className={`welcome-hero-left ${loaded ? "show" : ""}`}>
          <h1 className="welcome-title">
            Gestiona tus tareas<br />
            con <span className="title-accent">claridad</span><br />
            y <span className="title-accent2">foco</span>
          </h1>
          <p className="welcome-desc">
            HelpTask te ayuda a organizar, priorizar y completar tus
            tareas diarias de forma visual e intuitiva. Tu productividad,
            transformada.
          </p>
          <button className="welcome-cta-btn" onClick={() => navigate("/register")}>
            Crear cuenta →
          </button>
        </div>

        {/* Tablero Kanban real como mockup */}
        <div className={`welcome-hero-right ${loaded ? "show" : ""}`}>
          <div className="board-mock">
            <div className="board-col">
              <div className="board-col-head">
                <span className="dot dot-todo" />Por hacer
              </div>
              <div className="board-card">Diseñar login</div>
              <div className="board-card">Revisar PR #12</div>
            </div>
            <div className="board-col">
              <div className="board-col-head">
                <span className="dot dot-doing" />Haciendo
              </div>
              <div className="board-card ghost">Conectar API</div>
            </div>
            <div className="board-col">
              <div className="board-col-head">
                <span className="dot dot-done" />Hecho
              </div>
              <div className="board-card">Config JWT</div>
              <div className="board-card dragging">Conectar API</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESO — mismos 3 estados, ahora como narrativa */}
      <section className="welcome-process" id="proceso">
        {steps.map((s) => (
          <div className="process-step" key={s.n}>
            <span className={`process-num process-${s.state}`}>{s.n}</span>
            <div>
              <strong>{s.label}</strong>
              <p>{s.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CARACTERÍSTICAS — componente propio */}
      <Section />

      <Footer />
    </div>
  );
}

export default Welcome;