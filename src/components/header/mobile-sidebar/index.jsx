
import { Link } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";

import {homeItems as mobileMenuData} from "@/data/mainMenuData";
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
          {mobileMenuData.map((item, index) => (
              <SubMenu
                className={
                  isActiveParentChaild(item.items, pathname)
                    ? "menu-active"
                    : ""
                }
                label={item.name}
                key={"menu"+index}
              >
                {(item.items || []).map((menuItem, i) => (
                  <MenuItem

                  onClick={()=>navigate(menuItem.routePath)}
                    className={
                      isActiveLink(menuItem.routePath, pathname)
                        ? "menu-active-link"
                        : ""
                    }
                    key={"submenu"+i}
                    // routerLink={<Link to={menuItem.routePath} />}
                  >
                    {menuItem.name}
                  </MenuItem>
                ))}
              </SubMenu>
            ))}


          <MenuItem
               onClick={()=>navigate("/logout")}
          >Cerrar Sesion</MenuItem>
          </Menu>

         
        </Sidebar>

      <SidebarFooter />
    </div>
  );
};

export default Index;
