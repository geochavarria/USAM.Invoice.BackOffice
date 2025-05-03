
import banner01 from "@/assets/images/university/banner-01.png"
import banner02 from "@/assets/images/university/banner-02.png"
import banner03 from "@/assets/images/university/banner-03.png"

import multiPeople from "@/assets/images/university/multi-peoples.png"

const ImageBox = () => {
  return (
    <div className="image-box">
      <div className="row">
        <div
          className="column col-lg-6 col-md-6 col-sm-12"
          data-aos-delay="1500"
          data-aos="fade-right"
        >
          <figure className="image">
            <img src={banner01} alt="resource" style={{ width: "180px"}}/>
          </figure>
        </div>
        <div
          className="column col-lg-6 col-md-6 col-sm-12"
          data-aos-delay="2000"
          data-aos="fade-left"
        >
          <figure className="image">
            <img src={banner02} alt="resource" style={{ width: "180px"}} />
          </figure>
          <figure className="image">
            <img src={banner03} alt="resource" style={{ width: "180px"}}/>
          </figure>
        </div>
      </div>

      {/* <!-- Info BLock One --> */}
      <div className="info_block" data-aos-delay="2500" data-aos="fade-in">
        <span className="icon flaticon-email-3"></span>
        <p>
          Revisa tu E-mail
        </p>
      </div>

      {/* <!-- Info BLock Two --> */}
      <div className="info_block_two" data-aos-delay="3000" data-aos="fade-in">
        <p>10K+ Profesionales</p>
        <div className="image">
          <img src={multiPeople} alt="resource" />
        </div>
      </div>
    </div>
  );
};

export default ImageBox;
