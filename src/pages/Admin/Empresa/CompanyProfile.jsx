import FormProfile from "./FormProfile";
import BrandsDataTable from "./BrandsDataTable";
import { getEmpresaByCodeAsync } from "@/helpers/backend_helpers/admin_helpers";
import { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import BrandForm from "./BrandForm";

const CompanyProfile = () => {
        
    //Data State
    const [ profileData, setProfileData] =  useState({})
    const [ selectedBrand, setSelectedBrand] =  useState({})

    //Modal State
    const [ showBrandModal, setShowBrandModal] =  useState(false)

    //Trigger State
    const [ catchError, setCatchError ] =  useState("")
    const onLoadAsync = () => { }

    const perfil_onSelected = async({ data }) => {
        const ID = (data || {}).codigo || 0
        try {
            const response =  await getEmpresaByCodeAsync(ID);
            if (!response.succeeded) {
                throw new Error(response.message)
            }

            const data = (response.data || {})
            setProfileData(data)
            
            //const sucursales = data.sucursales || [];
            // const defaultBrand = data.sucursales[0] || {}

            // setSelectedBrandData(defaultBrand)
            // setActiveBrandTab(defaultBrand.codigo || "0")
            
            
            // //Filters
            // const options = sucursales.map(item=>({ 
            //     value: item.codigo, 
            //     label: item.nombre,
            //     data: item
            // }))
            // setSingleBrandOptions(options)
            // setselectedMultiBrand(options)
        } catch (error) {
            setCatchError(error)
        }
    }
    
    const btnAdd_onClick = (e) => {
        
    }

    const RowBrandDataTable_onClick = (e)=> {
        const { data } =  e
        setSelectedBrand(data)
        setShowBrandModal(true)
    }
    useEffect(()=> {
        perfil_onSelected({});
    },[])

    return (<>

        <div className="row">
            <div className="col-lg-12">

                <div className="ls-widget">
                    <div className="tabs-box">
                        <div className="widget-title pb-0">
                            <h4>Datos Generales</h4>
                        </div>
                        <div className="widget-content">
                            <FormProfile data ={ profileData } />
                        </div>
                        
                    </div>
                </div>
                {/* <!-- Ls widget --> */}
                <Row>
                    <Col xl={6}>
                        <div className="ls-widget">
                            <div className="tabs-box">
                                <div className="widget-title pb-1">
                                    <h4>Sucursales</h4>
                                    <button type="button" className="btn btn-outline-primary" onClick={e => RowBrandDataTable_onClick({ data : {codemp :  profileData.codigo}})}>
                                        <span className="flaticon-add " /> {" Nuevo"}
                                    </button>
                                </div>
                                {/* End .widget-title */}
                                <div className="widget-content">
                                    <BrandsDataTable 
                                        data = { profileData.sucursales }
                                        onRowClick={e => RowBrandDataTable_onClick(e)}
                                        />
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={6}>
                        <div className="ls-widget">
                            <div className="tabs-box">
                                <div className="widget-title">
                                    <h4>Puntos de Venta</h4>
                                </div>
                                {/* End .widget-title */}

                                <div className="widget-content">
                                    {/* <ContactInfoBox /> */}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
              
                {/* <!-- Ls widget --> */}

               
                {/* <!-- Ls widget --> */}
            </div>
        </div>      
          

          <BrandForm  
            show={showBrandModal} 
            data={selectedBrand}
            onHide={e => setShowBrandModal(false)}/>
    </>);
};


export default CompanyProfile