const BreadCrumb = ({ title = "" }) => {
  return (
    <div className="upper-title-box mb-2">
      <h4 className="fw-bold">{title}</h4>
      <div className="text"></div>
    </div>
  );
};

export default BreadCrumb;
