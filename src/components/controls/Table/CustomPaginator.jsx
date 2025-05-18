import React, { useCallback, useEffect, useState } from "react"
import { Col, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap"

/**
 * 
 * @param {Number} rows Cantidad de filas por pagina
 * @param {Number} totalRecords Total de filas de tabla
 * @param {Number} rows Cantidad de filas por pagina
 * @returns 
 */
const CustomPaginator = ({
    paginatorClass = "mt-4",
    rows,
    currentPage = 1,
    totalRecords,
    rowsPerPageOptions,
    page })=> {
    /*
        rows (number): Numeros de filas que mostrar => PageSize
        rowsPerPageOptions(array): Optiones de numero de filas por páginas
    */

    const [pagination, setPagination] = useState({
        pageSize : (!rows ? 10 : rows),
        currentPage: 1,
        pageCount : 0,
        totalRecords: (!totalRecords ? 0 : totalRecords),
        firstRowOnPage : 0,
        lastRowOnPage : 0,
        rowsPerPageOptions : (rowsPerPageOptions ||  [10,50,100])
    })
    /******callback & Effects******/

    const changePage = useCallback((goToPage) =>{
        var totalPage =  pagination.pageCount
        if(goToPage > 0 && goToPage <= totalPage){
            pagination.currentPage =  goToPage
            //setPagination(pagination)
            page(pagination)
        }
    }, [pagination, page])

    const onChangeRowPerPage = useCallback((newPageSize) => {
        let pages =  pagination
        pages= { ...pages, 
            pageSize :  newPageSize,
            currentPage : 1
        }
        setPagination(pages)
        page(pages);
    },[pagination, page])

    //#endregion

    /**** Effects ******/

    useEffect(() => {
        //Setting
        const pageSize  =  (!rows ? 10 : rows)
        const totalLines  = (!totalRecords ? 0 : totalRecords)

        setPagination( prev => {
            let  lastRow = currentPage * pageSize
            if(lastRow > totalLines) lastRow = totalLines

            const pageCount = Math.ceil(totalLines / pageSize)
            const firstRowOnPage = currentPage * pageSize - pageSize +  1
            const lastRowOnPage = lastRow

            const pag =  {...prev,
                pageSize,
                currentPage,
                pageCount,
                firstRowOnPage,
                lastRowOnPage,
                totalRecords :  totalLines
            }

            return pag;
        })

    }, [rows,totalRecords , currentPage])
    return (
        <React.Fragment>
            <div className={ paginatorClass }>
                <div 
                    className='d-flex 
                        flex-sm-row 
                        flex-column align-self-center justify-content-between'>
                    {/* Template paginator */}
                    <Pagination size="sm">
                        <PaginationItem disabled={pagination.currentPage === 1}>
                            <PaginationLink onClick={ ()=> { changePage(1) }}> {"<<"} </PaginationLink>
                        </PaginationItem>
                        <PaginationItem disabled={pagination.currentPage === 1}>
                            <PaginationLink onClick={ ()=> {changePage(pagination.currentPage - 1)}}> ← </PaginationLink>
                        </PaginationItem>
                        <PaginationItem >
                                <PaginationLink  onClick={ ()=> {changePage(280)}}> Página{" "}<strong>{pagination.currentPage } de {pagination.pageCount} </strong> </PaginationLink>
                        </PaginationItem>
                        <PaginationItem disabled={pagination.currentPage === pagination.pageCount}>
                            <PaginationLink  onClick={ ()=> {changePage(pagination.currentPage + 1)}}> → </PaginationLink>
                        </PaginationItem>
                        <PaginationItem disabled={pagination.currentPage === pagination.pageCount}>
                            <PaginationLink onClick={ ()=> {changePage(pagination.pageCount)}}> {">>"} </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                    <div className="flex-grow-1">
                        <Row>
                            <Col lg={12}>
                                <div className="d-flex flex-row align-self-center justify-content-end">
                                     {/* page report template */}
                                    <div className="me-2 align-self-center">
                                        Mostrando <b>{pagination.firstRowOnPage}</b> a <b>{pagination.lastRowOnPage}</b> de <b>{pagination.totalRecords}</b>
                                    </div>
                                    {/* Rows per page */}
                                    <select 
                                        className="form-select form-select-sm" 
                                        style={{maxWidth: "5rem"}}
                                        aria-label="form-select-sm select " 
                                        onChange= {(event) => {
                                            const { target } =  event
                                            onChangeRowPerPage(target.value) }}
                                        value={ pagination.pageSize }>
                                        {(rowsPerPageOptions || []).map(pag=> {
                                            return (<option  value={pag} key={pag}>{pag}</option>)
                                        })}
                                        <option value={pagination.totalRecords}>Todo</option>
                                    </select>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CustomPaginator;
