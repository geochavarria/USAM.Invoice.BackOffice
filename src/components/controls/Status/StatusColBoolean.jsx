import React from "react"

/** Indicador de estado booleano - Badge
 * @param {Boolean} status - Estado booleano
 * @param {String} custom - Texto Personalizados
 * @param {String} customClass - Clase personalizada/Container
 * @returns Badge success/danger
 */
const StatusColBoolean = ({ status, custom = null , customClass = "" }) => {
    return (
        <React.Fragment>
            <span className={ `${customClass}` }> 
            { status ? 
                <span className="badge bg-success-subtle text-success fs-10"> { custom || "Activo" }</span>
                : <span className="badge bg-danger-subtle text-danger fs-10"> { custom || "Inactivo" }</span>
            }</span>
        </React.Fragment>
        
    )
}
export default StatusColBoolean