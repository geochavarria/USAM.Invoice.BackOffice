import React, { useEffect, useState } from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Hero5 from "@/components/heros/hero-5";
import Header from "./Header";
import About2 from "@/components/about/About2";
import { Link } from "react-router-dom";

import jsnIco from "@/assets/images/resource/json-ico.png"
import pdfIco from "@/assets/images/resource/pdf-ico.png"
import LoginRegBanner from "@/components/block/LoginRegBanner";
import Footer from "./Footer";
import MobileMenu from "@/components/header/MobileMenu";
import CallToActionPDF from "@/components/call-to-action/CallToActionPDF";


const metadata = {
  title: "Inicio",
};

const HomePage5 = () => {

  const [ documentList, setDocumentList ] =  useState([])
  const [ selectedData, setSelectedData ] = useState({})
  const [ showViewerModal, setShowViewerModal ] = useState(false)
  const [ isLoading, setIsLoading ] =  useState(false)

  const itemSelected_onClick = (e)=> {
    const { data } =  e
    setSelectedData(data)

    scrollToSection('section-viewer')
  }


  const fx_fileGenerate = async({docURL,  codigo, ext }) => {
    fetch(docURL)
    .then( res => res.blob() )
    .then( blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = `${codigo}.${ext}`;
        a.click();    
        a.remove();
    });
  } 

  const DownlodaFile_onClick =  async(e) => {
    const  { data, type  }  =  e
    var prefix =""
    // if(data.estado === "N"){
    //     prefix = "Invalidacion/"
    // }

    try {
      const { identificacion } =  data
      const directoryDate =  identificacion.fecEmi.replaceAll("-", "/");

      const fullPath = `${import.meta.env.VITE_STORAGE}/${directoryDate}/${prefix}${data.codigo}`
      const pdfURL = `${fullPath}.${type}`
      await fx_fileGenerate({ 
        docURL: pdfURL, 
        codigo:  data.codigo, 
        ext:  type 
      })
    } catch (error) {
      console.log(error)
    }
  }


  const btnSearch_onClick = (e) =>{
    setIsLoading(true);
    setDocumentList([])
    setSelectedData({})

    try {
      const { DocRef, DocType } =  this.searchModel
      
    } catch (error) {
      
    }
  }


  const scrollToSection = (sectionId)  => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  }


  return (
    <>
      <MetaComponent meta={metadata} />

      <Header />
      {/* <!--End Main Header --> */}

      <MobileMenu />
      {/* End MobileMenu */}

      <Hero5  onChange={e => console.log(e)}/>

      {/* End Hero Section */}
      <section className="about-section-two py-2 pb-5" id="section-info">
        <div className="auto-container">
          <div className="row">
            <About2 />
          </div>
        </div>
      </section>
      {/* <!-- End About Section --> */}

  
      <section className="job-categories style-two py-2" id="section-docs">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2 className="pb-0 "> Descarga tu Documento Tributario Electrónico</h2>
            <div className="text mt-0">Los documentos están disponibles a partir de marzo de 2024.</div>
          </div>

          <div className="row " data-aos="fade-up"data-aos-anchor-placement="top-bottom">
            {/* <!-- Category Block --> */}
            <div className="row category-block">
            {Array(6).fill(null).map((_item, index)=> (
              <div className="job-block col-lg-6 col-md-12 col-sm-12 mb-2"
                key={index} >
                  <div className="inner-box px-3 pb-1 pt-4">
                    <div className="content">
                      <span className="company-logo">
                        {/* Icon */}
                        <i className="icon icon-md flaticon-money-1" />
                      </span>
                      
                      <h4 className="ms-2 pb-0 mb-0">
                        <Link onClick={e => itemSelected_onClick({
                            data : {..._item,
                            identificacion : { fecEmi : "2025-03-13" },
                            codigo :  "CE644747-1947-41E7-97EE-B2F514E479DD" } 
                        })} className="fs-7">
                          CE644747-1947-41E7-97EE-B2F514E479DD.pdf
                        </Link>
                      </h4>

                      <div className="ms-2 fs-7 ">
                        <ul className="d-flex justify-content-between">
                          <li>
                            <span className="flaticon-map-locator"></span>
                            {"San Salvador"}
                          </li>
                          {/* location info */}
                          <li>
                            <span className="flaticon-confirm-schedule"></span>{" "}
                            {"02/02/2024"}
                          </li>
                          {/* time info */}
                          <li className="text-success fw-semibold">
                            <span className="flaticon-money text-success"></span>{" "}
                            {"18,000.00"}
                          </li>
                          {/* salary info */}
                        </ul>
                      </div>
                      {/* End .job-info */}

                      <ul className="job-other-info">
                          <li  className={`green ` + " mb-0"} >
                            Procesado
                          </li>
                          <li  className={`error ` + " mb-0"} >
                            Anulado
                          </li>
                          <li  className={`required ` + " mb-0"} >
                            Sin Enviar
                          </li>
                      </ul>
                      {/* End .job-other-info */}
                      <div className="d-flex justify-content-between">

                        <button className="bookmark-btn" 
                          onClick={e => DownlodaFile_onClick({
                            data:  {..._item},
                            type : "json"
                          })}>
                          <img  src={jsnIco} style={{width: "32px"}}   alt="json-file" />
                        </button>
                        <button className="bookmark-btn" style={{right:36}}
                          onClick={e => DownlodaFile_onClick({
                            data:  {..._item, 
                              codigo :  "CE644747-1947-41E7-97EE-B2F514E479DD",
                              identificacion : { fecEmi : "2025-03-13" },
                            },
                            type : "pdf"
                          })}>
                          <img  src={pdfIco} style={{width: "32px"}}   alt="json-file" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>
      {/* End document  Section */}


      <section className="news-section py-3"  id="section-viewer">
        <div className="auto-container">
          <div className="sec-title text-center mb-2">
            <h2 className="mb-0 ">Tu Factura Electrónica</h2>
            <div className="text mt-0">
              Visualiza y descarga tu comprobante.
            </div>
          </div>
          <div className="row" data-aos="fade-up">
            <CallToActionPDF data = { selectedData } onDownload={e => { }} />
          </div>
        </div>
       
      </section>
      
      {/* <!-- End Call To Action --> */}

      <LoginRegBanner />
      {/* <!-- End Login/Register Block --> */}

      <Footer />
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default HomePage5;
