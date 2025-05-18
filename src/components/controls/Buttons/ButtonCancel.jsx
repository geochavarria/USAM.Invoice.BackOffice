import { Button } from "reactstrap"

/**Boton cancelar - Button
 * @param { String } id Id de element default null
 * @param { String } size  - Tamaño de Boton {sm, md, lg}
 * @param { Boolean } size  - Tamaño de Boton {sm, md, lg}
 * @param { String } title - Text a mostrar
 * @param { Event } onClickEvent Evento a ejecutar
 */
 const ButtonCancel = ( { 
    id, 
    size = "",
    disabled =  false,
    title, 
    onClickEvent 
}) => {
    const elementId =  ( id || ("btn-" + Math.random().toString(16).slice(2)))
    return (
        <>
            <Button color="danger" 
                size={size}
                id={ elementId }
                disabled = { disabled }
                className="btn-label waves-effect waves-light btn-default-size" 
                outline onClick={ onClickEvent }>
                <i className="bx bx-x label-icon align-middle fs-16 me-2"/>
                {title || "Cancelar"}
            </Button>
        </>
    )
}
export default ButtonCancel