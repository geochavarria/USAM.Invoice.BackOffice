
import MetaComponent from "@/components/common/MetaComponent";
import CustomPage from "@/layout/CustomPage";
import DocumentTable from "./DocumentTable";
import CustomCatchError from "@/components/common/CustomCatchError";
import { useState } from "react";
import ConsultaPublicaModal from "@/components/common/mh-search/ConsultaPublicaModal";
import { OperacionUsuario } from "@/common/constants";
import { getFileByDirectoryPathAsync } from "@/helpers/backend_helpers/documentManagement_helpers";
import { APP_DIRECTORY_PATH } from "@/config";
import PDFViewerModal from "@/components/common/PDFViewerModal";
import ContentWaitLoading from "@/components/common/ContentWaitLoading";
import InvoiceForm from "./InvoiceModal";
import { toast } from "react-toastify";
import SendEmailModal from "./SendEmailModal";

const metadata = {
  title: "Documentos Transmitidos",
};

const Documentos = () => {


  //Data State
  const [ selectedData, setSelectedData] = useState({})

  //Control State
  const [ showPrintModal, setShowPrintModal ] =  useState(false)
  const [ showFacturaModal, setShowFacturaModal ]  = useState(false)
  const [ printOptions, setPrintOptions ] = useState({
      url:  ""
  })

  //Modal State
  const [ showVerifyModal, setShowVerifyModal ] =  useState(false)
  const [ showSendEmailModal, setShowSendEmailModal ] =  useState(false)

  //Trigger State
  const [ catchError, setCatchError ] =  useState("")
  const [ isLoading, setIsLoading ] =  useState(false)

  const documentTable_onRowClick = (e) => {
    const { action, data, index } = e
    setSelectedData(data)
    
    if(action === OperacionUsuario.EXPORTAR){
        setShowVerifyModal(true)
    }else if(action === OperacionUsuario.VER){
        setShowFacturaModal(true)
    }
    else if(action === OperacionUsuario.ANULAR){
        btnAnular_onClick(e)
    }else if(action === OperacionUsuario.IMPRIMIR){
        btnImprimir_onClick(e)
    }
    else if(action === OperacionUsuario.PROCESAR){
       setShowSendEmailModal(true)
    }
}


  const btnAnular_onClick = (e) => {

    toast.error("Opción no habilitado.", {
      position: "top-right",
      hideProgressBar: false, 
      closeOnClick: false
    })
  }

  const btnImprimir_onClick = async(e) => {
    setIsLoading(true)
    try {
        const { data } =  e
        const path  = `${APP_DIRECTORY_PATH}\\\\${data.fecEmi.replaceAll("-","\\\\")}\\\\${data.codigo}.pdf`
        const response =  await getFileByDirectoryPathAsync(path)

        setPrintOptions({
            url: URL.createObjectURL(response),
            type: "pdf"
        })
        setShowPrintModal(true)

    } catch (error) {
        setCatchError(error)
    }finally{
        setIsLoading(false)
    }
  } 


  return (
    <>
        <MetaComponent meta={metadata} />
        <CustomPage pageTitle={metadata.title }>
          <div className="row">
              <div className="col-lg-12">
                <CustomCatchError innerException={catchError} life={5000} />
                  <div className="ls-widget">
                      <div className="tabs-box">
                          <div className="widget-title pb-0">
                              <h4>Facturación Transmitida</h4>
                          </div>
                          <div className="widget-content">
                            <DocumentTable  
                              rows={ 20 }
                              onSetRowSelected = { (e) => {}}
                              onRowClick={(evt) => documentTable_onRowClick(evt)}
                              onError={e => setCatchError(e)}/>
                          </div>
                          
                      </div>
                  </div>
              </div>
          </div>
          <ContentWaitLoading isLoading={isLoading} />
        </CustomPage>


        {showFacturaModal && <InvoiceForm 
            show={ showFacturaModal }
            data={ selectedData }
            onHide={e => setShowFacturaModal(false)} />}


        {showSendEmailModal && <SendEmailModal 
            show={ showSendEmailModal }
            data={ selectedData }
            onHide={e => setShowSendEmailModal(false)} />}

        {showVerifyModal &&  
          <ConsultaPublicaModal
              show={showVerifyModal} 
              data={selectedData}
              onHide={e => setShowVerifyModal(false)}/> }

        { showPrintModal && 
          <PDFViewerModal
            show={ showPrintModal }
            params={ printOptions }
            onHide={e => setShowPrintModal(false)}
        />}

        
    </>
  );
};

export default Documentos
