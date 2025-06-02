import React from "react";


const BrandsDataTable = ({ 
    data ,
    onRowClick = () => {}
}) => {
    

    const btnEdit_onClick = (e) => {
        onRowClick(e)
    }


    return(<React.Fragment>
        <table className="default-table manage-job-table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th style={{width: "2rem"}}></th>
                </tr>
            </thead>
            <tbody>
                { (data || []).map((_item, index)=> (
                    <tr key={index}>
                        <td> { index + 1 }</td>
                        <td> <a href="#" style={{ textTransform: "none"}}>{ _item.abreviado } </a> </td>
                        <td> { _item.nombre }</td>
                        <td> { _item.correo } </td>
                        <td>
                            <button className="btn btn-light btn-sm" 
                                onClick={e=> btnEdit_onClick({
                                originalEvent: e,
                                data: _item,
                                index
                            })}>
                                <span className="fa fa-pencil-alt text-primary"></span>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </React.Fragment>
    )
}

export default BrandsDataTable;