import { dateTimeToHTML, getCurrentDate } from "@/common/core/utilities/dateTime";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Input, Row, Table, UncontrolledDropdown } from "reactstrap";
import Flatpickr from "react-flatpickr";
import classNames from "classnames";
import "flatpickr/dist/themes/material_green.css";
import { SelectTipoDocumento } from "@/components/controls/Catalogos";
import { SelectApplication, SelectSucursal } from "@/components/controls/Admin";
import SimpleBar from "simplebar-react";
import TableSearchNoResult from "@/components/controls/Table/TableSearchNoResult";
import { SearchNoResult } from "@/components/controls/Table/SearchNoResult";
import { NumberColMoney } from "@/components/controls/General";
import { StatusColString, StatusDotString } from "@/components/controls/Status";
import { ButtonGridEdit } from "@/components/controls/Buttons";
import { getAllDocumentPagedAsync } from "@/helpers/backend_helpers/documentManagement_helpers";
import { Link } from "react-router-dom";
import { PROCESADO } from "@/common/constants/estadoTypes";
import CustomPaginator from "@/components/controls/Table/CustomPaginator";
import { OperacionUsuario } from "@/common/constants";

const DocumentTable = ({
    rows = 10,
    rowsPageOptions,
    onError = () => {},
    onRowClick = () => {}
})=> {

    //DataState
    const [ dataSource, setDataSource ] =  useState([])

    //Filter State
    const [ searchTerm, setSearchTerm ] = useState("")
    const [ tipoDocumento, setTipoDocumento ] =  useState("")
    const [ sucursalID, setSucursalID ] =  useState("")
    const [ aplicacionID, setAplicacionID ] =  useState("")
    const [ rangoFecha, setRangoFecha ] =  useState({
        fecha_desde : getCurrentDate({ extraDay : -3 }),
        fecha_hasta : getCurrentDate({ extraDay : 5 })
    })

    //Trigger State
    const [ isLoadingData, setIsLoadingData ] = useState(false)
    const [ catchError, setCatchError] = useState("")

    //Paging State
    const [ rowsPerPageOptions, setRowsPerPageOptions] =  useState(rowsPageOptions || ([rows || 10,50,100]))
    const [pagination, setPagination] = useState({
        page: 1,
        pageSize : rows || 10,
        rowCount : 0
    })

    const onLoadAsync = async( 
        page = 1,
        pageSize= 10, 
        fechaDesde, 
        fechaHasta, 
        docID,
        sucID,
        appID,
        searchTerm = ""
    ) => {
        try {
            setIsLoadingData(true)
            setDataSource([]) 
            const response = await getAllDocumentPagedAsync({
                page,
                pageSize,
                fechaDesde,
                fechaHasta,
                docID,
                sucID,
                appID,
                searchTerm
            });

            if (!response.succeeded) {
                throw new Error(response.message)
            }

            const { data  } =  response 
            setDataSource(data.results)

            setPagination(prev => ({...prev, 
                firstRowOnPage : data.firstRowOnPage,
                page : data.currentPage,
                pageSize : data.pageSize,
                pageCount : data.pageCount,
                rowCount :  data.rowCount,
            }))

        } catch (error) {
            setCatchError(error)
        }
        finally{
             setIsLoadingData(false)
        }

    }

    const handlePage_onClick = useCallback(async (event) => {
        const { fecha_desde, fecha_hasta } = rangoFecha
        const { currentPage, pageSize } =  event

        const docID =  tipoDocumento;
        const appID = aplicacionID;        
        await onLoadAsync(currentPage, pageSize, fecha_desde, fecha_hasta, docID, sucursalID, appID, searchTerm)
        //eslint-disable-next-line 
    },[searchTerm, rangoFecha])

    const btnAplicarFiltro_onClick = async() => {
        try{
            const { fecha_desde, fecha_hasta } = rangoFecha
            const { 1 :  currentPage, pageSize  } =  pagination
            const docID =  tipoDocumento;
            const appID = aplicacionID;      
            await onLoadAsync(currentPage, pageSize, fecha_desde, fecha_hasta,docID, sucursalID, appID, searchTerm  )
            
        }catch(ex){
            setCatchError(ex)
        }
    }


    useEffect(()=> {
        onError(catchError)
    }, [catchError, onError])

    useEffect(() => {
        setIsLoadingData(true)
        const delayDebounceFn = setTimeout(async() => {
            btnAplicarFiltro_onClick()
        }, 1000)
        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])

    return <React.Fragment>
        <div  className="border border-dashed border-end-0 border-start-0 p-2 mb-1 flex-grow-1 flex-shrink-1">
            <Row>
                <Col  md={8}>
                    <div className="search-box mb-1">
                        <Input type="text" autoComplete="off" 
                            name="txtSearch"
                            className="form-control search bg-light"
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                            id="search-bar"
                            value={searchTerm || ""}
                            placeholder="Buscar Documento..."/>
                        <i className="ri-search-line search-icon"/>
                    </div>
                </Col>
                <Col sm={6} md={3} lg={2}>
                    <div className="mb-1">
                        <Flatpickr  className={` form-control  ${ classNames({
                            "bg-white" :  false,
                            "bg-light" :  true,
                        })}`}
                        name="prmFechaDesde"
                        defaultValue={ rangoFecha.fecha_desde }
                        options={{
                            altInput: true,
                            allowInput : true,
                            altFormat: "d/m/Y",
                            dateFormat: "Y-m-d"
                        }}
                        onChange={(date, dateStr) =>{
                            setRangoFecha(prev => ({...prev,
                                fecha_desde  : dateStr
                            }))
                        }}/>
                    </div>
                </Col>
                <Col sm={6} md={3} lg={2}>
                    <div className="mb-1">
                        <Flatpickr  className={` form-control  ${ classNames({
                            "bg-white" :  false,
                            "bg-light" :  true,
                        })}`}
                        name="prmFechaHasta"
                        defaultValue={ rangoFecha.fecha_hasta }
                        options={{
                            altInput: true,
                            allowInput : true,
                            altFormat: "d/m/Y",
                            dateFormat: "Y-m-d"
                        }}
                        onChange={(date, dateStr) =>{
                            setRangoFecha(prev => ({...prev,
                                fecha_hasta  : dateStr
                            }))
                        }}/>
                    </div>
                </Col> 
                <Col sm={6} md={4} lg={4}>
                    <SelectTipoDocumento
                        isSearch={true}
                        isClear={true}
                        onOptionSelect={e => {
                           setTipoDocumento(e.data?.value || "")
                        }}
                        setDefaultValue={tipoDocumento}
                    />
                </Col>
                <Col sm={6} md={4} lg={3}>
                    <SelectSucursal
                        isSearch={true}
                        isClear={true}
                        onOptionSelect={e => {
                            setSucursalID(e.data?.value || "")
                        }}
                        setDefaultValue={ sucursalID }
                    />
                </Col>
                <Col sm={6} md={4} lg={3}>
                    <SelectApplication
                        isSearch={true}
                        isClear={true}
                        onOptionSelect={e => {
                            setAplicacionID(e.data?.value || "")
                        }}
                        setDefaultValue={ aplicacionID }
                    />
                </Col>
                <Col>
                    <Button color="primary"
                        className="w-100 mb-1"
                        onClick={(e)=> btnAplicarFiltro_onClick(e)}>
                        <i className="fa fa-filter me-1 align-bottom"/> 
                        <span className="d-lg-none d-xxl-inline d-sm-inline">Buscar</span>
                    </Button>
                </Col>
            </Row>
        </div>
        <SimpleBar autoHide={false}  className="simplebar-track-info px-2"  id={"simpleBarContent"}>
            <Table striped  hover className="table  align-middle table-nowrap mb-0 table-sm" >
                <thead className="table-light text-body">
                    <tr>
                        <th style={{ width : "3rem" }}>No</th>
                        <th style={{width : "20rem"}}>DTE</th>
                        <th>Referencia</th>
                        <th style={{ width : "6rem" }}>Fecha</th>
                        <th style={{ width : "8rem" }}>Monto</th>
                        <th style={{ width : "4rem" }}>Estado</th>
                        <th style={{ width : "2rem" }}></th>
                    </tr>
                </thead>
                <tbody>
                {!isLoadingData && (dataSource || []).map((_item, index)=> (
                    <tr key={index}>
                        <td> { pagination.firstRowOnPage + index } </td>
                        <td>
                            <div className="d-flex align-items-center">
                                <StatusDotString status={_item.estado} />    
                                <Link to="#" className="fw-medium link-primary"
                                    onClick={e =>onRowClick({
                                        originalEvent : e,
                                        action : OperacionUsuario.VER,
                                        data : _item,
                                        index : index
                                    })}
                                >{ _item.codigo }</Link>
                            </div>
                            <span className="fs-11">{_item.numeroControl}</span>
                        </td>
                        <td>
                            <div className="d-flex align-items-center fs-13 text-uppercase fw-semibold">
                                {_item.receptor} 
                            </div>
                            <ul className="hstack gap-1">
                                <li><small> Ref. {_item.referencia }</small> </li>
                                <li> <span className="ms-2 badge  bg-primary-subtle text-primary"> {_item.abreviado}</span></li>
                                <li>
                                    <span className="badge bg-light text-body fs-12 fw-medium">
                                        <i className="ri-terminal-box-line text-primary me-1"></i>{_item.codapp}
                                    </span>
                                </li>
                            </ul>                          
                        </td>
                       
                        <td>{dateTimeToHTML(_item.fechaEmision)}</td>
                        <td>
                            <div className="">
                                <NumberColMoney value={_item.totalPagar } className="text-primary fw-bold" />
                            </div>
                        </td>
                        <td><StatusColString  status={_item.estado}/></td>
                        <td>
                            <ButtonGridEdit
                                onEdit= {e =>onRowClick({
                                    originalEvent : e,
                                    action : OperacionUsuario.VER,
                                    data : _item,
                                    index : index
                                })}
                                disabledDeleteButton={ _item.estado !== PROCESADO.init}
                                onDelete ={e => onRowClick({
                                    originalEvent : e,
                                    action : OperacionUsuario.ANULAR,
                                    data : _item,
                                    index : index
                                })}
                                iconDeleteButton ="fa fa-ban"

                                otherButton={
                                    <li className="ms-1">
                                    <UncontrolledDropdown direction='start'>
                                        <DropdownToggle tag="button" className="btn btn-light btn-sm">
                                            <i className="fa fa-bars text-muted"></i>
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu-end" container={"simpleBarContent"}>
                                            
                                            <DropdownItem to="#"  
                                                onClick={e => onRowClick({
                                                    originalEvent : e,
                                                    action : OperacionUsuario.EXPORTAR,
                                                    data : _item,
                                                    index : index
                                                })}>
                                                    <i className="fa fa-cloud-download-alt   text-muted"></i> Consultar
                                            </DropdownItem>
                                            <DropdownItem to="#"
                                                onClick={e => onRowClick({
                                                    originalEvent : e,
                                                    action : OperacionUsuario.IMPRIMIR,
                                                    data : _item,
                                                    index : index
                                                })}>
                                                    <i className="fa fa-print  text-muted"></i> Imprimir
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </li>
                                }
                            />
                        </td>
                    </tr>
                ))}
                {!isLoadingData && <TableSearchNoResult  data={ dataSource }  message ={ ""}/>}
                </tbody>
            </Table>
            {isLoadingData && <SearchNoResult /> }
        </SimpleBar>
        <div className="px-3">                                    
            <CustomPaginator
                rows={ pagination.pageSize } 
                currentPage = { pagination.currentPage }
                totalRecords={ pagination.rowCount }  
                rowsPerPageOptions={ rowsPerPageOptions } 
                page={(evt)=>  handlePage_onClick(evt) }/>
        </div> 


    </React.Fragment>
}

export default DocumentTable;