import { Button } from "reactstrap"

/**Buttons Save on Grid - Grid
 * @param { String } showSaveButton -  Mostrar Boton Guardar => True
 * @param { String } showCancelButton  - Mostrar Boton Cancelar => True
 * @param { Event } onSave - Evento Submit onSave
 * @param { Event } onCancel  - Evento Cancelar
 */
const ButtonGridSave = ({
    showSaveButton = true,
    showCancelButton =  true,
    onSave = () => {},
    onCancel = () => {},
}) => {


    return(
        <>
            <ul className="list-inline hstack  mb-0">
                {showSaveButton && <li className="list-inline-item me-1">
                    <Button
                        color="light"
                        size="sm"
                        id={"item-edit-button"}
                        onClick={ onSave }>
                        <i className="ri-check-line  label-icon align-middle text-primary"></i>
                    </Button>
                </li>}
                {showCancelButton && <li>
                        <Button
                            color="light"
                            size="sm"
                            id={"item-delete-button"}
                            onClick={ onCancel } >
                            <i className="ri-close-line label-icon align-middle text-danger"></i>
                        </Button>
                
                </li>
                }
            </ul>
        </>
    )
}

export default ButtonGridSave;