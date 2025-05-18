/** Indicador de estado booleano - Link
 * @param {Boolean} status - Estado booleano
 * @param {String} customClass - Clase personalizada/Container
 * @returns Badge success/danger
 */
const StatusColLinkBool = ({ status,  customClass }) =>{
    return(
        <>
            <Link to="/#" className={`badge badge-soft-${ status ? "success" : "danger" } ${customClass}`}>
                {status ? "Activo" : "Inactivo"} 
                <i className= {`ri-arrow-right-${status ? "up-line" : "down-line"} align-bottom`}/>
            </Link>
        </>
    )
}

export default StatusColLinkBool;