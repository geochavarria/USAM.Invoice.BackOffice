import FormProfile from "./FormProfile";
import { getEmpresaByCodeAsync, getEmpresaPuntosVentaByCodeAsync } from "@/helpers/backend_helpers/admin_helpers";
import React, { useEffect, useState } from "react";

import BrandForm from "./BrandForm";
import ContentWaitLoading from "@/components/common/ContentWaitLoading";
import CustomCatchError from "@/components/common/CustomCatchError";
import { Link } from "react-router-dom";

const CompanyProfile = () => {
        
    //Data State
    const [ profileData, setProfileData] =  useState({})
    const [ selectedBrand, setSelectedBrand] =  useState({})

    //Modal State
    const [ showBrandModal, setShowBrandModal] =  useState(false)

    //Trigger State
    const [ isLoading, setIsLoading]  = useState(false)
    const [ catchError, setCatchError ] =  useState("")
    
    const onLoadAsync = () => { }

    const perfil_onSelected = async(data) => {
        const ID = (data || {}).codigo || 0
        setIsLoading(true)
        try {
            const response =  await getEmpresaByCodeAsync(ID);
            if (!response.succeeded) {
                throw new Error(response.message)
            }
            const data = (response.data || {})
            setProfileData(data)

            const { data: data2} =  await getEmpresaPuntosVentaByCodeAsync(ID)
             setProfileData({...data, puntosVentas : data2})
        
        } catch (error) {
            setCatchError(error)
        }finally{
            setIsLoading(false)
        }
    }
    
    const btnAdd_onClick = (e) => {
        
    }

    const RowBrand_onClick = (e)=> {
        const { data } =  e
        setSelectedBrand(data)
        setShowBrandModal(true)
    }

    const [ brandKeys, setBrandKeys ] =  useState(0)
    const brandForm_onBinding = async(e) => {
        const { data } =  e;
        await perfil_onSelected(profileData)
    }

    useEffect(()=> {
        perfil_onSelected({});
    },[])

    return (<>
        <div className="row">
            <CustomCatchError innerException={catchError} />

            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <div className="ls-widget">
                    <div className="tabs-box">
                        <div className="widget-title pb-0 mb-2 border-bottom ">
                            <h4>Datos Generales</h4>
                        </div>
                        <div className="widget-content">
                            <FormProfile 
                                data ={ profileData } 
                                onConfirm={e => perfil_onSelected(e.data)} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="sidebar-column col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
                <div className="sidebar">

                    <div className="sidebar-widget bg-white  pb-2 ">
                        <h4 className="widget-title mb-2">Socios de Negocio</h4>
                        <div className="widget-content">
                            <ul className="job-skills">
                                { (profileData?.sociosNegocios || []).map((_item, index)=> (
                                    <li key={index}><Link className="bg-info-subtle" to="#">{_item.prefix}{_item.nombre}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="sidebar-widget bg-white  pb-2 ">
                        <div className="d-flex justify-content-between">
                            <h4 className="widget-title mb-2 ">Sucursales</h4>
                            <button className="add-info-btn" onClick={e => RowBrand_onClick({data: { codigo :  profileData.codigo }})}>
                                <span className="icon flaticon-plus"></span>
                            </button>
                        </div>
                        
                        <div className="widget-content mt-3">
                            <ul className="job-skills">
                                { (profileData?.sucursales || []).map((_item, index)=> (
                                    <React.Fragment key={index}>
                                        <li><Link className="bg-primary-subtle" to="#" 
                                            id={ "brand" + index }
                                            onClick={e => RowBrand_onClick({
                                                originalEvent: e,
                                                data: _item,
                                                index
                                            })}>
                                            {_item.abreviado} {_item.nombre}</Link>
                                        </li>
                                    </React.Fragment>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="sidebar-widget bg-white  pb-2 ">
                        <h4 className="widget-title mb-2">Puntos de Venta</h4>
                        <div className="widget-content">
                            <ul className="job-skills">
                                { (profileData?.puntosVentas || []).map((_item, index)=> (
                                    <React.Fragment key={index}>
                                        <li><Link className="bg-warning-subtle" to="#" id={ "pointOfSale" + index }>
                                            {_item.codigo} {_item.nombre}</Link>
                                        </li>
                                    </React.Fragment>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

           <ContentWaitLoading isLoading={ isLoading} />

        </div>

        <BrandForm
            show={showBrandModal} 
            data={selectedBrand}
            onConfirm = { e => perfil_onSelected( profileData ) }
            onHide={e => setShowBrandModal(false)}/>

        
     
    </>);
};


export default CompanyProfile