import { Button } from "reactstrap"

/** Boton Nuevo - Button
 * @param { String } id Id de element default null
 * @param { String } title Text a mostrar
 * @param { Event } onClickEvent Evento a ejecutar
 */
 const ButtonNew = ({ id, title , onClickEvent }) => {

    const elementId =  (id || ("btn-" + Math.random().toString(16).slice(2)))

    return(
        <>
            <Button
                id={ elementId }
                color="primary"
                className="btn-label waves-effect waves-light"
                onClick={ onClickEvent } >
                    <i className="ri-add-line label-icon align-middle fs-16 me-2"></i>
                { title }
            </Button>
        </>
    )
}

export default ButtonNew