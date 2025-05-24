import { getDashboardDocumentResumeByTypeAsync } from "@/helpers/backend_helpers/dashborad_helpers";
import React, { useEffect, useState } from "react";
import { Col, Progress, Row } from "reactstrap";


const colors = ["#00008B", "#00BFFF", "#FFD700", "#32CD32", "#800000", "#FF4500", "#C71585"]

const DocumentResume = () => {

    const [dataSource, setDataSource ] = useState([])
    const onLoadAsync = async () => {
        const response =  await getDashboardDocumentResumeByTypeAsync();

        const  { data } =  response;
        setDataSource(data || [])
    }

    useEffect(()=> {
        onLoadAsync();
    }, [])
    return(<React.Fragment>
        <div className="widget-title px-0 pb-1 ">
            <div className="d-flex flex-column">
                <h4 className="px-3 lh-1">Documentos 
                    <br></br><span className="fs-7 text-muted">Transmisiones por tipo</span>
                </h4>
            </div>
        </div>
        <div className="widget-content pt-2">
            <div className="d-flex flex-column align-items-end">
                {dataSource.length === 0 && <div className="alert alert-primary py-0" role="alert">
                ** Nada que mostrar **
                </div>}
                {dataSource.map((_item, index)=> (
                <div className="w-100" key={index}>
                    <div className="d-flex align-items-center">
                        <div className="avatar-xs me-3">
                            <div className="avatar-title rounded bg-light text-secondary">
                                <i className="fa fa-file" />
                            </div>
                        </div>
                        <div className="d-flex align-items-center flex-grow-1 flex-wrap d-grid gap-1 ">
                            <div className="me-3s">
                                <a href="#" className="text-dark fw-bold fs-7"> {_item.label}</a>
                                <span className="text-muted  fs-7 d-block ps-0">{_item.caption}</span>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="text-dark fw-bold fs-6 me-3">{_item.counter}</span>
                            <span className="badge bg-success-subtle text-success fs-base">
                                <i className="fa fa-arrow-up me-1"></i>
                                {_item.value.toFixed(2)}%
                            </span>
                        </div>

                    </div>
                    <div className="border-bottom border-bottom-dashed separator separator-dashed my-2"></div>
                </div>))}
            </div>
        </div>
    </React.Fragment>)
}

export default DocumentResume;