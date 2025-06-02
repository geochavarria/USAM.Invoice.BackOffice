import React from "react";
import TopCardBlock from "./TopCardBlock";
import ProfileChart from "./ProfileChart";
import ApplicationResume from "./ApplicationResume";
import DocumentResume from "./DocumentResume";




const DashboardOne =()=>{


    return(<React.Fragment>
        <div className="row">
          <TopCardBlock />
        </div>
        <div className="row">
          <div className="col-xxl-5 col-xl-6 col-lg-6 col-md-12">
            {/* <!-- Graph widget --> */}
            <div className="graph-widget ls-widget">
              <ProfileChart />
            </div>
            {/* End profile chart */}
          </div>
          {/* End .col */}
          <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-12">
            <div className="notification-widget ls-widget">
              <ApplicationResume />
            </div>
          </div>
          <div className="col-xxl-4 col-lg-6 col-md-12">
            <div className="notification-widget ls-widget">
              <DocumentResume />
            </div>
          </div>
        </div>
    </React.Fragment>)
}

export default DashboardOne;