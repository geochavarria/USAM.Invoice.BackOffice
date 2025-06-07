import CustomCatchError from "@/components/common/CustomCatchError";
import { SelectActividadEconomica, SelectDepartamento, SelectDistrito, SelectDomicilioFiscal, SelectMunicipio, SelectPais } from "@/components/controls/Catalogos";
import { putEmpresaUpsertAsync } from "@/helpers/backend_helpers/admin_helpers";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { Button, Form, FormFeedback, Input, Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { MessageTitle } from "@/common/constants";

const FormProfile = ({ 
    data, 
    onConfirm = () => {}
}) => {

   //Data State
   const [ profileData, setProfileData] =  useState({})

   //Trigger State
   const [ isSaving, setIsSaving ] =  useState(false);
   const [ catchError, setCatchError ]=  useState("");



    const onLoadAsync = () => { }

    const validationData = useFormik({
        enableReinitialize : true,
        initialValues: {
            codigo: (profileData && profileData.codigo) || 0,
            abreviado : (profileData && profileData.abreviado) || "",
            nombre : (profileData && profileData.nombre) || "",
            nombre_comercial : (profileData && profileData.nombre_comercial) || "",
            nit : (profileData && profileData.nit) || "",
            nrc : (profileData && profileData.nrc) || "",
            codace : (profileData && profileData.codace) || "",
            coddep : (profileData && profileData.coddep) || "00",
            codmun : (profileData && profileData.codmun) || "00",
            codpai : (profileData && profileData.codpai) || "",
            coddfi : (profileData && profileData.coddfi) || 0,
            codmun_dis : (profileData && profileData.codmun_dis) || "00",
        },
        validationSchema: Yup.object({
            nombre_comercial: Yup.string().required("Requerido nombre comercial").max(250, "[150] Máximo"),
            nombre: Yup.string().required("Requerido nombre").max(250, "[250] Máximo"),
        }),
        onSubmit:async(values) => {
            setIsSaving(true)
            try{
                let response = await putEmpresaUpsertAsync({
                    code : values.codigo,
                    data: values
                });

                toast.info(MessageTitle.MSG_INFO_ACTUALIZAR,{ 
                    position: 'top-right', 
                    hideProgressBar: false, 
                    closeOnClick: false
                })
    
                onConfirm({
                    originalEvent : null,
                    data : response.data,
                    index : -1
                })
                
            }catch(ex){
                setCatchError(ex)
            }finally{
                setIsSaving(false)
            }
        }
    })


    useEffect(()=> {
        setProfileData(data);
    },[data])

    return (
        <Form className="default-form" 
            onSubmit={(e)=> {
                e.preventDefault();
                validationData.handleSubmit(null);
                return false
            }}>
            <CustomCatchError life="5000" innerException={catchError}/>
            <div className="row">
                {/* <!-- Input --> */}
                <div className="form-group xl-6 col-lg-12 col-md-12">
                    <label>Empresa (Requerido)</label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre o  Razón Social"
                        onBlur={validationData.handleBlur}
                        onChange={validationData.handleChange}
                        value = { validationData.values.nombre || "" }
                        required
                    />
                </div>

                <div className="form-group xl-6 col-lg-12 col-md-12">
                    <label>Nombre Comercial (Opcional)</label>
                    <Input
                        type="text"
                        validate={{ required: { value:true } }}
                        name="nombre_comercial"
                        placeholder="Nombre o  Razón Social"
                        onBlur={validationData.handleBlur}
                        onChange={validationData.handleChange}
                        value = { validationData.values.nombre_comercial || ""}
                        invalid={
                                validationData.touched.nombre_comercial && validationData.errors.nombre_comercial ? true : false
                        }
                    />
                    {validationData.touched.nombre_comercial && validationData.errors.nombre_comercial ? (
                        <FormFeedback type="invalid">{validationData.errors.nombre_comercial}</FormFeedback>
                    ) : null}
                </div>

                {/* <!-- Input --> */}
                <div className="form-group xl-3 col-lg-6 col-md-4">
                    <label>Número Tributario (NIT)</label>
                    <input
                        type="text"
                        name="nit"
                        placeholder="9999-999999-999-9"
                        value = { validationData.values.nit  || ""}
                        onBlur={validationData.handleBlur}
                        onChange={validationData.handleChange}
                        required
                    />
                </div>
                
                {/* <!-- Input --> */}
                <div className="form-group xl-3 col-lg-6 col-md-4">
                    <label>Registro de IVA (NRC)</label>
                    <input
                        type="text"
                        name="nrc"
                        placeholder="999999"
                        value = { validationData.values.nrc || "" }
                        onBlur={validationData.handleBlur}
                        onChange={validationData.handleChange}
                        required
                    />
                </div>

                {/* <!-- Search Select --> */}
                <div className="form-group  xl-3 col-lg-6 col-md-12">
                    <label>País </label>
                    <SelectPais
                        onOptionSelect ={({data}) => validationData.setFieldValue("codpai", data.value)}
                        setDefaultValue={validationData.values.codpai}
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group  xl-3 col-lg-6 col-md-6">
                    <label>Departamento</label>
                    <SelectDepartamento
                        isSearch = { true }
                        onError={e => setCatchError(e)}
                        onOptionSelect ={({data}) => validationData.setFieldValue("coddep", data.value)}
                        setDefaultValue={validationData.values.coddep}
                    />
                </div>

                <div className="form-group col-lg-4 col-md-6">
                    <label>Municipio</label>
                    <SelectMunicipio
                        parentID = { validationData.values.coddep }
                        onError={e => setCatchError(e)}
                        onOptionSelect ={({data}) => validationData.setFieldValue("codmun", data.value)}
                        setDefaultValue={validationData.values.codmun}
                    />
                </div>
                <div className="form-group col-lg-4 col-md-6">
                    <label>Distrito</label>
                    <SelectDistrito
                        onError={e => setCatchError(e)}
                        deptoID={ validationData.values.coddep}
                        munID={ validationData.values.codmun}
                        onOptionSelect ={({data}) => validationData.setFieldValue("codmun_dis", data.value)}
                        setDefaultValue={validationData.values.codmun_dis}
                    />
                </div>

                <div className="form-group col-lg-4 col-md-6">
                    <label>Domicilio Fiscal</label>
                    <SelectDomicilioFiscal
                        onError={e => setCatchError(e)}
                        onOptionSelect ={({data}) => validationData.setFieldValue("coddfi", data.value)}
                        setDefaultValue={validationData.values.coddfi}
                    />
                </div>

                <div className="form-group xl-8 col-lg-12 col-md-12">
                    <label>Actividad Económica</label>
                    <SelectActividadEconomica
                        onError={e => setCatchError(e)}
                        onOptionSelect ={({data}) => validationData.setFieldValue("codace", data.value)}
                        setDefaultValue={validationData.values.codace}
                    />
                </div>

                

                {/* <!-- Input --> */}
                <div className="form-group col-12 text-end">
                    <Button
                        disabled={isSaving}
                        type="submit"
                        className="theme-btn btn-style-one">
                        {isSaving && <Spinner size={"sm"} className="me-2" />}
                        Actualizar
                    </Button>
                </div>
            </div>
        </Form>
    );
};

export default FormProfile;
