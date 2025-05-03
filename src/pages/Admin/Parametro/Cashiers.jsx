import CustomCatchError from "@/components/common/CustomCatchError";
import CustomTable from "@/components/controls/Table/CustomTable";
import {  getAllCajerosAsync, getAllPuntoVentaAsync } from "@/helpers/backend_helpers/admin_helpers";
import React, { useEffect, useMemo, useState } from "react";
import { Col } from "reactstrap";
import CashiersForm from "./CashiersForm";



const Cashiers = () => {
    
    const [ dataSource, setDataSource ] =  useState([])

    const [ selectedData, setSelectedData ] =  useState({})
    const [ showFormModal, setShowFormModa ] =  useState(false)
    const [ catchError, setCatchError ]  = useState("")


    const columnsDefinition = useMemo(()=> {
        let columnsTable = []
        columnsTable = [...columnsTable, ...[
            {
                header: "#",
                accessorKey: "No.",
                size: 16,
                minSize: 16,
                cell : ({ row }) => (
                    <span>{ row.index + 1 }</span>
                )
            },
            {
                header: "Usuario",
                accessorKey: "usuario",
                size: 56,
                maxSize:45,
                cell : ({ row }) => (
                    <div className="d-flex flex-column">
                        <a  href="#"
                            className="fw-medium fs-13 link-primary"> {row.original.usuario}</a>
                    </div>
                )
            },
            {
                header: "Asesor de Ventas",
                maxSize:1040,
                accessorKey: "nombre"
            },

            {
                header: "",
                accessorKey: "btnActions",
                size: 13,
                minSize: 16,
                cell : ({ row }) => (
                    <button className="btn btn-light btn-sm" 
                        onClick={e=> chashierRow_onClick({
                        originalEvent: e,
                        data: row.original,
                        index: row.index
                    })}>
                        <span className="fa fa-pencil-alt text-primary"></span>
                    </button>
                )
            },
            
        ]]

        return columnsTable
    },[])

    const onLoadAsync = async() =>{
        try {
            const response = await getAllCajerosAsync();
            if (!response.succeeded) {
                throw new Error(response.message)
            }

            setDataSource(response.data || {})
        } catch (error) {
            setCatchError(error)
        }
    }


    const btnNew_onClick = () => {
        setSelectedData({})
        setShowFormModa(true)
    }

    const chashierRow_onClick = (e)=>{
        const { data } =e 
        setSelectedData(data)
        setShowFormModa(true)
    }

    useEffect(()=> {
        onLoadAsync()
    },[])

    return(<React.Fragment>
        <CustomCatchError innerException={catchError} onClean={setCatchError} />
        <CustomTable
            isGlobalFilter={true}
            data={dataSource}
            columns={columnsDefinition}
            onSetRowSelected={e => console.log(e)}
            customPageSize={20}
            divClass="table-responsive"
            tableClass="align-middle table-nowrap mb-0 table-striped table-sm table table-hover"
            theadClass="table-light text-muted"
        >
            <Col className="col-auto">
                <button className="theme-blue add-info-btn " onClick={e => btnNew_onClick(e)}>
                    <span className="icon flaticon-plus"/>
                </button>
            </Col>
        </CustomTable>

        <CashiersForm 
            show={ showFormModal} 
            data = { selectedData } 
            onConfirm = {e => parameter_onEndEdit(e)}
            onHide={e=> setShowFormModa(false)}/>


    </React.Fragment>)
}

export default Cashiers;