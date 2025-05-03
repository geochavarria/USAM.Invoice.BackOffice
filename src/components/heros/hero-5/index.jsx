import SearchForm from "@/components/common/job-search/SearchForm";
import ImageBox from "./ImageBox";
import PopularSearch from "../PopularSearch";
import { useState } from "react";
import { DOCREF } from "@/common/constants/docTypes";



const index = ({
  onDataSource = () => {}
}) => {
  const [ error, setError ] = useState(undefined)


  const hadleChange = (e) => {
    const { DocRef, DocType } =  e
    setError(undefined)
    if(!DocRef.trim()){
      setError("Referencia:  termino de búsqueda no válida.")
      return
    }
    console.log(DocType)
    if(!DocType.trim()){
      //Dato Vacio
      setError("[Type]Referencia vacía");
    }else if (DocType === DOCREF.GENERACION && DocRef.length < 36){
      setError("[Type]Formato de generación incorrecto");
    }else if (DocType === DOCREF.NCONTROL && DocRef.length < 31){
      setError("[Type]Formato de número de control incorrecto");
    }


  }



  return (
    <section className="banner-section-five">
      <div className="auto-container">
        <div className="row">
          <div className="content-column col-lg-7 col-md-12 col-sm-12">
            <div
              className="inner-column"
              data-aos="fade-up" 
              data-aos-delay="500"
            >
              <div className="title-box">
                <h3>
                  ¡Consulta tu <span className="colored">Facturación</span> de forma fácil!
                </h3>
                <div className="text">
                  En esta sección, podrás acceder a tus documentos tributarios electrónicos (DTE) emitidos por la institución.
                  Porque aquí, donde formamos imparables, cada paso cuenta en tu camino.
                </div>
              </div>

              {/* <!-- Job Search Form --> */}
              <div className="job-search-form btn-green mb-0 px-0 py-1">
                <SearchForm onChange={e=> hadleChange(e) } />
              </div>
              {/* <!-- Job Search Form --> */}

              {/* <!-- Popular Search --> */}
              <PopularSearch />
              {/* <!-- End Popular Search --> */}
              { error && <div className="alert alert-danger py-1" role="alert">
                  {error}
                </div> }
            </div>

            
          </div>
          {/* End .col */}

          <div className="image-column col-lg-5 col-md-12">
            <ImageBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
