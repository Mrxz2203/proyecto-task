// ============================================================
//  Archivo: src/components/Footer.js
//  Descripción: Footer — HelpTask
// ============================================================

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-wrapper" id="contacto">
      <div className="footer-bottom">
        <div className="footer-logo-mini">
          Help<span>Task</span>
        </div>
        <p className="footer-copy">
          © 2026 HelpTask. Todos los derechos reservados.
        </p>
        <div className="footer-bottom-links">
          <span className="footer-bottom-link">Términos</span>
          <span className="footer-bottom-link">Privacidad</span>
          <span className="footer-bottom-link">Contacto</span>

        </div>
      </div>
    </footer>
  );
}

export default Footer;