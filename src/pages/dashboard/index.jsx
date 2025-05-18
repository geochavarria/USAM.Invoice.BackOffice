
import MetaComponent from "@/components/common/MetaComponent";
import BreadCrumb from "@/components/dashboard-pages/BreadCrumb";
import CopyrightFooter from "@/components/dashboard-pages/CopyrightFooter";
import MenuToggler from "@/components/dashboard-pages/MenuToggler";
import DashboardHeader from "@/components/header/DashboardHeader";
import MobileMenu from "@/components/header/MobileMenu";
import CustomPage from "@/layout/CustomPage";
import { Row } from "reactstrap";
import DashboardOne from "./dashboard_one";

const metadata = {
  title: "Dashboard",
};

const Index = () => {
  
  return (
    <>
      <MetaComponent meta={metadata} />
      <CustomPage pageTitle={metadata.title } caption={"¿Que está pasando en el HUB?"}> 
        <DashboardOne />
        {/* End .row top card block */}
      </CustomPage>
    
    </>
   
  );
};

export default Index;
