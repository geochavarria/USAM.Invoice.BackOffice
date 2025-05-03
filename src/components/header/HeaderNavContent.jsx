

import { Link } from "react-router-dom";
import {
  homeItems
} from "../../data/mainMenuData";
import {
  isActiveLink,
} from "../../utils/linkActiveChecker";
import { useEffect } from "react";


import { useLocation } from "react-router-dom";
const HeaderNavContent = () => {
  const { pathname } = useLocation();



  return (
    <>
      <nav className="nav main-menu">
        <ul className="navigation" id="navbar">
          {/* current dropdown */}
          {homeItems.map((menu, i) => (
       
              <li key={i}
                className={ ` ${isActiveLink(menu.routePath, pathname) ? "current"  : ""} dropdown` }>
                <span>{menu.name}</span>
                {menu.items && (<>
                  <ul>
                  {menu.items.map((item, i) => (
                    <li
                      className={
                        isActiveLink(item.routePath, pathname) ? "current" : ""
                      }
                      key={i}
                    >
                      <Link to={item.routePath}>{item.name}</Link>
                    </li>
                  ))}
                  </ul>
                </>)}
               
              </li>
            ))}
          {/* End homepage menu items */}

        </ul>
      </nav>
    </>
  );
};

export default HeaderNavContent;
