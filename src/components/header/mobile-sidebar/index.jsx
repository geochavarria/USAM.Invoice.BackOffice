
import { Link } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";

import mobileMenuData from "@/data/mobileMenuData";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

import {
  isActiveLink,
  isActiveParentChaild,
} from "@/utils/linkActiveChecker";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Index = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      {/* End pro-header */}

        <Sidebar>
          <Menu>
            {mobileMenuData.map((item, i) => (
             <MenuItem
                className={
                isActiveLink(item.routePath, pathname)
                    ? "menu-active-link"
                    : ""
                }
                key={i}
                component={<Link href={item.routePath} />}
            >
                {item.name}
            </MenuItem>
            ))}
          </Menu>
        </Sidebar>

      <SidebarFooter />
    </div>
  );
};

export default Index;
