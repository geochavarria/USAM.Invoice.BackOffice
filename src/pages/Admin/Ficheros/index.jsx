

import {catalogData}  from "@/data/catalogsList.js"

import MetaComponent from "@/components/common/MetaComponent";
import CustomPage from "@/layout/CustomPage";
import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { getAllActividadEconomicaGroupedAsync, getAllCatalogoByTypeAsync, getAllTipoDocumentoAsync } from "@/helpers/backend_helpers/admin_helpers";
import CustomTable from "@/components/controls/Table/CustomTable";
import { StatusColBoolean } from "@/components/controls/Status";
import { UncontrolledCollapse } from "reactstrap";



const metadata = {
    title: "Ficheros & Catálogos",
};

const Ficheros = () => {

    const [ categories, setCategories] = useState([])
    const [ selectedCategory, setSelectedCategory] = useState({})
    const [ dataSource, setDataSource] = useState([])

    const [ isLoadingData, setIsLoadingData ] =  useState(false)
    const [ catchError, setCatchError ] = useState("")

    const [defaultColumn, setDefaultColumn] = useState(undefined)

    const [activeTab, setActiveTab ] = useState(1)
    const tabSection_onChange = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            setSelectedCategory(categories.find(x=> x.id === tab))
        }
    }

    const category_onSelected = async ({ data }) => {
        tabSection_onChange(data.id);

        setIsLoadingData(true)
        setSelectedCategory(data)
        setDataSource([])
        setDefaultColumn(undefined)
        //u_fileManagerSidebar()
        try {   
            const response  =  await getAllCatalogoByTypeAsync(data.filetype)
            if (!response.succeeded) {
                throw new Error(response.message)
            }

            setDataSource(response.data || {})
            
        } catch (error) {
            setCatchError(error)
        }finally{
            setIsLoadingData(false)
        }
    }

    const tipoDocumento_onDataSource = async({data})=> {
        try {
            setSelectedCategory(data)
            setDataSource([])
            setIsLoadingData(true)
            setDefaultColumn(undefined)
            // u_fileManagerSidebar()
            const response  =  await getAllTipoDocumentoAsync()
            if (!response.succeeded) {
                throw new Error(response.message)
            }

            setDataSource(response.data || {})
        
            setDefaultColumn([
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
                    maxSize: 16,
                    cell : ({ row }) => (
                        <a  href="#" className=" fw-medium fs-13 link-primary"> {row.original.codigo}</a>
                    )
                },
                {
                    header: "Abr.",
                    accessorKey: "abreviado",
                    size: 16,
                    maxSize: 16,
                    cell : ({ row }) => (
                        <a  href="#" className=" fw-bold fs-13 text-body"> {row.original.abreviado}</a>
                    )
                },
                {
                    header: "Descripción",
                    minSize: 320,
                    accessorKey: "nombre"
                },
                {
                    header: "Versión",
                    accessorKey: "version",
                    size: 16,
                    cell : ({ row }) => (
                        <span className="badge bg-info-subtle text-info"> {row.original.version}</span>
                    )
                },
                {
                    header: "Objeto",
                    accessorKey: "objeto",
                    size: 16,
                    cell : ({ row }) => (
                        <span className="badge bg-secondary-subtle text-secondary"> {row.original.objeto}</span>
                    )
                },
            ])
        } catch (error) {
            setCatchError(error)
        }finally{
            setIsLoadingData(false)
        }
    }

    const actividadEconomica_onDataSource = async({data})=> {
        try {
            setIsLoadingData(true)
            setSelectedCategory(data)
            setDataSource([])
            setDefaultColumn(undefined)
            const response  =  await getAllActividadEconomicaGroupedAsync()
            if (!response.succeeded) {
                throw new Error(response.message)
            }

            const source = (response.data || {})
            setDataSource(source.map((_item)=> ({
                codigo : _item.codigo,
                nombre : _item.nombre,
                subRows : _item.actividad
            })))
        
            setDefaultColumn([
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
                    maxSize: 16,
                    cell : ({row, getValue}) => {

                        let fx_rowTemplate = null;
                        if(row.getCanExpand()){
                            fx_rowTemplate = (<a  href="#" className=" fw-bold fs-13 link-primary" onClick={row.getToggleExpandedHandler()}> 
                                {row.getIsExpanded() ? '👇' : '👉'}{row.original.codigo}
                            </a>)
                        }else{
                            fx_rowTemplate = (<span className="text-body ">{row.original.codigo}</span>)
                        }
                        return (<div
                            style={{
                              paddingLeft: `${row.depth * 2}rem`,
                            }}
                          >
                            {fx_rowTemplate}
                          </div>)
                    }
                },
                {
                    header: "Descripción",
                    minSize: 320,
                    accessorKey: "nombre"
                }
            ])
        } catch (error) {
            setCatchError(error)
        }finally{
            setIsLoadingData(false)
        }
    }

    const columnsDefinition = useMemo(()=> {
        let columnsTable = []

        if(defaultColumn)
            columnsTable=[...defaultColumn]
        else
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
                    maxSize: 16,
                    cell : ({ row }) => (
                        <a  href="#"
                        className=" fw-medium fs-13 link-primary"> {row.original.codigo}</a>
                    )
                },
                {
                    header: "Descripción",
                    minSize: 320,
                    accessorKey: "nombre"
                },
                {
                    header: "",
                    accessorKey: "status",
                    size: 16,
                    maxSize: 16,
                    enableSorting: false,
                    cell : ({ row }) => (<StatusColBoolean status={row.original.activo} />)
                },
            ]]

        return columnsTable
    },[defaultColumn])
  

    useEffect(()=> {

        setCategories(catalogData);
    },[])


    return (<React.Fragment>
        <MetaComponent meta={metadata} />
        <CustomPage pageTitle={metadata.title}>
            <div className=" row">
                <div className="contacts_column  col-12 col-md-4 col-xl-3 ">
                    <div className="card contacts_card ">
                        {/* Tab */}
                        <div className="card-body contacts_body ps-3">
                            <ul className="list-unstyled file-manager-menu">
                                <li>
                                    <Link to="#" id="listOfCatalogs" data-bs-toggle="collapse" aria-expanded="true" aria-controls="listOfCatalogs">
                                        <i className="fa fa-folder align-bottom me-2"></i> 
                                        <span className="file-list-link">Catálogos</span>
                                    </Link>
                                    <UncontrolledCollapse toggler={"#listOfCatalogs"} defaultOpen={true}>
                                        <ul className="sub-menu list-unstyled">
                                        {(categories || []).map((_item, index)=> (
                                            <li key={_item.id} className={ classNames({ 
                                                active: activeTab === _item.id 
                                            })}>
                                                <Link to="#"  
                                                    className={classNames({
                                                        "active fw-bold" : selectedCategory.id === _item.id
                                                    })}
                                                    onClick={(e) => 
                                                        category_onSelected({
                                                            originalEvent: e,
                                                            data: _item,
                                                            index
                                                        })
                                                    }>
                                                     {_item.id}. {_item.fileName}
                                                </Link>   
                                            </li>
                                        ))}
                                        </ul>
                                    </UncontrolledCollapse>
                                </li>
                                <li>
                                    <Link to="#" className={classNames({
                                            "active fw-bold" : selectedCategory.id === 100
                                        })}
                                        onClick={e=>  tipoDocumento_onDataSource({
                                            originalEvent: e,
                                            data: {
                                                id: 100,
                                                fileName: "Tipos de Documentos"
                                            },
                                            index: 100
                                        })}>
                                        <i className="fa fa-file-alt align-bottom me-2"></i> 
                                        <span className="file-list-link">Documentos Tributarios</span>
                                    </Link>
                                </li> 
                                <li>
                                    <Link to="#"  
                                        className={classNames({
                                            "active fw-bold" : selectedCategory.id === 101
                                        })}
                                        onClick={e=>  actividadEconomica_onDataSource({
                                            originalEvent: e,
                                            data: {
                                                id: 101,
                                                fileName: "Actividad Económica"
                                            },
                                            index: 101
                                        })}>
                                        <i className="fa fa-warehouse align-bottom fs-8 "></i> Actividad Económica
                                    </Link>
                                </li>       
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-8 col-xl-9 chat" >
                    <div className="card message-card">
                        <div className="card-header msg_head">
                            <div className="d-flex bd-highlight">
                                <div className="">
                                    <i className="fa fa-folder"></i>
                                </div>
                                <div className="user_info">
                                    <span>{selectedCategory.fileName}</span>
                                    <p>{selectedCategory.fileItem}</p>
                                </div>
                            </div>
                        </div>
                        <div className="card-body msg_card_body p-3">
                            <CustomTable
                                    isGlobalFilter={true}
                                    loading={isLoadingData}
                                    data={dataSource}
                                    columns={columnsDefinition}
                                    customPageSize={15}
                                    divClass="table-responsive"
                                    tableClass="table-hover align-middle mb-0 table-striped table-sm  "
                                    theadClass="table-light text-muted"
                                />
                        </div>
                    </div>
                </div>
            </div>
        </CustomPage>
    </React.Fragment>)
}

export default Ficheros