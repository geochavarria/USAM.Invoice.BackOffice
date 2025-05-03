import CopyrightFooter from "@/components/footer/common-footer/CopyrightFooter";
import FooterContent from "@/components/footer/common-footer/FooterContent";

import LogoLight from "@/assets/images/logo-light-h.png"
const Footer = () => {
  return (
    <footer className="main-footer style-five">
      <div className="auto-container">
        {/* <!--Widgets Section--> */}
        <div className="widgets-section" data-aos="fade-up" style={{paddingTop: 40}}>
          <div className="row">
            <div className="big-column col-xl-4 col-lg-4 col-md-12">
              <div className="footer-column about-widget mb-3">
                <div className="logo">
                  <a href="#">
                    <img src={LogoLight} alt="brand" width={200} />
                  </a>
                </div>
                <p className="phone-num">
                  <span>PBX </span>
                  <a href="">(503) 2231-9600</a>
                </p>
                <p className="address">
                19 Av. Nte. entre 3 a Calle Pte. y Alameda Juan Pablo II.
                  San Salvador, El Salvador. <br />
                  <a href="mailto:" className="email">  </a>
                </p>
                <p className=""><small>Lun-Vie de 8:00am. a 12:00m y 2:00pm. a 6:00pm.</small>
                  <br></br> <small>Sábados de 8:00am. a 12:00m.</small>
                </p>
              </div>
            </div>
            {/* End footer left widget */}

            <div className="big-column col-xl-8 col-lg-8 col-md-12">
              <div className="row">
                <FooterContent />
              </div>
            </div>
            {/* End col-xl-8 */}
          </div>
        </div>
      </div>
      {/* End auto-container */}

      <CopyrightFooter />
      {/* <!--Bottom--> */}
    </footer>
  );
};

export default Footer;
