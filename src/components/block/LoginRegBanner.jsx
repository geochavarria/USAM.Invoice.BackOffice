
import bg01 from "@/assets/images/university/bg.png"
const LoginRegBanner = () => {
  return (
    <section className="cta -type-2" style={{ backgroundImage: `url("${bg01}")`, paddingTop: 50, paddingBottom: 50 }}
    >
      <div className="auto-container">
        <div className="row grid-base justify-content-between">
          <div className="col-lg-5 col-md-6">
            <div className="cta-item">
              <div className="icon-wrap">
                <div className="icon icon-case"></div>
              </div>
              {/* End icon-wrap */}

              <div className="content">
                <div className="title">Visión</div>
                <div className="text">
                Formar profesionales con excelencia académica y calidad humana, 
                impartiéndoles una educación integral, que los disponga a aprender y 
                compartir conocimientos de vanguardia, contribuyendo a la evolución de 
                la sociedad, la ciencia, la tecnología y la cultura,
                a nuevos ámbitos de desarrollo.
                </div>
              </div>
              {/* End content */}
            </div>
          </div>
          {/* End .col */}

          <div className="col-lg-5 col-md-6">
            <div className="cta-item -blue">
              <div className="content">
                <div className="title">Misión</div>
                <div className="text">
                  La USAM aspira a ser líder en la formación sostenible de los estudiantes 
                  como personas de bien, orgullosos de su profesión y casa de estudios, 
                  mediante el empleo racional y creativo de recursos y procesos educativos, 
                  en beneficio de la sociedad y su desarrollo.
                </div>
              </div>
              {/* End .content */}

              <div className="icon-wrap">
                <div className="icon icon-contact"></div>
              </div>
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default LoginRegBanner;
