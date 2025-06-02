import { getDashboardDocumentResumeByAppAsync } from "@/helpers/backend_helpers/dashborad_helpers";
import React, { useEffect, useState } from "react";
import { Col, Progress, Row } from "reactstrap";


const colors = ["#00008B", "#00BFFF", "#FFD700", "#32CD32", "#800000", "#FF4500", "#C71585"]

const ApplicationResume = () => {

    const [dataSource, setDataSource ] = useState([])

    const onLoadAsync = async (monthTerm = 1) => {
        setDataSource([])
        const response =  await getDashboardDocumentResumeByAppAsync(monthTerm);

        const  { data } =  response;
        setDataSource(data || [])
    }

    useEffect(()=> {
        onLoadAsync();
    }, [])
    return(<React.Fragment>
        <div className="widget-title ps-0 pb-1   border-bottom ">
            <h4 className="ps-3">Aplicaciones</h4>
            <div className="chosen-outer" style={{minWidth: 160}}>
                {/* <!--Tabs Box--> */}
                <select className="chosen-single form-select" 
                onChange={({target})=> onLoadAsync(target.value)} >
                <option value="1">Este Mes</option>
                <option value="6">Este Semestre</option>
                <option value="12">Este Año</option>
                </select>
            </div>
        </div>
        <div className="widget-content pt-2">
           
            
            <div className="d-flex flex-column gap-0.5">
                <span className="fw-normal">Transmisiones</span>
                <div className="d-flex align-items-center gap-1.5">
                <span  className="display-6 fs-secondary">{dataSource.reduce((sum, _item)=> sum + _item.counter, 0)}</span>
                <span className="badge bg-success-subtle text-success fs-11 fw-semibold inline-flex align-items-center justify-content-center">+2.5% </span>
                </div>
            </div>
            <Row>
                {dataSource.map((_item, index)=> (
                    <Col key={index}>
                        <Progress 
                            style={{ height: '4px' }} value={100}  
                            barStyle={{ background: colors[index]}}/>
                    </Col>
                ))}
            </Row>
            <div className="d-flex align-items-center gap-1 mb-1">

               
            </div>

            <div className="border-bottom mb-2"></div> 
           
            <div className="grid gap-3">
                {dataSource.length === 0 && <div className="alert alert-primary py-0" role="alert">
                ** Nada que mostrar **
                </div>}

                {dataSource.map((_item, index)=> (
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2" key={index}>
                        <div className="d-flex align-items-center gap-1.5">
                            <i className="icon fa fa-store"/>
                            <span className=" fw-normal ">{_item.label}</span>
                        </div>
                        <div className="d-flex align-items-center  fw-normal  gap-6">
                            <span className="fw-semibold text-end "> {_item.counter}</span>
                            <span className="d-flex items-center justify-content-end gap-1"> 
                                <i className="fa fa-arrow-up text-success" />
                                 {_item.value.toFixed(1)}%</span>
                        </div>
                    </div>
                ))}
               
            </div>
        </div>
    </React.Fragment>)
}

export default ApplicationResume;