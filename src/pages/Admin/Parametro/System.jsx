import CustomCatchError from "@/components/common/CustomCatchError";
import {  getAllParametroAsync } from "@/helpers/backend_helpers/admin_helpers";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SystemForm from "./SystemForm";


const sectionParameters = [
    { value: "P_CF", label: "Configuración Generales (CF)", color: "theme-blue" },
    { value: "P_CTG", label: "Configuración de Contingencias (CTG)", color: ""},
]

const parameterType ={
    "S" :  "Texto",
    "B" : "Lógico",
    "N" : "Numérico"
}

const System = () => {
    
    const [ dataSource, setDataSource ] =  useState([])
    const [ selectedData, setSelectedData ] =  useState({})
    const [ catchError, setCatchError ]  = useState("")
    const [ showFormModal, setShowFormModa ] =  useState(false)

    const onLoadAsync = async() =>{
        try {
            const response = await getAllParametroAsync();
            if (!response.succeeded) {
                throw new Error(response.message)
            }

            setDataSource(response.data || {})
        } catch (error) {
            setCatchError(error)
        }
    }


    const btnNew_onClick = (e)=>{
        setSelectedData({})
        setShowFormModa(true);
    } 


    const parameterRow_onClick = (e) => {
        const {  data } =  e
        setSelectedData(data)
        setShowFormModa(true)
    }

    const parameter_onEndEdit = (e) => {
        const { data } = e
        const idx =  dataSource.findIndex(x => x.abreviado === data.abreviado)
        if(idx < 0) return;

        setDataSource(p => {
            p[idx] =  data;
            return [...p]
        })
    }


    const CodePreComponent = ({ item } ) => {

        let valueDsc = item.valor
        if(item.tipo === "B" ){
             valueDsc = valueDsc === "0" ? "No" : "Sí";
        } 
        return (<><pre className="language-markup rounded-2" 
             style={{whiteSpace: "pre-wrap", wordWrap: "break-word"}}>{valueDsc}</pre>
        </>)
    }



    useEffect(()=> {
        onLoadAsync()
    },[])

    return(<React.Fragment>
        <CustomCatchError innerException={catchError} onClean={setCatchError} />
        <div className="row p-3">
        {(sectionParameters || []).map((s, index) => (
            <div className={"resume-outer " + s.color} key={index}>
                <div className="upper-title">
                    <h4 className="text-primary"><span className="icon icon-task fs-7"></span> {" " } {s.label}</h4>
                    <button className="add-info-btn" onClick={e => btnNew_onClick(e)}>
                        <span className="icon flaticon-plus"></span> Agregar
                    </button>
                </div>
                {(dataSource  || [])
                    .filter(x=> x.abreviado.includes(s.value)).map((p)=> {
                    
                    
                    return(<div className="resume-block" key={p.codigo}>
                        <div className="inner pb-4">
                            <span className="name">{p.codigo}</span>
                            <div className="title-box mb-1 d-flex flex-row justify-content-between">
                                <div className="info-box ">
                                    <h3 className="mb-0">{p.nombre}</h3>
                                    <span className="fs-7">{p.abreviado} - {p.descripcion}</span>
                                </div>
                                <div className="edit-box">
                                    <span className="year">{parameterType[p.tipo]}</span>
                                    <div className="edit-btns">
                                        <button onClick={e=> parameterRow_onClick({
                                            originalEvent: e,
                                            data: p,
                                            index: -1
                                        })}>
                                            <span className="fa fa-pencil-alt"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="text">
                                <CodePreComponent item={p} />
                            </div>
                        </div>
                    </div>)
                })}
            </div>
        ))}
        </div>
        <SystemForm 
            show={ showFormModal} 
            data = { selectedData } 
            onConfirm = {e => parameter_onEndEdit(e)}
            onHide={e=> setShowFormModa(false)}/>
    </React.Fragment>)
}

export default System;