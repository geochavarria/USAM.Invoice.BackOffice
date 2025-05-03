import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderNavContent from "@/components/header/HeaderNavContent";


import LogoLight from "@/assets/images/logo-light.png"

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    // <!-- Main Header-->
    <header
      className={`main-header header-style-three  ${
        navbar ? "fixed-header animated slideInDown" : ""
      }`}
    >
      {/* <!-- Main box --> */}
      <div className="main-box">
        {/* <!--Nav Outer --> */}
        <div className="nav-outer">
          <div className="logo-box">
            <div className="logo">
              <Link to="/">
                <img
                  width={65}
                  src={LogoLight}
                  alt="brand"
                />
              </Link>
            </div>
          </div>
          {/* End .logo-box */}

          <HeaderNavContent />
          {/* <!-- Main Menu End--> */}
        </div>
        {/* End .nav-outer */}

        <div className="outer-box">
          {/* <!-- Add Listing --> */}
          <Link to="/#" className="upload-cv d-none"></Link>
          {/* <!-- Login/Register --> */}
          <div className="btn-box">
            <a
              href="#"
              className="theme-btn btn-style-three call-modal d-none"
              data-bs-toggle="modal"
              data-bs-target="#loginPopupModal"
            >
              Login
            </a>
            <Link
              to="https://www.usam.edu.sv/"
              target="_blank"
              className="theme-btn btn-style-seven"
            >
              Sitio
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
