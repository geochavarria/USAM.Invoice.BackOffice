import { Link } from "react-router-dom";
import ApplicantsList from "./ApplicantsList";

import bgOne from "@/assets/images/resource/image-3.png"

/**
 * 
 * @returns 
 */
const About2 = () => {
  return (
    <>
      {/* <!-- Content Column --> */}
      <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
        <div className="inner-column" data-aos="fade-left">
          <div className="sec-title -type-2">
            <h2> Tu factura electrónica  <br />
            paso a paso
            </h2>
            <div className="text mt-1">
            Accede a tu factura electrónica cumpliendo con los requisitos establecidos.
            Este servicio está disponible exclusivamente para usuarios registrados en nuestro portal institucional.
            </div>
        
            <ul className="steps-list mt-1">
              <li className="mb-0"><span className="count">01</span>Actualiza tus datos. <small className="text-muted"> Asegúrate de que tu información personal esté vigente.</small></li>
              <li className="mb-0"><span className="count">02</span>Identificación. <small className="text-muted"> Proporciona documento de identidad, Número Tributario o Registro de IVA </small></li>
              <li className="mb-0"><span className="count">03</span>Correo electrónico. <small className="text-muted">Si deseas recibir notificaciones asegúrate de que esté ingresado correctamente.</small></li>
            </ul>
            <Link
              href="/#"
              className="d-none theme-btn btn-style-one"
            > Ir </Link>
          </div>
        </div>
      </div>
      {/* End .content-column */}

      {/* <!-- Image Column --> */}
      <div className="image-column col-lg-6 col-md-12 col-sm-12">
        <figure className="image-box" data-aos="fade-right">
          <img src={bgOne} alt="resource" />
        </figure>

        {/* <!-- Count Employers --> */}
        <div className="applicants-list" data-aos="fade-up">
          <div className="title-box">
            <h4>Medios de Consulta</h4>
          </div>
          <ul className="applicants">
            <ApplicantsList />
          </ul>
        </div>
      </div>
      {/* End image-column */}
    </>
  );
};

export default About2;
