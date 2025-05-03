import CustomCatchError from "@/components/common/CustomCatchError";
import { SelectActividadEconomica, SelectDepartamento, SelectDistrito, SelectDomicilioFiscal, SelectMunicipio, SelectPais } from "@/components/controls/Catalogos";
import { getEmpresaByCodeAsync } from "@/helpers/backend_helpers/admin_helpers";
import { useEffect, useState } from "react";

const FormProfile = ({ data }) => {

   //Data State
   const [ profileData, setProfileData] =  useState({})

   const [ catchError, setCatchError ]=  useState("")

    const onLoadAsync = () => { }

    useEffect(()=> {
        setProfileData(data);
    },[data])

    return (
        <form className="default-form">
            <CustomCatchError life="5000" innerException={catchError}/>
            <div className="row">
                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>Empresa (Requerido)</label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre o  Razón Social"
                        value = { profileData.nombre || "" }
                        onChange={e => { }}
                        required
                    />
                </div>

                <div className="form-group col-lg-6 col-md-12">
                    <label>Nombre Comercial (Opcional)</label>
                    <input
                        type="text"
                        name="nombre_comercial"
                        placeholder="Nombre o  Razón Social"
                        onChange={e => { }}
                        value = { profileData.nombre_comercial || ""}
                        required
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-3 col-md-4">
                    <label>Número Tributario (NIT)</label>
                    <input
                        type="text"
                        name="nit"
                        placeholder="9999-999999-999-9"
                        value = { profileData.nit  || ""}
                        onChange={e => { }}
                        required
                    />
                </div>
                
                {/* <!-- Input --> */}
                <div className="form-group col-lg-3 col-md-4">
                    <label>Registro de IVA (NRC)</label>
                    <input
                        type="text"
                        name="nrc"
                        placeholder="999999"
                        value = { profileData.nrc || "" }
                        onChange={e => { }}
                        required
                    />
                </div>

                {/* <!-- Search Select --> */}
                <div className="form-group col-lg-6 col-md-12">
                    <label>País </label>
                    <SelectPais
                        onOptionSelect ={e => {}}
                        setDefaultValue={profileData.codpai}
                    />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-4 col-md-6">
                    <label>Departamento</label>
                    <SelectDepartamento
                        isSearch = { true }
                        onError={e => setCatchError(e)}
                        onOptionSelect ={e => {}}
                        setDefaultValue={profileData.coddep}
                    />
                </div>

                <div className="form-group col-lg-4 col-md-6">
                    <label>Municipio</label>
                    <SelectMunicipio
                        parentID = { profileData.coddep }
                        onError={e => setCatchError(e)}
                        onOptionSelect ={e => {}}
                        setDefaultValue={profileData.codmun}
                    />
                </div>
                <div className="form-group col-lg-4 col-md-6">
                    <label>Distrito</label>
                    <SelectDistrito
                        onError={e => setCatchError(e)}
                        deptoID={ profileData.coddep}
                        munID={ profileData.codmun}
                        onOptionSelect ={e => {}}
                        setDefaultValue={profileData.codmun_dis}
                    />
                </div>

                <div className="form-group col-lg-4 col-md-6">
                    <label>Domicilio Fiscal</label>
                    <SelectDomicilioFiscal
                        onError={e => setCatchError(e)}
                        onOptionSelect ={e => {}}
                        setDefaultValue={profileData.coddfi}
                    />
                </div>

                <div className="form-group col-lg-8 col-md-12">
                    <label>Actividad Económica</label>
                    <SelectActividadEconomica
                        onError={e => setCatchError(e)}
                        onOptionSelect ={e => {}}
                        setDefaultValue={profileData.codace}
                    />
                </div>

                

                {/* <!-- Input --> */}
                <div className="form-group col-12 text-end">
                    <button className="theme-btn btn-style-one">Actualizar</button>
                </div>
            </div>
        </form>
    );
};

export default FormProfile;
