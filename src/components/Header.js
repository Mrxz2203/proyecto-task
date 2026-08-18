// ============================================================
//  Archivo: src/components/Header.js
//  Descripción: Navbar compartido — HelpTask
// ============================================================

import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  return (
    <nav className="site-header">
      <div className="site-header-logo" onClick={() => navigate("/")}>
        Help<span>Task</span>
      </div>
      <div className="site-header-links">
        <a href="/#proceso" className="site-header-link">Cómo funciona</a>
        <a href="/#features" className="site-header-link">Características</a>
        <a href="/#contacto" className="site-header-link">Contacto</a>
      </div>
      <div className="site-header-btns">
        <button className="site-header-btn-ghost" onClick={() => navigate("/login")}>
          Iniciar sesión
        </button>
        <button className="site-header-btn-solid" onClick={() => navigate("/register")}>
          Empezar →
        </button>
      </div>
    </nav>
  );
}

export default Header;