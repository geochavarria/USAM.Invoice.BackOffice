import React from "react";


const BrandsDataTable = ({ data }) => {
    
    return(<React.Fragment>
        <table className="default-table manage-job-table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                </tr>
            </thead>
            <tbody>
                { (data || []).map((_item, index)=> (
                    <tr key={index}>
                        <td> { index + 1 }</td>
                        <td> <a href="#" style={{ textTransform: "none"}}>{ _item.abreviado } </a> </td>
                        <td> { _item.nombre }</td>
                        <td> { _item.correo } </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </React.Fragment>
    )
}

export default BrandsDataTable;