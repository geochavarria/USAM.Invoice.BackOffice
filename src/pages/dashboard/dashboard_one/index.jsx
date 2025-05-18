import React from "react";
import TopCardBlock from "./TopCardBlock";
import ProfileChart from "./ProfileChart";




const DashboardOne =()=>{


    return(<React.Fragment>
        <div className="row">
          <TopCardBlock />
        </div>
        <div className="row">
          <div className="col-xl-7 col-lg-12">
            {/* <!-- Graph widget --> */}
            <div className="graph-widget ls-widget">
              <ProfileChart />
            </div>
            {/* End profile chart */}
          </div>
            {/* End .col */}
        </div>
    </React.Fragment>)
}

export default DashboardOne;