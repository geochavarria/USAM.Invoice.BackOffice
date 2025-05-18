
import React, { Fragment, useEffect, useState } from "react";
import SimpleBar from "simplebar-react";

import {
        useReactTable,
        getCoreRowModel,
        getFilteredRowModel,
        getPaginationRowModel,
        getSortedRowModel,
        getExpandedRowModel,
        flexRender,
    }  from  "@tanstack/react-table"
import { rankItem } from '@tanstack/match-sorter-utils';

import { CheckBoxFilter } from "./CheckBoxFilter";
import { GlobalFilter } from "./filters";

import  classNames from 'classnames';

import TableSearchNoResult from "./TableSearchNoResult";

import { SearchNoResult } from "./SearchNoResult";
import { Pagination, PaginationItem, PaginationLink, Table } from "reactstrap";




const CustomTable = ({
    size ="md",
    isMultipleSelection,
    
    isGlobalFilter,
    columns,
    customPageSize = 10,
    rowsPerPageOptions,
    data,
    startPage = 0,

    tableClass,
    theadClass,
    thClass = "",
    trClass = "",
    divClass,

    loading,
    showLengend = true,

    filtered :  defaultFilter,
    hiddenColumns = [],
    onSetRowSelected,

    children
}) => {

    //Control State
    const [rowSelection, setRowSelection] = React.useState({})
    const [expanded, setExpanded] = React.useState({})

    const [columnFilters, setColumnFilters] = useState ([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const fuzzyFilter = (row, columnId, value, addMeta) => {
        const itemRank = rankItem(row.getValue(columnId), value);
        addMeta({
            itemRank
        });
    return itemRank.passed;
    };

    const [firstRowOnPage, setFirstRowOnPage] = useState(0)
    const [lastRowOnPage, setLastRowOnPage] =  useState(0)

    /* ********* INIT Component *********** */
    const [ pagination, setPagination ] = useState({
        pageIndex: startPage, //initial page index
        pageSize: customPageSize, //default page size
    });

    const table = useReactTable({
        autoResetPageIndex: false,
        enableRowSelection :  isMultipleSelection,
        columns,
        data,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            expanded,
            columnFilters,
            globalFilter,
            pagination,
            rowSelection,
            columnVisibility: hiddenColumns.reduce((a, v) => ({ ...a, [v]: false}), {}) 
        },
        initialState:{
            //rowSelection: true,
            globalFilter,
            pagination
            // sortBy:[],
            // hiddenColumns: hiddenColumns
        },
        onExpandedChange: setExpanded,
        getSubRows: row => row.subRows,
        getExpandedRowModel: getExpandedRowModel(),
        

        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        

        onPaginationChange: setPagination,
    })

    const {
        getHeaderGroups,
        getCanPreviousPage,
        getCanNextPage,
        getPageOptions,
        setPageIndex,
        nextPage,
        previousPage,

        setPageSize,
        getPreFilteredRowModel,

        //RowsOperaction
        getSelectedRowModel,
        getRowModel,
      } = table;


    useEffect(()=>  {
        const { pageIndex, pageSize }  = pagination
        const createPaginationDetails = () => {
            var currentData =  data;
            var newFirst =  data.length > 0 ? (pageIndex * pageSize + 1) : 0
            var newLast = 0

            if(currentData.length > 0){
                    newLast =   (pageIndex + 1) * pageSize
                    if(newLast > currentData.length)
                        newLast = currentData.length
            }
            setFirstRowOnPage(newFirst)
            setLastRowOnPage(newLast)
        }
        createPaginationDetails()
    },[pagination, data])

    useEffect(()=> {
        setColumnFilters(defaultFilter || [])
    }, [defaultFilter])

    useEffect(() => {
        (customPageSize) && setPageSize((customPageSize));
    }, [customPageSize, setPageSize]);


    useEffect(()=> {
        if(isMultipleSelection && onSetRowSelected){
            const { flatRows : selectedRowModel} = getSelectedRowModel()
            const selectedRows = selectedRowModel.map((_row) => _row.original)
            onSetRowSelected(selectedRows)
        }
     //eslint-disable-next-line 
     },[ isMultipleSelection, rowSelection])

    return (
        <React.Fragment>
            {(children || isGlobalFilter) && <div className="row py-2 mx-0 my-1 border border-dashed border-end-0 border-start-0">
                {isGlobalFilter && <div className="col" style={{ minWidth: "8rem"}}>
                    <GlobalFilter
                        preGlobalFilteredRows = { getPreFilteredRowModel().rows }
                        onChange = { setGlobalFilter }
                        filter = { globalFilter || "" } />
                </div>}
                {children}
            </div>}
            <SimpleBar autoHide={false} className="simplebar-track-primary simplebar-scrollable-x" id={"simpleBarContent"}>
                <div className={divClass +" mb-0"} >
                    <Table hover className={tableClass}>
                        <thead className={theadClass}>
                            {getHeaderGroups().map((headerGroup, index) => (
                                <tr key = { headerGroup.id } className ={ `${trClass}` }>

                                    {/* Check Column */}
                                    { isMultipleSelection &&
                                    <th  key="header_selected"
                                        
                                        className={ `${thClass}` } >
                                        <CheckBoxFilter
                                            checked={ table.getIsAllRowsSelected()}
                                            indeterminate={ table.getIsSomeRowsSelected()}
                                            onChange={ table.getToggleAllRowsSelectedHandler()}/>
                                    </th>}
                                    {headerGroup.headers.map((header) => {

                                        if(!header.column.getIsVisible()){
                                            return null;
                                        }
                                        return (<th  key={header.id}
                                            style={{ 
                                                width: `${header.getSize()}px`, 
                                            }}
                                            className={ `${thClass}` } {...{
                                            onClick: header.column.getToggleSortingHandler(),
                                            }}>
                                                {header.isPlaceholder ? null : (
                                                <React.Fragment>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}

                                                    {{
                                                        asc: '▲',
                                                        desc: '▼',
                                                        all : '↓↑'
                                                    }[header.column.getIsSorted() || (header.column.getCanSort() ? "all" : null)] ?? null }

                                                    { header.column.getCanFilter() ? (
                                                        <div>
                                                            {/* <Filter column={header.column} table={table} /> */}
                                                        </div>
                                                    ) : null}

                                                    {header.column.tooltipText}
                                                </React.Fragment>
                                                )}
                                        </th>)
                                    })}
                                </tr>
                            ))}
                        </thead>

                        <tbody className="text-body">

                            {getRowModel().rows.map((row) => {
                                return (
                                    <Fragment key={ row.id }>
                                        <tr
                                            className={classNames({
                                                "bg-primary-subtle" : row.getIsSelected()
                                            })}>
                                            { isMultipleSelection &&
                                                <td
                                                    className={ `${thClass}` } >
                                                        <CheckBoxFilter {...{
                                                            checked : row.getIsSelected(),
                                                            disabled : !row.getCanSelect(),
                                                            indeterminate: row.getIsSomeSelected(),
                                                            onChange : row.getToggleSelectedHandler() }} />
                                                </td>}

                                            {row.getVisibleCells().map((cell) => {
                                                return (
                                                <td key={cell.id}  className={classNames({
                                                    "fw-bold" : row.getIsExpanded()
                                                })}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                                );
                                            })}
                                        </tr>
                                    </Fragment>
                                )
                            })}

                            {!loading &&  <TableSearchNoResult data={ getRowModel().rows } /> }
                        </tbody>
                    </Table>
                    {loading && <SearchNoResult />}
                </div>
            </SimpleBar>
            <div className='d-flex flex-column flex-md-row align-self-center fs-8 justify-content-between px-4 mt-2'>
                <Pagination listClassName=" mb-0" size={size}>
                    <PaginationItem disabled={ pagination.pageIndex === 0 }>
                        <PaginationLink onClick={ ()=> { setPageIndex(0) }}> {"<<"} </PaginationLink>
                    </PaginationItem>
                    <PaginationItem disabled={ !getCanPreviousPage() }>
                        <PaginationLink onClick={ ()=> previousPage() } > ← </PaginationLink>
                    </PaginationItem>
                    <PaginationItem >
                        <PaginationLink> {" "}<strong>{ pagination.pageIndex + 1 } de {getPageOptions().length} </strong> </PaginationLink>
                    </PaginationItem>
                    <PaginationItem disabled={!getCanNextPage()}>
                        <PaginationLink  onClick={()  => nextPage()  }> → </PaginationLink>
                    </PaginationItem>
                    <PaginationItem disabled={ (pagination.pageIndex + 1) === getPageOptions().length }>
                        <PaginationLink onClick={ ()=> setPageIndex( getPageOptions().length - 1)}> {">>"} </PaginationLink>
                    </PaginationItem>
                </Pagination>

                {/* Legends */}
                <div className={"flex-grow-1  " +  (showLengend ? "" : "d-none")  } >
                    <div className="row">
                        <div className="col col-lg-12" >
                            <div className="d-flex flex-row align-self-center justify-content-end">
                                {/* page report template */}
                                <div className={ "me-2 align-self-center " + (size ="sm" ? "fs-12" : "") }>
                                    Mostrando <strong>{ firstRowOnPage }</strong> a <strong>{ lastRowOnPage }</strong> de <strong>{ data.length }</strong>
                                </div>

                                {/* Rows per page */}
                                { <select 
                                    className="form-select form-select-sm" style={{maxWidth: "5rem"}}
                                    value={pagination.pageSize}
                                    onChange={(evt) => setPageSize(Number(evt.target.value))}
                                    >
                                    {(rowsPerPageOptions || [customPageSize,50,100]).map(pag=> {
                                        return (<option  value={pag} key={pag}>{pag}</option>)
                                    })}
                                    <option value={data.length}>Todo</option>
                                </select> }
                            </div>
                        </div>
                    </div >
                </div>
            </div>

        </React.Fragment>
    )
}


export default CustomTable