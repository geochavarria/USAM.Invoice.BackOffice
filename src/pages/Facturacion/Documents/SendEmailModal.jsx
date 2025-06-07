import { ButtonCancel, ButtonSave } from "@/components/controls/Buttons";
import { getInvoiceDocumentByCodeAsync } from "@/helpers/backend_helpers/documentManagement_helpers";
import { postSendMailDocumentByIDAsync } from "@/helpers/backend_helpers/transmision_helpers";
import { useFormik } from "formik";
import * as Yup from "yup";


import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Col, FormFeedback, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

const SendEmailModal = ({
    show,
    data = {},
    onConfirm ,
    onHide = () => {}
}) => {

    //Data State
    const [ selectedInvoice, setSelectedInvoice ] =  useState({})

    //Modal State
    const [ showModal, setShowModal]  = useState(false)

    //Trigger State
    const [ isLoadingData, setIsLoadingData ] = useState(false)
    const [ isSending, setIsSending ] = useState(false)
    const [ catchError, setCatchError ] =  useState("")


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
        initialValues: {
            codigo :  (selectedInvoice && selectedInvoice.codigo) || "",
            correo :  (selectedInvoice && selectedInvoice.receptor?.correo) || "",
            receptor :  (selectedInvoice && selectedInvoice.receptor) || {}
        },
        validationSchema: Yup.object({
            correo: Yup.string().required("[Correo]: valor requerido").max(100, "[100] Máximo")
        }),
        onSubmit: async(values) =>{
            setIsSending(true)
            try {
                const response  =  await postSendMailDocumentByIDAsync({
                    codigo: values.codigo,
                    toEmail: values.correo
                })
                const { message } =  response

                toast.info(message,{ 
                    position: 'top-right', 
                    hideProgressBar: false, 
                    closeOnClick: false
                });

                modalToggle_onClick()

            } catch (error) {
                setCatchError(error)
            }finally{
                setIsSending(false)
            }
        }
    }));


    const modalToggle_onClick = useCallback(()=> {
        setShowModal(!showModal)
        onHide(!showModal)
        validationData.resetForm()
    },[onHide, showModal, validationData])
    
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
        <Modal isOpen={ showModal } 
            id="modalEmial" centered
            backdrop={'static'}
            
            keyboard={ false }
            size="md"
            toggle={(evt) => modalToggle_onClick(evt) }>
            <ModalHeader className="p-3 bg-light" 
                cssModule={{"modal-title" : "modal-title w-100"}}
                toggle={(evt) => modalToggle_onClick(evt)}>
                <div className='d-flex flex-row justify-content-between w-100'>
                    <span className='title'>Notificación de Factura Electrónica</span>
                </div>
            </ModalHeader>
            <ModalBody className=" clearfix">
                <Row>
                     <Col className="col-12">
                        <div className="form-group mb-2">
                            <Input
                                readOnly={true}
                                bsSize="sm"
                                id="txtCodigo"
                                name="codigo"
                                className={"form-control"}
                                validate={{ required: {value: true}}}
                                onBlur={ validationData.handleBlur }
                                onChange={ validationData.handleChange }
                                value={validationData.values.codigo || ""} />
                        </div>
                    </Col>
                    
                    <Col className="col-12">
                        <div className="form-group mb-2">
                            <div className="input-group mb-3" >
                                <span className="input-group-text">@</span>
                                <Input 
                                    id="txtCorreo_field"
                                    name="correo"
                                    bsSize="sm"
                                    validate={{ required: { value:true } }}
                                    invalid={
                                        validationData.touched.correo && validationData.errors.correo ? true : false
                                    }
                                    className={""}
                                    onBlur={ validationData.handleBlur }
                                    onChange={ validationData.handleChange }
                                    value={validationData.values.correo || ""} />
                               {validationData.touched.correo && validationData.errors.correo ? (
                                    <FormFeedback type="invalid">{validationData.errors.correo}</FormFeedback>
                                ) : null}
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="sidebar-column">
                    <div className="sidebar-widget mb-2 py-3">
                        <div className="info mb-1">
                            <h6 className="mb-0" >{selectedInvoice.receptor?.nombre}</h6>
                            <p className="fs-8 lh-sm">{selectedInvoice.receptor?.direccion?.complemento}</p>
                            <p className="text-muted fs-8 lh-sm"><span id="billing-phone-no">{selectedInvoice.receptor?.numDocumento} *{selectedInvoice.receptor?.nit}</span></p>
                            <p className="text-muted fs-8 lh-sm"><span id="billing-phone-no">{selectedInvoice.receptor?.telefono}</span></p>
                            <p className="text-muted fs-8 lh-sm"><span id="billing-email-no">{selectedInvoice.receptor?.correo}</span> </p>
                        </div>
                    </div>
                </div>
                <div className="cv-manager-widget ls-widget">
                    <h6 className="widget-title p-0 py-3" style={{minHeight: "inherit"}}>Archivos Adjuntos</h6>
                    <div className="files-outer">
                        { ["json", "pdf"].map((_item, index)=> (
                            <div className="file-edit-box" key={index}>
                                <span className="title fs-11">{validationData.values.codigo}.{_item}</span>
                                <div className="edit-btns">
                                    <button><span className={`la la-file-${_item === "json" ?  "text" : _item} text-primary fs-5`}></span></button>
                                </div>

                            </div>
                        ))}
                        
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className="bg-light border-top border-top-dashed">
                <div className="d-flex  w-100 justify-content-between align-items-end ">
                    <span className="text-muted fs-10">Ref. { ""} </span>
                    <div className="hstack gap-2">
                        <ButtonCancel
                            onClickEvent={e => modalToggle_onClick()} 
                            title="Descartar"
                        />
                        
                        <ButtonSave 
                            loading={isSending}
                            title ="Enviar"
                            onClickEvent ={(evt)=> validationData.handleSubmit(evt) } 
                        />
                        
                    </div>
                </div>
            </ModalFooter>
        </Modal>
    </React.Fragment>)
}

export default SendEmailModal;