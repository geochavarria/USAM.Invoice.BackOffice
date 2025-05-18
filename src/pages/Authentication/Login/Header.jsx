import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import logoLight from "@/assets/images/logo-light-h.png"


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
    return(<React.Fragment>
        <header
            className={`main-header ${
                navbar ? "fixed-header animated slideInDown" : ""
            }`}>
            <div className="container-fluid">
                {/* <!-- Main box --> */}
                <div className="main-box">
                    <div className="nav-outer">
                        <div className="logo-box">
                            <div className="logo">
                                <Link to="/" className="noSticky">
                                    <img
                                        width={250}
                                        src={logoLight}
                                        alt="logo"
                                        title="brand"
                                    />
                                </Link>
                                <Link to="/" className="isSticky">
                                    <img
                                        width={100}
                                        src={logoLight}
                                        alt="logo"
                                        title="brand"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="outer-box">
                        {/* <!-- Login/Register --> */}
                        <div className="btn-box">
                    
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </React.Fragment>)
}

export default Header