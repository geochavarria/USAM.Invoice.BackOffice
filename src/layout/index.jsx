import DashboardHeader from "@/components/header/DashboardHeader";
import withRouter from "./withRouter.jsx";
import PropTypes from "prop-types";
import MobileMenu from "@/components/header/MobileMenu.jsx";
import CopyrightFooter from "@/components/dashboard-pages/CopyrightFooter.jsx";


const Layout = (props) => {
    
    return(<>
        <div className="page-wrapper dashboard footerable">
            <span className="header-span"></span>

            <DashboardHeader />
            {/* End Header */}

            <MobileMenu />
            {/* End MobileMenu */}
            { props.children }
        </div>
        <CopyrightFooter />
        {/* <!-- End Copyright --> */}
    </>)
}

Layout.propTypes = {
    children: PropTypes.object,
};

export default withRouter(Layout);