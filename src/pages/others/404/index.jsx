import { Link } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";

import Logo404 from "@/assets/images/404.jpg"
import LogoLight from "@/assets/images/logo-light.png"

const metadata = {
  title: "Page Not Found",
};

/**
 * Error 404
 */
const NotFoundPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <div
        className="error-page-wrapper "
        style={{
          backgroundImage: `url(${Logo404})`,
        }}
        data-aos="fade"
      >
        <div className="content">
          <div className="logo">
            <Link to="/">
              <img
                src={LogoLight}
                alt="brand"
                width={100}
              />
            </Link>
          </div>
          {/* End logo */}

          <h1 className="text-primary">404!</h1>
          <p>La página que estas buscando no fue encontrada.</p>

          <Link className="theme-btn btn-style-three call-modal" to="/">
            INICIO
          </Link>
        </div>
        {/* End .content */}
      </div>
    </>
  );
};

export default NotFoundPage
