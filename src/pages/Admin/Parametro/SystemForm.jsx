import { useEffect, useRef, useState } from "react";
import Cleave from 'cleave.js/react';
import classNames from "classnames";
import { Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import CustomCatchError from "@/components/common/CustomCatchError";
import { getParametroByCodeAsync, postParametroUpsertAsync } from "@/helpers/backend_helpers/admin_helpers";
import { useFormik } from "formik";
import { ParamType, ParamTypeList } from "@/common/constants/parameterType";
import { toast } from "react-toastify";
import { MessageTitle } from "@/common/constants";


const SystemForm = ({
    data =  {},
    show =  false,
    onConfirm = () => {},
    onHide = () => {}
}) => {

    //Data State
    const [ parametroSistema , setParametroSistema ] =  useState(data || {})
    //Trigger State
    const [ catchError, setCatchError ] =  useState("")
    const [ isEdit, setIsEdit ] = useState(false)
    const [ isSaving, setIsSaving ] =  useState(false)
    //Control State
    const [ showModal, setShowModal ]  = useState(false)

    const parametroSistema_onLoadAsync = async(ID = 0) => {
        try{
            const response = await getParametroByCodeAsync(ID)
            if (!response.succeeded) {
                throw new Error(response.message)
            }
            setParametroSistema(response.data || {})
        }catch(ex){
            setCatchError(ex)
        }
    }

    const validationData = useFormik({
        enableReinitialize : true,
        initialValues: {
            codigo : (parametroSistema && parametroSistema.codigo) || 0,
            abreviado : (parametroSistema && parametroSistema.abreviado) || "",
            nombre : (parametroSistema && parametroSistema.nombre) || "",
            descripcion : (parametroSistema && parametroSistema.descripcion) || "",
            tipo : (parametroSistema && parametroSistema.tipo) || ParamType.STRING.code,
            valor : (parametroSistema && parametroSistema.valor) || ""
        },
        onSubmit:async(values) => {
            setIsSaving(true)
            try{
                let response = await postParametroUpsertAsync({
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

    const parameterType_onChange = ({target}) => {    
        const { value, name } =  target
        const selected = ParamTypeList.find(dt => dt.code ===  value )
        validationData.setFieldValue(name, value )
    }

    const btnCancelar_onClick = (evt) => {
        setIsEdit(false)
        modalToggle_onClick();
    }


    useEffect(()=> {
        setShowModal(show);
        setCatchError("")
        if(show){
            const { codigo } =  data
            setParametroSistema(data)
            setIsEdit((codigo || 0) > 0 )
            if((codigo || 0) == 0) return;
            parametroSistema_onLoadAsync(codigo)
        }
    }, [show])

  return (

    <Modal
        id="applyJobModal"
        isOpen={show}
        toggle={() =>  modalToggle_onClick()} 
        modalClassName="zoomIn" tabIndex="-1" 
        // className={ classNames({
        //     "modal-lg" : widthScreen >= 992,
        //     "modal-fullscreen-lg-down" : widthScreen < 992
        // })}
        centered>
        <ModalHeader toggle={() => modalToggle_onClick()}
            className="p-3 bg-success-subtle" 
            id="createFacturaModalLabel">
            Parámetro de Sistema
        </ModalHeader>
        <ModalBody className="apply-modal-content">
            <CustomCatchError innerException={ catchError } />
            <Form autoComplete="off" className="default-form job-apply-form">
                <Row className='mb-sm-2'>
                    <Col sm={6}>
                        <div className="form-group mb-2">
                            <Cleave
                                disabled = { isEdit }
                                name="abreviado"
                                value={ validationData.values.abreviado }
                                onChange={({ target} ) => {
                                    const { name, rawValue } =  target
                                    validationData.setFieldValue(name, rawValue)
                                }}
                                className="form-control"
                            />
                        </div>
                    </Col>
                    <Col className="col-12">
                        <div className="form-group mb-2">
                            <Label className="form-label">Parámetro</Label>
                            <Input 
                                id="txtNombre_field"
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
                            <Label className="form-label">Detalle</Label>
                            <Input type="textarea"
                                name="descripcion"
                                className={"form-control"}
                                validate={{ required: {value: true}}}
                                onBlur={ validationData.handleBlur }
                                onChange={ validationData.handleChange }
                                value={validationData.values.descripcion || ""}
                                placeholder="Descripción de parámetro"
                            />
                        </div>
                    </Col>
                </Row>

                <Row className="">
                    <Col sm={12} className="">
                        <div className={
                            classNames({"border-danger" : true })
                        }>
                            <Label className='form-label '>Tipo Parámetro</Label>
                            <div className="d-flex flex-sm-col bg-light p-2 flex-row justify-content-between ">
                                {ParamTypeList.map((_item)=>
                                    <div className="form-check me-2" key={_item.code}>
                                        <Input  type="radio"
                                            className="form-check-input"
                                            id={"prmType_"+_item.code}
                                            value={ _item.code }
                                            checked = { (validationData.values.tipo || "") === _item.code }
                                            onChange={(evt)=> parameterType_onChange(evt)}
                                            name="tipo" />
                                        <Label className="form-check-label"
                                            htmlFor={"prmType_"+_item.code}>
                                            {_item.label} <small>({_item.code})</small>
                                        </Label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col sm={12}>
                    {validationData.values.tipo === ParamType.STRING.code &&
                    <>
                        <div className="form-group mb-2">
                            <Label className='form-label ms-2'>* Especificación del parámetro </Label>
                            <Input type="textarea" className={"form-control"}
                                    name="valor"
                                    validate={{ required: {value: true}}}
                                    value={ validationData.values.valor }
                                    onBlur={ validationData.handleBlur }
                                    onChange={ validationData.handleChange }
                                    invalid={
                                        validationData.touched.valor && validationData.errors.valor ? true : false
                                    }
                                    placeholder="Valor del parámetro"/>  
                        </div>
                    </>
                    }
                    { validationData.values.tipo === ParamType.NUMBER.code &&
                    <>
                        <div className="form-group mb-2">
                            <Cleave
                                className={`form-control text-center ${ classNames({
                                    "is-invalid ": validationData.touched.valor && validationData.errors.valor ? true : false
                                })}`}
                                type="text"
                                id="txtNumeric_field"
                                maxLength={100}
                                name="valor"
                                options={{
                                    numeral : true,
                                    numeralDecimalScale: 4,
                                }}
                                value={ validationData.values.valor }
                                onChange={({ target }) => {
                                    const { rawValue, name } = target
                                    validationData.setFieldValue(name, rawValue)
                                }}
                                placeholder="0.00"/>
                        </div>
                    
                    </> } 
                    { validationData.values.tipo === ParamType.BOOLEAN.code &&
                    <>
                        <div className="d-flex justify-content-center mt-2">
                            <div className="form-check form-switch form-switch-md ">
                                <Input id="swLogic-field" 
                                    className="form-check-input" 
                                    type="checkbox" role="switch"
                                    name="valor"
                                    value={ "1" }
                                    checked={ Number(validationData.values.valor) }
                                    onChange={ ({ target }) => {
                                        const { value, checked, name } =  target
                                        validationData.setFieldValue(name, String(checked ? value : "0"))
                                    }}
                                    onBlur={ validationData.handleBlur } />
                                <Label for="psiActivo-field" className="form-check-label ">Activo</Label>
                            </div>
                        </div> 
                    </> } 
                    </Col>
                </Row>
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

export default SystemForm;
