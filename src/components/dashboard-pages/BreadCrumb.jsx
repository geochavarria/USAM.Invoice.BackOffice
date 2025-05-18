const BreadCrumb = ({ title = "", caption ="" }) => {
  return (
    <div className="upper-title-box mb-2">
      <h4 className="fw-bold">{title}</h4>
      <div className="text">{caption}</div>
    </div>
  );
};

export default BreadCrumb;
