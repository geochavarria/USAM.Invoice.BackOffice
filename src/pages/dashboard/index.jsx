
import MetaComponent from "@/components/common/MetaComponent";
import BreadCrumb from "@/components/dashboard-pages/BreadCrumb";
import CopyrightFooter from "@/components/dashboard-pages/CopyrightFooter";
import MenuToggler from "@/components/dashboard-pages/MenuToggler";
import DashboardHeader from "@/components/header/DashboardHeader";
import MobileMenu from "@/components/header/MobileMenu";

const metadata = {
  title: "Dashboard",
};

const Index = () => {
  
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="page-wrapper dashboard">
        <span className="header-span"></span>
        {/* <!-- Header Span for hight --> */}
        <DashboardHeader />
        {/* End Header */}

        <MobileMenu />
        {/* End MobileMenu */}

        {/* <!-- Dashboard --> */}
        <section className="user-dashboard">
          <div className="dashboard-outer">
            <BreadCrumb title="Dashboard Home!" />
            {/* breadCrumb */}

            <MenuToggler />
            {/* Collapsible sidebar button */}

            <div className="row">
              Somenthing else
            </div>
            {/* End .row top card block */}

            <div className="row">
              <div className="col-xl-7 col-lg-12">
                {/* <!-- Graph widget --> */}
                <div className="graph-widget ls-widget">
                  Somenthing else
                </div>
                {/* End profile chart */}
              </div>
              {/* End .col */}

              <div className="col-xl-5 col-lg-12">
                {/* <!-- Notification Widget --> */}
                <div className="notification-widget ls-widget">
                  <div className="widget-title">
                    <h4>Notifications</h4>
                  </div>
                  <div className="widget-content">
                    Somenthing else
                  </div>
                </div>
              </div>
              {/* End .col */}

              <div className="col-lg-12">
                {/* <!-- applicants Widget --> */}
                <div className="applicants-widget ls-widget">
                  <div className="widget-title">
                    <h4>Recent Applicants</h4>
                  </div>
                  <div className="widget-content">
                    <div className="row">
                      {/* <!-- Candidate block three --> */}

                      Somenthing else
                    </div>
                  </div>
                </div>
              </div>
              {/* End .col */}
            </div>
            {/* End .row profile and notificatins */}
          </div>
          {/* End dashboard-outer */}
        </section>
        {/* <!-- End Dashboard --> */}

        <CopyrightFooter />
        {/* <!-- End Copyright --> */}
      </div>
    </>
   
  );
};

export default Index;
