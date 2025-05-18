
import classNames from "classnames";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AccordionBody, AccordionHeader, AccordionItem, Col, Modal, ModalBody, ModalHeader, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table, UncontrolledAccordion } from "reactstrap";

import { useWindowDimensions } from "@/common/hooks/WindowsHook";
import CustomCatchError from "@/components/common/CustomCatchError";


import { getFileByDirectoryPathAsync, getInvoiceDocumentByCodeAsync } from "@/helpers/backend_helpers/documentManagement_helpers";
import { dateTimeToHTML, dateTimeToNormal, dateToNormal } from "@/common/core/utilities/dateTime";
import { NumberColMoney } from "@/components/controls/General";
import { StatusColString } from "@/components/controls/Status";

import logoLight from "@/assets/images/logo-light-h.png"
import jsnIco from "@/assets/images/resource/json-ico.png"
import pdfIco from "@/assets/images/resource/pdf-ico.png"
import PDFViewerModal from "@/components/common/PDFViewerModal";
import { APP_DIRECTORY_PATH } from "@/config";
import ContentWaitLoading from "@/components/common/ContentWaitLoading";


const InvoiceForm = ({
    show,
    data = {},
    onConfirm ,
    onHide = () => {}
}) => {
    //Hooks
    const { width : widthScreen } = useWindowDimensions()

    //Data State
    const [ selectedInvoice, setSelectedInvoice ] =  useState({})

    //Control State
    const [ showModal, setShowModal]  = useState(false)
    const [ showPrintModal, setShowPrintModal ] =  useState(false)
    const [ isFullScreenModal, setIsFullScreenModal]=  useState(false)
    const [ isLoadingData, setIsLoadingData ] = useState(false)
    
    //Trigger State
    const [ printOptions, setPrintOptions ] = useState({
        url:  ""
    })
    const [ catchError, setCatchError ] =  useState("")


    const [activeTab, setActiveTab ] = useState("0")
    const tabSection_onChange = (tab) => {
        if (activeTab !== tab) 
            setActiveTab(tab);
    }
    
    const fx_getFacturaDTEByCode = async (codigo) => {
        setIsLoadingData(true)
        setSelectedInvoice({})
        try{
            
            const response =  await getInvoiceDocumentByCodeAsync(codigo)
            if (!response.succeeded) {
                throw new Error(response.message)
            }

            setSelectedInvoice(response.data || {})
        }catch(ex){
            setCatchError(ex)
        }finally{
            setIsLoadingData(false)
        }

    }


    const validationData =  useFormik(({
        enableReinitialize : true,
        values: {

        }
    }));
    const modalToggle_onClick = useCallback(()=> {
        setShowModal(!showModal)
        onHide(!showModal)
        validationData.resetForm()
    },[onHide, showModal, validationData])


    const btnImprimir_onClick = async(e) => {
        const { data } = e
        const { identificacion } =  data
         setIsLoadingData(true)
        try {
            const { data } =  e
            const path  = `${APP_DIRECTORY_PATH}//${identificacion.fecEmi.replaceAll("-","//")}//${data.codigo}.pdf`
            const response =  await getFileByDirectoryPathAsync(path)
      
            setPrintOptions({
                url: URL.createObjectURL(response),
                type: "pdf"
            })
            setShowPrintModal(true)
      
        } catch (error) {
            setCatchError(error)
        }finally{
            setIsLoadingData(false)
        }
    }
    
    
    useEffect(()=> {
        if(show){
            setShowModal(show)
            const { codigo }  = data
            if(codigo){
                fx_getFacturaDTEByCode(codigo)
            }
        }
    }, [show, data])

    return(<React.Fragment>
        <Modal isOpen={ showModal } id="modalSolicitud" centered
            backdrop={'static'}
            keyboard={ false }
            toggle={(evt) => modalToggle_onClick(evt) }
            fullscreen = { isFullScreenModal }
            className={ classNames({
                "modal-xl" : widthScreen >= 992,
                "modal-fullscreen-lg-down" : widthScreen < 992
            })}>
            <ModalHeader className="p-3 bg-primary-subtle" 
                cssModule={{"modal-title" : "modal-title w-100"}}
                toggle={(evt) => modalToggle_onClick(evt)}>
                <div className='d-flex flex-row justify-content-between w-100'>
                    <span className='title'>Factura Electrónica (DTE)</span>
                    
                    <button type="button" className="btn btn-ghost-dark p-0 px-2"
                        onClick={(e)=> setIsFullScreenModal(!isFullScreenModal)}>
                        <i className="ri-fullscreen-line fs-18" />
                    </button>
                </div>
            </ModalHeader>
            <ModalBody className="p-0">
                
                <section className="invoice-section py-2" style={{minHeight: "inherit"}}>
                    
                    <div className="auto-container">
                        <Row>
                            <CustomCatchError
                                innerException={ catchError }
                                life={5000}
                                onClean = { setCatchError } />
                        </Row>
                        <div className="invoice-wrap">
                            <div className="invoice-content p-4">
                                <div className="d-flex justify-content-end">
                                <   button className="btn btn-info btn-sm" 
                                        onClick={e => btnImprimir_onClick({
                                            data:  {...selectedInvoice},
                                            type : "pdf"
                                        })}>
                                        <i className="la la-print fs-5" />
                                    </button>
                                  
                                </div>
                                <div className="logo-box">
                                    <div className="logo">
                                        <Link to="/">
                                            <img
                                            width={180}
                                            src={logoLight} 
                                            alt="logo"
                                            />
                                        </Link>
                                        <div className="lh-1"  id="payment-status" ><StatusColString status={selectedInvoice.estado}/></div>
                                    </div>
                                    <div className="invoice-id fs-6 flex-column align-items-end"  style={{maxWidth: 420}} >
                                        <span className="fs-6 mb-0">No. {selectedInvoice.codigo}</span>
                                        <p className="fs-8">{selectedInvoice.identificacion?.numeroControl}</p>
                                     
                                    </div>
                                </div>

                                {/* Info Box*/}
                                <div className="info-box row mb-">
                                    <Col md={6}>
                                        <div className="left-column pe-0">
                                            <div className="info">
                                            <h6>Emisión:</h6>
                                            <span>{ dateTimeToNormal(selectedInvoice.fechaEmision)}</span>
                                            </div>

                                            <div className="info mb-3">
                                                <h4 className="mb-1">Emisor</h4>
                                                <h5 className="mb-0" >{selectedInvoice.emisor?.nombre}</h5>
                                                <p className="fs-8 lh-sm">{selectedInvoice.emisor?.direccion?.complemento}</p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="right-column pe-0">
                                            <div className="info">
                                            <h6>Fecha Contable:</h6>
                                            <span>{ dateToNormal(selectedInvoice.fechaContable)}</span>
                                            </div>

                                            <div className="info mb-3">
                                                <h4 className="mb-1">Receptor/Cliente</h4>
                                                <h5 className="mb-0" >{selectedInvoice.receptor?.nombre}</h5>
                                                <p className="fs-8 lh-sm">{selectedInvoice.receptor?.direccion?.complemento}</p>
                                                <p className="text-muted fs-8 lh-sm"><span id="billing-phone-no">{selectedInvoice.receptor?.telefono}</span></p>
                                                <p className="text-muted fs-8 lh-sm"><span id="billing-email-no">{selectedInvoice.receptor?.correo}</span> </p>
                                            </div>
                                        </div>
                                    </Col>
                                </div>
                                {/* Table */}
                                <Row className="pt-3 border-top border-top-dashed">
                                    <Nav tabs className="" role="tablist">
                                        <NavItem>
                                            <NavLink to="#" className={ classNames({ 
                                                    active: activeTab === "0" 
                                                })}
                                                onClick={() => {
                                                    tabSection_onChange("0");
                                                }} 
                                                type="button">
                                                <i className="la la-home me-1 fs-14"></i>
                                                Detalle
                                            </NavLink>
                                        </NavItem>  
                                        <NavItem>
                                            <NavLink to="#" className={ classNames({ 
                                                    active: activeTab === "1" 
                                                })}
                                                onClick={() => {
                                                    tabSection_onChange("1");
                                                }} 
                                                type="button">
                                                <i className="la la-money me-1 fs-14"></i>
                                                Pagos
                                            </NavLink>
                                        </NavItem>  
                                        <NavItem>
                                            <NavLink to="#" className={ classNames({ 
                                                    active: activeTab === "99" 
                                                })}
                                                onClick={() => {
                                                    tabSection_onChange("99");
                                                }} 
                                                type="button">
                                                <i className="fa fa-qrcode me-1 fs-14"></i>
                                                Fima Electrónica
                                            </NavLink>
                                        </NavItem>   
                                    </Nav>
                                    <TabContent activeTab={activeTab} className="mb-0">
                                        <TabPane tabId="0">
                                            <div className="pt-3">
                                                <div className="table-responsive">
                                                    <Table striped hover  className=" fs-13 table-nowrap align-middle table-sm mb-0">
                                                        <thead className="text-center">
                                                            <tr className="table-active">
                                                                <th scope="col" style={{width: "25px"}}>#</th>
                                                                <th scope="col">Descripción</th>
                                                                <th scope="col" style={{width:"3rem"}}>Cantidad</th>
                                                                <th scope="col" style={{width:"5rem"}}>Precio</th>
                                                                <th scope="col" style={{width:"5rem"}} className="text-end">Exento</th>
                                                                <th scope="col" style={{width:"5rem"}} className="text-end">Gravado</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="fs-7">
                                                        {(selectedInvoice.cuerpoDocumento || []).map((_item, index)=> (
                                                            <tr key={index}>
                                                                    <th scope="row">{_item.numItem}</th>
                                                                    <td className="text-start">
                                                                        <span className="fw-semibold">{_item.descripcion}</span>
                                                                        <p className="text-muted lh-1 fs-9">Cod. Unidad: {_item.uniMedida} </p>
                                                                    </td>
                                                                    <td className="text-end">{_item.cantidad.toFixed(2)}</td>
                                                                    <td className="text-end"> <NumberColMoney value={_item.precioUni} /></td>
                                                                
                                                                    <td className="text-end"> <NumberColMoney value={_item.ventaExenta} /> </td>
                                                                    <td className="text-end"> <NumberColMoney value={_item.ventaGravada} /></td>
                                                                </tr>
                                                        ))}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </TabPane>
                                        <TabPane tabId="1">
                                            <div className="py-3">
                                                <table className="table table-sm table-nowrap  align-middle">
                                                    <thead className="table-active">
                                                        <tr>
                                                            <th> Código </th>
                                                            <th> Descripción </th>
                                                            <th> Monto </th>
                                                            <th> Plazo </th>
                                                        </tr>                                            
                                                    </thead>
                                                    <tbody id="table-payments" >
                                                        {(selectedInvoice.resumen?.pagos || []).map((_item,index) => (
                                                            <tr key={index}>
                                                                <td>{_item.codigo}</td>
                                                                <td></td>
                                                                <td> <NumberColMoney value ={_item.montoPago} /></td>
                                                                <td></td> 
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </TabPane>
                                        <TabPane tabId="99">
                                            <Row className="mt-2">
                                                <UncontrolledAccordion defaultOpen={"1"}>
                                                    <AccordionItem>
                                                        <AccordionHeader targetId="1">
                                                            Firma Electrónica
                                                        </AccordionHeader>
                                                        <AccordionBody accordionId="1" isOpen={true}>
                                                            <pre className="language-markup rounded-2" style={{whiteSpace : "pre-wrap",wordWrap: "break-word"}}>
                                                                {selectedInvoice.firmaElectronica}
                                                            </pre>
                                                        </AccordionBody>
                                                    </AccordionItem>
                                                </UncontrolledAccordion>
                                            </Row>
                                        </TabPane>
                                    </TabContent>

                                    {/* Resumen */}
                                    <div className="border-top border-top-dashed mt-2">
                                        <div className="row fs-12">
                                            <div className="col-md-4  text-center">
                                                <p className="text-muted mb-1"> Condición de Pago</p>
                                                <p className="fw-medium fs-3" id="payment-method">
                                                    {selectedInvoice.resumen?.condicionOperacion === "1" ? "CONTADO" : "CREDITO"}</p>
                                            </div>
                                            <div className="col-md-8 border border-dashed fs-7">
                                                <table className="table table-sm table-borderless table-nowrap align-middle" >
                                                    <tbody id="table-resume" className="text-end">
                                                        <tr>
                                                            <td>Suma Total de Ventas:</td>
                                                            <td className="text-end"> <NumberColMoney value={selectedInvoice.resumen?.subTotalVentas} /> </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Monto global Desc., Rebajas y otros a ventas exentas:</td>
                                                            <td className="text-end"><NumberColMoney value={0.00} /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Monto global Desc., Rebajas y otros a ventas gravadas:</td>
                                                            <td className="text-end"><NumberColMoney value={0.00 } /></td>
                                                        </tr>       
                                                        <tr>
                                                            <td>Sub-Total:</td>
                                                            <td className="text-end"><NumberColMoney value={selectedInvoice.resumen?.subTotal} /></td>
                                                        </tr>
                                                        {/* Tributos Row */}
                                                        {(selectedInvoice.resumen?.tributos || []).map((t, impIdex)=> (
                                                        <tr key={impIdex}>
                                                            <td>{t.descripcion}:</td>
                                                            <td className="text-end"><NumberColMoney value={t.valor} /> </td>
                                                        </tr>
                                                        ))}
                                                        <tr>
                                                            <td>IVA Retenido:</td>
                                                            <td className="text-end"><NumberColMoney value={selectedInvoice.resumen?.ivaRete1} /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Retención Renta:</td>
                                                            <td className="text-end"><NumberColMoney value={selectedInvoice.resumen?.reteRenta} /></td>
                                                        </tr> 
                                                        <tr>
                                                            <td>Monto Total de la Operación:</td>
                                                            <td className="text-end"><NumberColMoney value={selectedInvoice.resumen?.montoTotalOperacion}/></td>
                                                        </tr>
                                                        <tr className="border-top border-top-dashed fs-15">
                                                            <th scope="row">Total a Pagar: </th>
                                                            <th className="text-end"><NumberColMoney value={selectedInvoice.resumen?.totalPagar} /></th>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>  
                                </Row>

                                <div className="mt-4">
                                    <div className="alert alert-info">
                                        <p className="mb-0">
                                            <span className="fw-semibold">OBSERVACIONES:</span>
                                            <span id="note"> {selectedInvoice.resumen?.observaciones} </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </ModalBody>
            <ContentWaitLoading isLoading={isLoadingData} />
        </Modal>

        { showPrintModal && 
          <PDFViewerModal
            show={ showPrintModal }
            params={ printOptions }
            onHide={e => setShowPrintModal(false)}
        />}


    </React.Fragment>)
   
}

export default InvoiceForm;