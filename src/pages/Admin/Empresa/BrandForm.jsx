import { useEffect, useState } from "react";
import { Col, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import CustomCatchError from "@/components/common/CustomCatchError";
import { postAPIKeyUpsertAsync, putSucursalByEmpIDUpsertAsync } from "@/helpers/backend_helpers/admin_helpers";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { MessageTitle } from "@/common/constants";
import SelectEmpresa from "@/components/controls/Admin/SelectEmpresa";
import SelectSucursal from "@/components/controls/Admin/SelectSucursal";
import SelectApplication from "@/components/controls/Admin/SelectApplication";
import SelectPointSale from "@/components/controls/Admin/SelectPointSale";
import { SelectDepartamento, SelectMunicipio, SelectTipoEstablecimiento, SelectTipoTransmision } from "@/components/controls/Catalogos";


const BrandForm = ({
    data =  {},
    show =  false,
    onConfirm = () => {},
    onHide = () => {}
}) => {

    //Data State
    const [ brand , setBrand ] =  useState(data || {})
    
    //Trigger State
    const [ catchError, setCatchError ] =  useState("")
    const [ isEdit, setIsEdit ] = useState(false)
    const [ isSaving, setIsSaving ] =  useState(false)
    
    //Control State
    const [ showModal, setShowModal ]  = useState(false)

   
    const validationData = useFormik({
        enableReinitialize : true,
        initialValues: {
            codigo: (brand && brand.codigo) || 0,
            abreviado : (brand && brand.abreviado) || "",
            nombre : (brand && brand.nombre) || "",
            correo : (brand && brand.correo) || "",
            telefono : (brand && brand.telefono) || "",
            direccion : (brand && brand.direccion) || "",
            coddep : (brand && brand.coddep) || "00",
            codmun : (brand && brand.codmun) || "00",
            codtie : (brand && brand.codtie) || "",
            codtit : (brand && brand.codtit) || 0,
            codemp : (brand && brand.codemp) || 0,
        },
        onSubmit:async(values) => {
            setIsSaving(true)
            try{

                let response = await putSucursalByEmpIDUpsertAsync({
                    empresaID : values.codemp,
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
            setIsEdit((codigo || 0) > 0)
            setBrand(data)
            validationData.resetForm()
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
            Scursales
        </ModalHeader>
        <ModalBody className="apply-modal-content">
            <CustomCatchError innerException={ catchError } />
            <Form autoComplete="off" className="default-form job-apply-form">

                <Row className='mb-sm-2'>
                    <Col className="col-4">
                        <div className="form-group mb-2">
                            <Label className="form-label">Abreviado</Label>
                            <Input 
                                id="txtAbreviado"
                                name="abreviado"
                                className={"form-control"}
                                validate={{ required: {value: true}}}
                                onBlur={ validationData.handleBlur }
                                onChange={ validationData.handleChange }
                                value={validationData.values.abreviado || ""} />
                        </div>
                    </Col>
                    <Col className="col-8">
                        <div className="form-group mb-2">
                            <Label className="form-label">Sucursal</Label>
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

                    <div className="form-group col-md-6">
                        <label>Departamento</label>
                        <SelectDepartamento
                            isSearch = { true }
                            onError={e => setCatchError(e)}
                            onOptionSelect ={({data}) => validationData.setFieldValue("coddep", data.value)}
                            setDefaultValue={validationData.values.coddep}
                        />
                    </div>

                    <div className="form-group col-md-6">
                        <label>Municipio</label>
                        <SelectMunicipio
                            parentID = { validationData.values.coddep }
                            onError={e => setCatchError(e)}
                            onOptionSelect ={({data}) => validationData.setFieldValue("codmun", data.value)}
                            setDefaultValue={validationData.values.codmun}
                        />
                    </div>

                    <Col className="col-12 col-md-8" >
                        <div className="form-group mb-2">
                            <Label className="form-label">Correo</Label>
                            
                            <div className="input-group mb-3" >
                                <Input  
                                    id="txtKey_field"
                                    name="correo"
                                    className={"form-control"} 
                                    validate={{ required: {value: true}}}
                                    onBlur={ validationData.handleBlur }
                                    onChange={ validationData.handleChange }
                                    value={validationData.values.correo || ""} />
                            </div>
                           
                        </div>
                    </Col>
                    <Col className="col" md={4}>
                        <div className="form-group mb-2">
                            <Label className="form-label">Teléfono</Label>
                            <div className="input-group mb-3" >
                                <Input  
                                    id="txtKey_field"
                                    name="telefono"
                                    className={"form-control"} 
                                    validate={{ required: {value: true}}}
                                    onBlur={ validationData.handleBlur }
                                    onChange={ validationData.handleChange }
                                    value={validationData.values.telefono || ""} />
                            </div>
                        </div>
                    </Col>
                    <Col className="col" md={12}>
                        <div className="form-group mb-2">
                            <Label className="form-label">Dirección</Label>
                            <div className="input-group mb-3" >
                                <Input   type="textarea" rows={2}
                                    id="txtDireccion_field"
                                    name="direccion"
                                    className={"form-control"} 
                                    validate={{ required: {value: true}}}
                                    onBlur={ validationData.handleBlur }
                                    onChange={ validationData.handleChange }
                                    value={validationData.values.direccion || ""} />
                            </div>
                        </div>
                    </Col>

                    <Label className="text-uppercase text-muted">Control de Transmisión</Label>
                    <Col className="col" md={6}>
                        <div className="form-group mb-2">
                            <Label className="form-label">Tipo de Establecimiento</Label>
                            <SelectTipoEstablecimiento
                                onError={e => setCatchError(e)}
                                onOptionSelect ={({data}) => validationData.setFieldValue("codtie", data.value)}
                                setDefaultValue={validationData.values.codtie}
                            />
                        </div>
                    </Col>
                    <Col className="col" md={6}>
                        <div className="form-group mb-2">
                            <Label className="form-label">Tipo de Transmisión (Control de Contingencia)</Label>
                            <SelectTipoTransmision
                                onError={e => setCatchError(e)}
                                onOptionSelect ={({data}) => validationData.setFieldValue("codtit", data.value)}
                                setDefaultValue={validationData.values.codtit}
                            />
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

export default BrandForm;
