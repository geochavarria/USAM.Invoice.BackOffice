
import React, { useEffect, useState } from "react"

/** Catch Error  - Component & Function
 * @param {Boolean} Show - Mostrar Modal
 */
const CatchErrorMessage  = (innerException) => {

    var emptyResult = {
        message  : "",
        details :  "" ,
        complete : ""
    }
    if(!innerException) return emptyResult;

    //object => innerMessage
    const decodeError_fx = (object) => {
        var textDetails = ""
        if(Array.isArray(object))
        {
            //Array Errors
            var arrayKeys =  Object.keys(object);
            arrayKeys.forEach(_item => {
                textDetails += `${!isNaN(_item) ? "*" :  _item} => ${decodeError_fx(object[_item])}`
            })
        }else if(typeof object == "object" && object !== null){
            
            //object keys
            var objectKeys = Object.keys(object)
            objectKeys.forEach(_item => {
                // if(_item !== "$[0]"  ){
                //     textDetails += `${decodeError_fx(object[_item])}`
                // }
                switch(_item){
                    case "message":
                        textDetails += `${!isNaN(_item) ? "" : _item} => ${decodeError_fx(object[_item]) } \n`;
                        break;
                    case "extensions":
                       
                        textDetails += `* ${decodeError_fx(object[_item])}`
                        break;
                    default: break;
                }

                
            });
        }else{
            textDetails += object
        }

        return textDetails
    }

    /*** Searching message error **/
    if(innerException.response || innerException.stack){
        //Response Error
        var { response } = innerException
        emptyResult.message = "Ocurrieron errores al obtener una respuesta"
       
       
        if(innerException.stack){
            emptyResult.details = innerException.message
        }else if(response.errors) {
            const { errors } = response
            emptyResult.details = decodeError_fx(errors)
        }
        
        else if(typeof response.data === "object" && response.data !== null){
            if(response.data.errors){
                var dataError =  response.data.errors
                emptyResult.details = decodeError_fx(dataError)
            }
        }else if(Array.isArray(response.data)){
            var objectData =  response.data
            emptyResult.details = decodeError_fx(objectData)
        }else if(response.data.trim()){
            var dataResponse =  response.data
            emptyResult.message = dataResponse
        }else if(response.status){
            //Status Error
            if(response.status === 401){
                emptyResult.details = "Parece que su sesión ha finalizado, favor cerrar sesión e iniciar nuevamente"
            }else if(response.status === 404){
                emptyResult.details = "El recurso no fue encontrado verifique la conexión a la API"
            }
        }
    }else if(innerException.request){
        //Request Error
        let appendText =  (innerException.request.response || "")
        
       
        const { data } = innerException
        if(data?.message)
            appendText =  data.message

        emptyResult.details = (appendText.trim() && appendText)  || " Verifique la conexión a internet y/o a los sub-sistemas relacionados a este sistema."
        emptyResult.message = (`Error : No se obtuvo una respuesta válida a la petición al servidor`)
    }else{
        //Conexión 
        emptyResult.details = "Fallo en la conexión en uno o mas servicios relacionados."
        emptyResult.message =  typeof innerException === "string" ? innerException.slice(0,249) : innerException.message || ""
    }

    return { ...emptyResult , 
        complete : `${emptyResult.message} \n ${ emptyResult.details }`}
}

const CustomCatchError = ({ innerException, life, onClean = () => {} }) =>{
    //InnerException : Detalle del contenido del mensajes
    //life (number - null): Delay en millisegundos para cerrar el mensaje automaticamente
    const [exception, setException] =  useState(innerException);
    const [errorMessage, setErrorMessage] = useState("")
    const [detailMessage, setDetailMessage] = useState("")

    //Control
    const [showMessage, setShowMessage] = useState(false);
    const [lifeTimeout, setLifeTimeout] = useState(!life? 5000 : life); //Default 3.5 seg

    useEffect(() => {
        setException(innerException)
        setLifeTimeout(!life? 3500 : life)
        if(!innerException) return;
        var catched =  CatchErrorMessage(innerException)
        setDetailMessage(catched.details)
        setErrorMessage(catched.message)
        //Show Alert
        setShowMessage(true)

    },[exception,errorMessage, innerException, life ])


    useEffect(()=> {
        const timer = setTimeout(()=> { 
            setShowMessage(false);
        }, lifeTimeout);

        
        return () => { 
            //Clean 
            if(onClean)
                onClean("")
            clearTimeout(timer)
            
        }
    })

    return (
        <React.Fragment>
            {showMessage && 
            <div className={ "alert alert-danger alert-dismissible fade " + (showMessage ? "show" : "") }   role="alert">
                <div className="alert-body">
                    <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                            <i className="fa fa-exclamation-triangle"></i>
                        </div>
                        <div className="flex-grow-1">
                            <h5 className="alert-heading">Uh oh, ¡Algo salió mal!</h5>
                            <p className="mb-0 " style={{ whiteSpace: "pre-wrap", wordBreak:"break-word" }}>{detailMessage.trim()}</p>
                        </div>
                    </div>
                </div>
                <div className="alert-content">
                    <p className="mb-0">{errorMessage}</p>
                </div>

                <button type="button" onClick={e => setShowMessage(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
        </React.Fragment>
    )
}


export default CustomCatchError;
export {CatchErrorMessage}