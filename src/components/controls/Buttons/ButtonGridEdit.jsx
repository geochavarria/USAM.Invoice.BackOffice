import { Button } from "reactstrap"

/**Button Row Edit - Grid
 * @param { String } showEditButton -  Mostrar Boton Editar => True
 * @param { String } showDeleteButton  - Mostrar Boton Eliminar => True
 * @param { Object } otherButton  - Componente para mas botones {<li></li>}
 * @param { Event } onEdit - Evento Editar
 * @param { Event } onDelete  - Evento Eliminar
 */
const ButtonGridEdit = ({
    showEditButton = true,
    showDeleteButton =  true,
    iconDeleteButton = "fa fa-trash-alt ",

    disabledDeleteButton =  false  ,
    otherButton = undefined,
    onEdit = () => {},
    onDelete = () => {},
}) => {


    return(
        <>
            <ul className="list-inline hstack  mb-0">
                {showEditButton && <li className="list-inline-item me-1">
                    <Button
                        color="light"
                        size="sm"
                        id={"item-edit-button"}
                        onClick={ onEdit }>
                        <i className="fa fa-edit  text-primary"></i>
                    </Button>
                </li>}
                {showDeleteButton && <li>
                        <Button
                            color="light"
                            size="sm"
                            disabled={disabledDeleteButton}
                            id={"item-delete-button"}
                            onClick={ onDelete } >
                            <i className={iconDeleteButton +" text-danger" }></i>
                        </Button>
                
                </li>
                }
                {otherButton}

            </ul>
        </>
    )
}

export default ButtonGridEdit