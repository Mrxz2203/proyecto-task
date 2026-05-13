// ============================================================
//  Archivo: src/components/Footer.js
//  Descripción: Footer — HelpTask
// ============================================================



function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer-wrapper">

      {/* ══════════════════════════════
          CUERPO FOOTER
          ══════════════════════════════ */}
      <div className="footer-body">

        {/* LEFT — Info */}
        <div className="footer-info">
          <div className="footer-logo">
            Help<span>Task</span>
          </div>
          <p className="footer-desc">
            Organiza tus tareas de forma visual e intuitiva.
            Diseñado para personas que quieren hacer más con
            menos esfuerzo.
          </p>
        </div>

        {/* RIGHT — Imagen dev.png */}
        <div className="footer-img-wrap">
          <img
            src={require("../assets/dev.png")}
            alt="Desarrollador HelpTask"
            className="footer-dev-img"
          />
        </div>

      </div>

      {/* ══════════════════════════════
          BOTTOM BAR
          ══════════════════════════════ */}
      <div className="footer-bottom">
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