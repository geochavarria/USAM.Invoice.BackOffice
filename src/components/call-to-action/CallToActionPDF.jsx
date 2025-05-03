import { useCallback, useEffect, useRef, useState } from "react";

import * as PDFJS  from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url';
PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const CallToActionPDF = ({
    data = {},
    onDownload =  () => {},
}) => {
   
    const [ isLoading, setIsLoading ] =  useState(false)
    const canvasRef = useRef();


    const PdfViewer_onLoad = useCallback((data) => {
        setIsLoading(true)
        let prefix = ""
        const { identificacion } =  data
        const directoryDate =  identificacion.fecEmi.replaceAll("-", "/");

        const fullPath = `${import.meta.env.VITE_STORAGE}/${directoryDate}/${prefix}${data.codigo}`

        console.log(fullPath)

        const  loadingTask = PDFJS.getDocument("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");

        loadingTask.promise
        .then((pdf)  => {
            // Fetch the first page
            var pageNumber = 1;
            pdf.getPage(pageNumber).then(function (page) {
                
                var scale = 1.8;
                var viewport = page.getViewport({ scale });
    
                // Prepare canvas using PDF page dimensions
                const canvas = canvasRef.current;
                var context = canvas.getContext("2d");

                // Limpiar canvas antes de renderizar
                context.clearRect(0, 0, canvas.width, canvas.height);

                canvas.height = viewport.height;
                canvas.width = viewport.width;
    
                var renderContext = {
                    canvasContext: context,
                    viewport,
                };
                var renderTask = page.render(renderContext);

                renderTask.promise.then(() => { 
                    setIsLoading(false);
                });
            });
            }).catch((error) => { 
            console.log(error)
            setIsLoading(false)
            })
    }, [])



  

    useEffect(() => {
        const { codigo } =  (data || { })
        if (codigo) {
          PdfViewer_onLoad(data);
        }
    }, [data, PdfViewer_onLoad]);

    
    return (
      <section className="call-to-action">
        <div className="auto-container">
          <div className="outer-box p-2" data-aos="fade-up">
            <canvas  ref={canvasRef} className="w-100 pt-2"></canvas>
            
          </div>
            <div className="border-top border-2 mt-2">
                <div className="d-flex flex-row align-items-center  justify-content-between p-1">
                <div className="place-bid-btn mb-1">
                    <a className="btn btn-primary btn-sm" >
                        <i className="fa fa-cloud-download-alt align-bottom me-1"></i> Descargar
                    </a>
                </div>
                <div className="">
                    <a target="_blank" 
                        href="https://admin.factura.gob.sv/consultaPublica?ambiente=${DTE.identificacion?.ambiente}&codGen=${DTE.codigo}&fechaEmi=${DTE.identificacion?.fecEmi}" 
                        className="btn btn-outline-primary btn-sm" size="sm">Verificar en MH
                        <i className="ms-2 fa fa-arrow-right align-middle"></i>
                    </a>
                </div>
                </div>
            </div>

        </div>
      </section>
    );
  };
  
  export default CallToActionPDF;
  