import { setAuthorization } from "@/helpers/api_helper";
import { apiError, logoutUserSuccess, reset_login_flag, setLoading, setLoginSuccess } from "./reducer";
import { APP_AUTH, BASE_PATH, STORAGE } from "@/config";
import { postLoginJwtAsync } from "@/helpers/backend_helpers/authenticate_helper";

export const loginUser = (user, history) => async(dispatch) => {
    try {
      let response;
      dispatch(setLoading({}));


      if (APP_AUTH.DEFAULT === "jwt") {
        
        response = await postLoginJwtAsync({
          usuario : user.username,
          password: user.password
        });
  
      } else{
        throw new Error("[Login]: Tipo de sesion no habilitado => Valid[JWT]")
      }
      
      // :::::: Setting  Token Auth :::::: //
      const { data } =  response
      const { token, usuario }  = data
      setAuthorization(token || null)
  
      // :::::: Commit  USER :::::: //
      dispatch(setLoginSuccess({
        data: {
          usuario,
          token
        }
      }));
       // :::::: Update  Current Company :::::: //
       //dispatch(onUpdateCurrentCompany(user.regional))
  
      // :::::: List of Comapanies :::::: //
    //   const { regionalList  :  companyList } =  response
    //   dispatch(setCompanyListCommit({
    //     data : companyList 
    //   }))
  
     window.location.href = BASE_PATH +  "/dashboard"
    } catch (error) {
      dispatch(apiError(error));
    }
  };


  export const logoutUser = () => async (dispatch) => {
    try {
      localStorage.removeItem(`persist:${STORAGE.PERSIST_KEY}`);
      dispatch(logoutUserSuccess(true));
    } catch (error) {
      dispatch(apiError(error));
    }
  };
  

  export const resetLoginFlag = () => async (dispatch) =>{
    try {
      const response = dispatch(reset_login_flag());
      return response;
    } catch (error) {
      dispatch(apiError(error));
    }
  };