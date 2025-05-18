import { useProfile } from "@/common/hooks/UserProfile";
import { setAuthorization } from "@/helpers/api_helper";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";


const AuthProtected = (props) => {
    const dispatch = useDispatch();
    const { userProfile, loading, token , isLockScreen } = useProfile();
    
    useEffect(() => {
      if (userProfile && !loading && token) {
        setAuthorization(token);
      } else if (!userProfile && loading && !token) {
        dispatch(logoutUser());
      }
    }, [token, userProfile, loading, dispatch]);
  
    /*
      redirect is un-auth access protected routes via url
    */
    if (!userProfile.usr_codigo && !loading && !token) {
      return (
        <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
      );
    }else if (isLockScreen){
      return(<Navigate to={"/auth-lockscreen-cover" } />)
    }
  
    
    return <>{ props.children }</>;
  };


const AccessRouteAuth = ({ component: Component, ...rest }) => {

    // const { menuList, currentModulo } = useAuthSystem();
    // const { userProfile } = useProfile();
    // const acl =  useAcl();
    // let location = useLocation();
  
    // if(!userProfile.usr_superusuario){
    //   let isValidAuth =  acl.IsGranted(OperacionUsuario.VER, rest.path, false)
    //   if(rest.path.includes("dashboard"))
    //     isValidAuth =  true
  
    //   var authElement = menuList.some(men => 
    //     men.mes_codmod === currentModulo.mod_codigo && 
    //     men.mes_componente.toUpperCase() === rest.path.toUpperCase() && 
    //     men.mes_activo
    //   );
     
   
    //   if (rest.path === "*")
    //     return (<Navigate  to={{ pathname: "/auth-404-cover", state: { from: location } }}  state ={ { i: 3}}/>)
    //   else if(( !authElement && !isValidAuth) && rest.path !== "/" && rest.path !== "/dashboard")
    //     return (<Navigate  to={{ pathname: "/auth-404-alt", state: { from: location } }} />)
    // }
    return (Component)
  };


  export { AuthProtected, AccessRouteAuth };