import CustomCatchError from "@/components/common/CustomCatchError";
import CustomTable from "@/components/controls/Table/CustomTable";
import {  getAllPuntoVentaAsync } from "@/helpers/backend_helpers/admin_helpers";
import React, { useEffect, useMemo, useState } from "react";
import PointSalesForm from "./PointSalesForm";



const PointSales = () => {
    
    const [ dataSource, setDataSource ] =  useState([])
    const [ selectedData, setSelectedData ] =  useState({})
    const [ catchError, setCatchError ]  = useState("")
    const [ showFormModal, setShowFormModa ] =  useState(false)


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
                header: "Código",
                accessorKey: "codigo",
                size: 56,
                maxSize:45,
                cell : ({ row }) => (
                    <div className="d-flex flex-column">
                        <a  href="#"
                            className="fw-medium fs-13 link-primary"> {row.original.codigo}</a>
                    </div>
                )
            },
            {
                header: "Punto de Venta",
                accessorKey: "nombre",
                maxSize:2080,
                size: 450
            },
            {
                header: "",
                accessorKey: "btnActions",
                size: 13,
                minSize: 16,
                cell : ({ row }) => (
                    <button className="btn btn-light btn-sm" 
                        onClick={e=> btnEdit_onClick({
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
            const response = await getAllPuntoVentaAsync();
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

    const btnEdit_onClick = (e) => {
        const {  data } =  e
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
            customPageSize={20}
            divClass="table-responsive"
            tableClass="align-middle table-nowrap mb-0 table-striped table-sm table table-hover"
            theadClass="table-light text-muted"
        />

        <PointSalesForm 
            show={ showFormModal} 
            data = { selectedData } 
            onConfirm = {e => parameter_onEndEdit(e)}
            onHide={e=> setShowFormModa(false)}/>


    </React.Fragment>)
}

export default PointSales;