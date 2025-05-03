import { useEffect, useState } from "react";
import { Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import CustomCatchError from "@/components/common/CustomCatchError";
import { postParametroUpsertAsync } from "@/helpers/backend_helpers/admin_helpers";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { MessageTitle } from "@/common/constants";


const CashiersForm = ({
    data =  {},
    show =  false,
    onConfirm = () => {},
    onHide = () => {}
}) => {

    //Data State
    const [ usuarioData , setUsuarioData ] =  useState(data || {})
    //Trigger State
    const [ catchError, setCatchError ] =  useState("")
    const [ isEdit, setIsEdit ] = useState(false)
    const [ isSaving, setIsSaving ] =  useState(false)
    //Control State
    const [ showModal, setShowModal ]  = useState(false)

   
    const validationData = useFormik({
        enableReinitialize : true,
        initialValues: {
            codigo: (usuarioData && usuarioData.usuario) || "",
            usuario : (usuarioData && usuarioData.usuario) || "",
            nombre : (usuarioData && usuarioData.nombre) || ""
           
        },
        onSubmit:async(values) => {
            setIsSaving(true)
            try{

                return;
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

    useEffect(()=> {
        setShowModal(show);
       
        setCatchError("")
        if(show){
            
            setUsuarioData(data)
        }
    }, [show, data])
    console.log(validationData.values)
  return (

    <Modal
        id="usuario-frm"
        isOpen={show}
        toggle={() =>  modalToggle_onClick()} 
        modalClassName="zoomIn" tabIndex="-1" 
        // className={ classNames({
        //     "modal-lg" : widthScreen >= 992,
        //     "modal-fullscreen-lg-down" : widthScreen < 992
        // })}
        centered>
        <ModalHeader toggle={() => modalToggle_onClick()}
            className="p-3 bg-success-subtle"> 
            Asesores de Venta
        </ModalHeader>
        <ModalBody className="apply-modal-content">
            <CustomCatchError innerException={ catchError } />
            <Form autoComplete="off" className="default-form job-apply-form">
                <Row className='mb-sm-2'>
                    <Col className="col-12">
                        <div className="form-group mb-2">
                            <Label className="form-label">Usuario</Label>
                            <Input 
                                id="txtUsuario_field"
                                name="usuario"
                                className={"form-control"}
                                validate={{ required: {value: true}}}
                                onBlur={ validationData.handleBlur }
                                onChange={ validationData.handleChange }
                                value={validationData.values.usuario || ""} />
                        </div>
                    </Col>
                    <Col className="col-12">
                        <div className="form-group mb-2">
                            <Label className="form-label">Nombre</Label>
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

export default CashiersForm;
