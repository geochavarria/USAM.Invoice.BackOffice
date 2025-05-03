import CustomCatchError from "@/components/common/CustomCatchError";
import CustomTable from "@/components/controls/Table/CustomTable";
import { getAllAplicacionAsync } from "@/helpers/backend_helpers/admin_helpers";
import React, { useEffect, useMemo, useState } from "react";



const Applications = () => {
    
    const [ applicationList, setApplicationList ] =  useState([])
    const [ catchError, setCatchError ]  = useState("")


    const columnsDefinition = useMemo(()=> {
        let columnsTable = []
        columnsTable = [...columnsTable, ...[
            {
                header: "#",
                accessorKey: "No.",
                size: 16,
                cell : ({ row }) => (
                    <span>{ row.index + 1 }</span>
                )
            },
            {
                header: "Código",
                accessorKey: "codigo",
                size: 16,
                cell : ({ row }) => (
                    <div className="d-flex flex-column">
                        <a  href="#"
                            className="fw-medium fs-13 link-primary"> {row.original.codigo}</a>
                    </div>
                )
            },
            {
                header: "Aplicacion/Agente",
                accessorKey: "agente"
            },
            {
                header: "Sitio/Ensamble",
                accessorKey: "ensamble",
                size: 16,
                cell : ({ row }) => (
                    <a className=" link text-primary" href="#">{row.original.ensamble}</a>
                )
            },
            {
                header: "Responsable",
                accessorKey: "tecnico"
            },
        ]]

        return columnsTable
    },[])

    const onLoadAsync = async() =>{
        try {
            const response = await getAllAplicacionAsync();
            if (!response.succeeded) {
                throw new Error(response.message)
            }

            setApplicationList(response.data || {})
        } catch (error) {
            setCatchError(error)
        }
    }

    useEffect(()=> {
        onLoadAsync()
    },[])

    return(<React.Fragment>
        <CustomCatchError innerException={catchError} onClean={setCatchError} />
        <CustomTable
            isGlobalFilter={true}
            data={applicationList}
            columns={columnsDefinition}
            customPageSize={20}
            divClass="table-responsive"
            tableClass="table-hover align-middle table-nowrap mb-0 table-striped table-sm table table-hover"
            theadClass="table-light text-muted"
        />
    </React.Fragment>)
}

export default Applications;