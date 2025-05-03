import { Link } from "react-router-dom";

import LogoLight from "@/assets/images/logo-light-h.png"


const SidebarHeader = () => {
  return (
    <div className="pro-header">
      <Link href="/">
        <img src={LogoLight} alt="brand" width={200} />
      </Link>
      {/* End logo */}

      <div className="fix-icon" data-bs-dismiss="offcanvas" aria-label="Close">
        <span className="flaticon-close"></span>
      </div>
      {/* icon close */}
    </div>
  );
};

export default SidebarHeader;
