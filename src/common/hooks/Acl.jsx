import { toast } from "react-toastify";
import { useProfile } from "./UserProfile";
import { MessageTitle } from "../constants";
import { OperacionUsuario } from "../constants"

const useAcl = () => {
    const { userProfile } = useProfile();
    const { authList } = useAuthSystem();
    
    /** Consulta de Acceso ACL - Function
     * @param { OperacionUsuario } operation - Enum de Tipo de Operación de usuario.
     * @param { String }  resource - Recurso a válidar, componenente, control
     * @param { Boolean }  showMessage - Mostrar mensaje de error de autorización
     * @return { Boolean }  Acceso Permitido
     */
    const IsGranted = (operation, resource, showMessage = true) =>{
        var isValid =  false
        
        const warningnotify = () => toast.error(MessageTitle.MSG_NO_AUTORIZADO,{ 
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: false, 
            closeOnClick: false 
        });

        if(userProfile.usr_superusuario){
            isValid = true;
        }else{

            isValid =  true; 
            // authList.some(aus =>
            //     aus.aus_llave.toUpperCase() === resource.toUpperCase()
            //     && aus.acs_nombre.toUpperCase() === operation.toUpperCase());
        }

        if(!isValid && showMessage)
            warningnotify();
        

        return isValid;
    }

    return { IsGranted, IsRestricted }
}

export default useAcl;
export { OperacionUsuario }