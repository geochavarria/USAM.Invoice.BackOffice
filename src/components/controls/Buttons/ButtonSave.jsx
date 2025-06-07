import { Button, Spinner } from "reactstrap"

/**Boton Guardar - Button
 * @param { String } id Id de element default null
 * @param { String } size  - Tamaño de Boton {sm, md, lg}
 * @param { Boolean } size  - Tamaño de Boton {sm, md, lg}
 * @param { String } title - Text a mostrar
 * @param { Event } onClickEvent Evento a ejecutar
 * @param { Boolean } loading  - Mostrar Spinner Cargando
 * @param { Boolean } editMode  - Modo de Boton edicion {Actualizar}
 */
const ButtonSave = ({ 
    id, 
    size="",
    disabled = false,
    title, 
    onClickEvent, 
    loading, 
    editMode 
}) => {
    const elementId =  ( id || ("btn-" + Math.random().toString(16).slice(2)))
    return(
        <>
            <Button type="button" 
                size={size}
                disabled={ disabled || loading }
                id={ elementId }
                color="primary" 
                className="btn-label btn-load waves-effect waves-light d-flex"
                onClick={ onClickEvent } >
                    <div className="label-icon">
                        { loading  ? <Spinner size="sm" className="flex-shrink-0"> Loading... </Spinner>
                        : <i className={editMode ? "bx bxs-edit label-icon align-middle fs-16 me-2" : "bx bxs-save label-icon align-middle fs-16 me-2"}/>}
                    </div>
                    { title || (editMode ? "Actualizar" : "Guardar" )}
            </Button>
        </>
    )
}

export default  ButtonSave;