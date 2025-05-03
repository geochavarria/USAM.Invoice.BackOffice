import { Link } from "react-router-dom";
import footerContent from "@/data/footerContent";

const FooterContent = () => {
  return (
    <>
      {footerContent.map((item) => (
        <div
          className="footer-column col-lg-4 col-md-6 col-sm-12 mb-0"
          key={item.id}
        >
          <div className="footer-widget links-widget">
            <h4 className="widget-title">{item.title}</h4>
            <div className="widget-content">
              <ul className="list">
                {item?.menuList?.map((menu, i) => (
                  <li key={i}>
                    <Link href={menu.route}>{menu.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FooterContent;
