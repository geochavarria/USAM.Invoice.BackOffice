import Social from "./Social";

const CopyrightFooter = () => {
  return (
    <div className="footer-bottom">
      <div className="auto-container">
        <div className="outer-box">
          <div className="copyright-text">
            © {new Date().getFullYear()} Universidad Alberto Masferrer{" "}
            <a
              href="https://www.usam.edu.sv/"
              target="_blank"
              rel="noopener noreferrer"
            > USAM
            </a>
            . © Todos los derechos reservados.
          </div>
          <div className="social-links">
            <Social />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyrightFooter;
