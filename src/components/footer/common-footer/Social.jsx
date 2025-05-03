const Social = () => {
  const socialContent = [
    { id: 1, icon: "fa-facebook-f", link: "https://www.facebook.com/usamelsalvador" },
    { id: 2, icon: "fa-twitter", link: "https://x.com/usamelsalvador" },
    { id: 3, icon: "fa-instagram", link: "https://www.instagram.com/usamelsalvador/" },
    { id: 4, icon: "fa-linkedin-in", link: "https://sv.linkedin.com/company/usamelsalvador" },
  ];
  return (
    <>
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
    </>
  );
};

export default Social;
