import React from "react"

/**
 * Mensaje de datos vacios
 * :: src\Components\Common\TableSearchNoResult.js
 * @param {Array} data Datos de tabla 
 * @returns 
 */
const TableSearchNoResult = ({ 
    data, 
    message = ""
}) => {
    return (
        <React.Fragment>
            {(data && data.length === 0) && <tr>
                <td role="alert" className="text-center " colSpan={"100%"}>
                    <div className="alert alert-danger py-0" role="alert">
                        No se encontraron registros. { message }
                    </div>
                </td>
            </tr>}
        </React.Fragment>
    )
}

export default TableSearchNoResult
