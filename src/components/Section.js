// ============================================================
//  Archivo: src/components/Section.js
//  Descripción: Sección de características — HelpTask
// ============================================================

import { useEffect, useRef, useState } from "react";
import "./Section.css";

const cards = [
  {
    state: "todo",
    title: "Kanban visual",
    text: "Arrastra tus tareas entre Por hacer, Haciendo y Hecho. Ve tu día completo de un vistazo, sin hojas de cálculo ni notas sueltas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M9 4v16M15 4v16" />
      </svg>
    ),
  },
  {
    state: "doing",
    title: "Autenticación",
    text: "Tu tablero, solo tuyo. Cada cuenta protegida con JWT, para que nadie más entre a organizar tu caos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
    ),
  },
  {
    state: "done",
    title: "Efectividad",
    text: "Sin pasos de más. Crea una tarea, muévela, ciérrala. Tres acciones, cero fricción, cada día.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" />
      </svg>
    ),
  },
  {
    state: "todo",
    title: "Espacio personal",
    text: "Ni equipos, ni ruido ajeno. Un tablero privado que solo responde a lo que tú tienes pendiente.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="8" r="3.4" />
        <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" />
      </svg>
    ),
  },
];

function Section() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="features-section" id="features" ref={ref}>
      <div className="features-head">
        <span className="features-eyebrow">Por qué HelpTask</span>
        <h2>Todo lo que necesitas, nada de lo que sobra</h2>
      </div>

      <div className="features-grid">
        {cards.map((c, i) => (
          <div
            className={`feature-card feature-${c.state} ${visible ? "in-view" : ""}`}
            style={{ transitionDelay: `${i * 100}ms` }}
            key={c.title}
          >
            <span className="feature-card-icon">{c.icon}</span>
            <h3>{c.title}</h3>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Section;