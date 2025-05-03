const SidebarFooter = () => {
  const socialContent = [
    { id: 1, icon: "fa-facebook-f", link: "https://www.facebook.com/usamelsalvador" },
    { id: 2, icon: "fa-twitter", link: "https://x.com/usamelsalvador" },
    { id: 3, icon: "fa-instagram", link: "https://www.instagram.com/usamelsalvador/" },
    { id: 4, icon: "fa-linkedin-in", link: "https://sv.linkedin.com/company/usamelsalvador" },
  ];

  return (
    <div className="mm-add-listing mm-listitem pro-footer">
      <a href="#" className="theme-btn btn-style-one mm-listitem__text d-none">
        
      </a>
      {/* job post btn */}

      <div className="mm-listitem__text">
        <div className="contact-info">
          <span className="phone-num">
            <span>PBX</span>
            <a href="tel:503223196000" className="text-primary">(503) 2231-9600</a>
          </span>
          <span className="address">
            19 Av. Nte. entre 3 a Calle Pte. y Alameda Juan Pablo II. San Salvador, El Salvador. <br />
          </span>
          <a href="mailto:" className="email"> </a>
        </div>
        {/* End .contact-info */}

        <div className="social-links">
          {socialContent.map((item) => (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
            >
              <i className={`fab ${item.icon}`}></i>
            </a>
          ))}
        </div>
        {/* End social-links */}
      </div>
      {/* End .mm-listitem__text */}
    </div>
  );
};

export default SidebarFooter;
