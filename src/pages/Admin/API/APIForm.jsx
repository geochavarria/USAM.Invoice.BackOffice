import { useEffect, useState } from "react";
import { Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import CustomCatchError from "@/components/common/CustomCatchError";
import { postAPIKeyUpsertAsync } from "@/helpers/backend_helpers/admin_helpers";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { MessageTitle } from "@/common/constants";
import SelectEmpresa from "@/components/controls/Admin/SelectEmpresa";
import SelectSucursal from "@/components/controls/Admin/SelectSucursal";
import SelectApplication from "@/components/controls/Admin/SelectApplication";
import SelectPointSale from "@/components/controls/Admin/SelectPointSale";


const APIForm = ({
    data =  {},
    show =  false,
    onConfirm = () => {},
    onHide = () => {}
}) => {

    //Data State
    const [ apiManager , setApiManager ] =  useState(data || {})
    //Trigger State
    const [ catchError, setCatchError ] =  useState("")
    const [ isEdit, setIsEdit ] = useState(false)
    const [ isSaving, setIsSaving ] =  useState(false)
    //Control State
    const [ showModal, setShowModal ]  = useState(false)

   
    const validationData = useFormik({
        enableReinitialize : true,
        initialValues: {
            codigo: (apiManager && apiManager.codigo) || 0,
            servicio : (apiManager && apiManager.servicio) || "",
            key : (apiManager && apiManager.key) || "",
            nombre : (apiManager && apiManager.nombre) || "",
            activo : (apiManager && apiManager.activo) || false,
            codsuc : (apiManager && apiManager.codsuc) || 0,
            app : (apiManager && apiManager.app) || "",
            puntoVentaMh : (apiManager && apiManager.puntoVentaMh) || "",
            fecha_expiracion : (apiManager && apiManager.fecha_expiracion) || null,
            sucursal : (apiManager && apiManager.sucursal) || {}
        },
        onSubmit:async(values) => {
            setIsSaving(true)
            try{

                let response = await postAPIKeyUpsertAsync({
                    code : values.codigo,
                    data: values
                });

                toast.info(isEdit ? MessageTitle.MSG_INFO_ACTUALIZAR : MessageTitle.MSG_INFO_REGISTRO,{ 
                    position: 'top-right', 
                    hideProgressBar: false, 
                    closeOnClick: false
                })
    
                onConfirm({
                    originalEvent : null,
                    data : response.data,
                    index : -1
                })


                modalToggle_onClick()
            }catch(ex){
                setCatchError(ex)
            }finally{
                setIsSaving(false)
            }
        }
    })

    const modalToggle_onClick = (evt) => {
        setShowModal(!showModal)
        if(onHide) 
            onHide(!showModal)
    }

    const btnGenerarGUID_onClick = (e) => {
        const base =  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        const generateGUID = base.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        validationData.setFieldValue("key", generateGUID.toUpperCase());
    }

    useEffect(()=> {
        setShowModal(show);
       
        setCatchError("")
        if(show){
            const { codigo } =  data
            setIsEdit((codigo || "").trim())
            setApiManager(data)
        }
    }, [show, data])
  return (

    <Modal
        id="usuario-frm"
        isOpen={show}
        size={"lg"}
        toggle={() =>  modalToggle_onClick()} 
        modalClassName="zoomIn" tabIndex="-1" 
        centered>
        <ModalHeader toggle={() => modalToggle_onClick()}
            className="p-3 bg-success-subtle"> 
            API Manager
        </ModalHeader>
        <ModalBody className="apply-modal-content">
            <CustomCatchError innerException={ catchError } />
            <Form autoComplete="off" className="default-form job-apply-form">
                <Row>
                    <Col md={8}>
                        <div className="form-group mb-2">
                            <Label className="form-label">Agente de Aplicación</Label>
                            <SelectApplication
                                onError={e => setCatchError(e)}
                                onOptionSelect ={({data}) => validationData.setFieldValue("app", data.value || "")}
                                setDefaultValue={validationData.values.app || ""}
                                />
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="form-group mb-2">
                            <Label className="form-label">Punto de Venta</Label>
                            <SelectPointSale
                                onError={e => setCatchError(e)}
                                onOptionSelect ={({data}) => validationData.setFieldValue("puntoVentaMh", data.value || "")}
                                setDefaultValue={validationData.values.puntoVentaMh || ""}
                                />
                        </div>
                    </Col>
                </Row>
                <Row className='mb-sm-2'>
                    <Col className="col-12">
                        <div className="form-group mb-2">
                            <Label className="form-label">Nombre</Label>
                            <Input 
                                id="txtNombrefield"
                                name="nombre"
                                className={"form-control"}
                                validate={{ required: {value: true}}}
                                onBlur={ validationData.handleBlur }
                                onChange={ validationData.handleChange }
                                value={validationData.values.nombre || ""} />
                        </div>
                    </Col>
                    <Col className="col-12">
                        <div className="form-group mb-2">
                            <Label className="form-label">URL Servicio/Conección</Label>
                            <Input 
                                id="txtServicio_field"
                                name="servicio"
                                className={"form-control"}
                                validate={{ required: {value: true}}}
                                onBlur={ validationData.handleBlur }
                                onChange={ validationData.handleChange }
                                value={validationData.values.servicio || ""} />
                        </div>
                    </Col>
                    <Col className="col-12" >
                        <div className="form-group mb-2">
                            <Label className="form-label">API KEY</Label>
                            
                            <div className="input-group mb-3" >
                                <Input  
                                    id="txtKey_field"
                                    name="key" readOnly
                                    className={"form-control"} style={{width: "auto"}}
                                    validate={{ required: {value: true}}}
                                    onBlur={ validationData.handleBlur }
                                    onChange={ validationData.handleChange }
                                    value={validationData.values.key || ""} />
                                <button className="btn btn-outline-danger" type="button" 
                                    onClick={e => btnGenerarGUID_onClick()}>Generar</button>
                            </div>
                           
                        </div>
                    </Col>
                    <Col className="col" md={6}>
                        <div className="form-group mb-2">
                            <Label className="form-label">Empresa</Label>
                            <SelectEmpresa
                                onError={e => setCatchError(e)}
                                onOptionSelect ={({data}) => validationData.setFieldValue("sucursal.codemp", data.value || "")}
                                setDefaultValue={validationData.values.sucursal.codemp || 0}
                                />
                        </div>
                    </Col>
                    <Col className="col" md={6}>
                        <div className="form-group mb-2">
                            <Label className="form-label">Sucursal</Label>
                            <SelectSucursal
                                parentID={ validationData.values.sucursal.codemp || 0 }
                                onError={e => setCatchError(e)}
                                onOptionSelect ={({data}) => {
                                    validationData.setFieldValue("codsuc", data.value || 0)
                                    validationData.setFieldValue("sucursal", data.data || {})
                                }}
                                setDefaultValue={validationData.values.codsuc}
                                />
                        </div>
                    </Col>
                </Row>
                <div className="d-flex justify-content-end mt-2">
                <div className="form-check form-switch form-switch-md ">
                    <Input id="swLogic-field" 
                        className="form-check-input" 
                        type="checkbox" role="switch"
                        name="activo"
                        value={ "1" }
                        checked={ Number(validationData.values.activo) }
                        onChange={ ({ target }) => {
                            const { value, checked, name } =  target
                            validationData.setFieldValue(name, checked)
                        }}
                        onBlur={ validationData.handleBlur } />
                    <Label for="swLogic-field" className="form-check-label ">Activo</Label>
                </div>
            </div> 
            </Form>
        </ModalBody>
        <ModalFooter className="bg-light border-top border-top-dashed">
            <div className="d-flex  w-100 justify-content-between align-items-end ">
                <span className="text-muted fs-10">Ref. { validationData.values.codigo } </span>
                <div className="hstack gap-2">
                <button
                        className="theme-btn btn-style-one w-100"
                        type="button"
                        name="submit-form"
                        onClick={(evt)=> validationData.handleSubmit(evt) } 
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </ModalFooter>
    </Modal>
)};

export default APIForm;
