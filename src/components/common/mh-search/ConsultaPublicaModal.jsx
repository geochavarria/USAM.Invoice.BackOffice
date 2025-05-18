import { StatusColString } from "@/components/controls/Status"
import React, { useCallback, useEffect, useState } from "react"
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "reactstrap"


import bgMhLogo  from "@/assets/images/resource/bg-fesv-h.png"
import { CatchErrorMessage } from "../CustomCatchError"
import { getVerifyDocumentByCodeAsync } from "@/helpers/backend_helpers/transmision_helpers"

const ConsultaPublicaModal = ({
    show, 
    data = {},
    canScape = true,
    onHide
}) => {

    //Data State
    const [ reponseMH, setResponseMH ] = useState({})
    
    //Trigger State
    const [ isLoading, setIsLoading] =  useState(false)
    const [ isSearchComplete, setIsSearchComplete ] =  useState(false)
    
    //Modal State
    const [ showModal, setShowModal ] =  useState(false)
    
    //Trigger State
    const [ catchError, setCatchError ] = useState("")


    const modalToggle_onClick  =  useCallback((evt)=> {
        setModalShow(!showModal)
        onHide(!showModal)
    }, [showModal, onHide])




    const btnConsultar_onSubmit = async(e) => {
        setResponseMH({})
        setIsLoading(true)
        setCatchError("")
        const { codigo } = data
        try {
            const response =  await getVerifyDocumentByCodeAsync(codigo)
            if (!response.succeeded) {
                throw new Error(response.message)
            }

            setResponseMH(response.data || {})
            setIsSearchComplete(true)
        } catch (error) {
            const message =  CatchErrorMessage(error).complete
            setCatchError(message)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(()=> {
        setShowModal(show)
    }, [show])


    return(<React.Fragment>
        <Modal id="confirm-modal" tabIndex="-1" 
            isOpen={ showModal } 
            keyboard={ canScape }
            toggle={(e) => { modalToggle_onClick(e); }} 
            backdrop={"static"} centered>
            <div className="modal-header">
                <div className="d-flex justify-content-center w-100">
                    <img src={bgMhLogo} style={{width: "40%"}}/>
                </div>
            </div>
            <ModalBody className="text-center pt-0" > 
                
                {(catchError || "")?.trim() &&  <Alert color="danger" 
                        toggle={ (e) => { 
                            setCatchError("")
                        }}
                        className="alert-label-icon rounded-label text-start mx-n3 mb-0" >
                            <i className="ri-error-warning-line label-icon"></i><strong> Error: </strong>
                           <p className="text-break" style={{whiteSpace : "pre-line"}}>{ catchError }</p>
                        </Alert>
                }
                <p className="text-center text-muted ">
                Aquí verás datos directamente conectados con la fuente oficial: el Ministerio de Hacienda, vía Facturación SV. Nuestra conexión con su base asegura y respaldada por el sistema fiscal.
                </p>
                <div style={{ background: "#D3D7F5"}} className="p-2 text-dark rounded fs-5">{data.codigo}</div>
                <p className="fs-11">Este es el código de generación válido en ministerio de hacienda</p>

                <div className="mt-3">
                    <Button type="button" color="primary" 
                       className="btn-label btn-load waves-effect waves-light "
                       disabled = { isLoading }
                       onClick={(e)=> btnConsultar_onSubmit(e)} >
                           <div className="d-flex flex-rows">
                            { isLoading  ? <Spinner size="sm" className="flex-shrink-0 me-2"> Loading... </Spinner>
                                : <i className={"fa fa-external-link-alt label-icon align-middle fs-16 me-2"}/>}
                                Verificar el DTE
                            </div>
                           
                    </Button>
                </div>
                { isSearchComplete && <div className="mt-2 text-center">
                    <div className="flex-grow-1 align-self-center fs-7">
                        <table className="table mb-0 table-sm text-start">
                            <tbody>
                                <tr>
                                    <td className="fw-semibold" style={{width: "7rem"}}>Ambiente</td>
                                    <td> {reponseMH.ambiente} - {reponseMH.ambiente == "00" ? "Pruebas" : "Producción"} </td>
                                </tr>
                                <tr>
                                    <td className="fw-semibold">Código</td>
                                    <td> {reponseMH.codigoGeneracion} </td>
                                </tr>
                                <tr>
                                    <td className="fw-semibold">Sello </td>
                                    <td> {reponseMH.selloRecibido} </td>
                                </tr>
                                <tr>
                                    <td className="fw-semibold">Fecha </td>
                                    <td> {reponseMH.fhProcesamiento} </td>
                                </tr>
                                <tr>
                                    <td className="fw-semibold">Comentario </td>
                                    <td> {reponseMH.descripcionMsg} </td>
                                </tr>
                                <tr>
                                    <td className="fw-semibold">Estado </td>
                                    <td> <StatusColString status ={data.estado == "RECHAZADO" ? "RE" : "P"}/> </td>
                                </tr>
                                <tr>
                                    <td className="fw-semibold">Errores:</td>
                                    <td> {(reponseMH.observaciones || []).toString().trim() || "N/A"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                }
                {/* <ModalLoading isLoading={ isLoading} /> */}
            </ModalBody> 
            
            <ModalFooter className="border-top bg-light  p-1 border-top-dashed justify-content-center">
                <div className="hstack gap-2 d-flex justify-content-end w-100 ">
                    <Button color="danger" 
                        disabled = { isLoading }
                        className="btn-label waves-effect waves-light " 
                        outline onClick={() => onHide()}>
                        <i className="fa fa-times label-icon fs-16 "/> Salir
                    </Button>
                </div>
            </ModalFooter>
        </Modal>          
    </React.Fragment>)
}

export default ConsultaPublicaModal;