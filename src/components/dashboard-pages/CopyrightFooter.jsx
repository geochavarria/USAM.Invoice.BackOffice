const CopyrightFooter = () => {
  return (
    <div className="copyright-text py-1">
      <p>
        © {new Date().getFullYear()} { import.meta.env.VITE_COMPANY} { " " }
        ©<a
            href="https://www.usam.edu.sv/"
            target="_blank"
            rel="noopener noreferrer"
          > USAM
          </a> { ". " }
            Todos los derechos reservados.
      </p>
    </div>
  );
};

export default CopyrightFooter;
