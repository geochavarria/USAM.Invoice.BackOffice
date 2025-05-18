import { OperacionUsuario } from "@/common/constants";
import { dateTimeToHTML, dateTimeToNormal } from "@/common/core/utilities/dateTime";
import CustomTable from "@/components/controls/Table/CustomTable";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";




const FileTable = ({
    data = [],
    isLoadingData,
    onError = () => {},
    onRowClick = () => {}
}) => {


    //Data State 
    const [ dataSource, setDataSource] = useState([])


    //Trigger State
    const [startPage, setStartPage ] =  useState(0)
    const [ catchError, setCatchError ] = useState("")


    const fx_icon =(type)=> {
        switch (type){
            case "Directory":
                return "fa fa-folder text-warning";
            case "json":
                    return "fa  fa-file text-muted";
            case "pdf":
                return "fa  fa-file-pdf text-danger";
            default:
                return "";
        }
    }

    const columnsDefinition = useMemo(()=> {
        let columnsTable = []

        columnsTable = [...columnsTable, ...[
            {
                header: "Nombre",
                accessorKey: "name",
                maxSize:2040,
                cell : ({ row }) => (
                    <Link to="#" 
                        onClick={(e) => onRowClick({
                            originalEvent: e,
                            action: OperacionUsuario.VER,
                            data :  row.original,
                            index: row.index
                        })}>
                        <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 fs-17 me-2 filelist-icon">
                                <i className={fx_icon(row.original.type) +" align-bottom"} />
                            </div>
                            <div className="flex-grow-1 filelist-name">{row.original.name}</div>
                        </div>
                    </Link>
                )
            },
            {
                header: "Tipo",
                accessorKey: "type",
                size: 16,
                minSize: 16,
                maxSize: 16,
                cell : ({ row }) => (
                    <a  href="#"
                    className=" fw-medium fs-13 link-primary"> {row.original.type}</a>
                )
            },
            {
                header: "Fecha",
                accessorKey: "updateAt",
                size: 85,
                maxSize: 320,
                cell : ({ row }) => {
                    const { original: item } =  row
                    return (<React.Fragment>
                        <div style={{ maxWidth: "80px"}}> { dateTimeToHTML(item.updateAt)}</div>
                    </React.Fragment>)
                }
            },

            {
                header: "",
                id: "buttons",
                size: 18,
                minSize: 12,               
                maxSize: 22,
                enabledSorted: false,
                cell : ({ row }) => {
                    const { original: item } =  row
                    return (<>
                        <div style={{ maxWidth: "22px"}}>
                        { item.type !== "Directory" && 
                        <Button size="sm" color="primary" 
                            onClick={(e) => onRowClick({
                                originalEvent: e,
                                action: OperacionUsuario.EXPORTAR,
                                data :  row.original,
                                index: row.index
                            })}>Descargar</Button> }
                        </div>
                    
                  </> )
                    }
            }
        ]]

        return columnsTable
    },[onRowClick])
  

    useEffect(()=> {
        setDataSource(data)
        setStartPage(e => (e+1))
    }, [data])


    return <React.Fragment>
     
        <CustomTable
            key= { startPage}
            isGlobalFilter={true}
            size="sm"
            loading={isLoadingData}
            data={ dataSource }
            columns={ columnsDefinition }
            customPageSize={15}
            divClass="table-responsive"
            tableClass="table-hover align-middle mb-0 table-nowrap table-striped  table-sm  "
            theadClass="table-light text-muted"
        />
    </React.Fragment>
}

export default FileTable;