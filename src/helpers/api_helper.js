
import { API_URL  } from "@/config.js"
import axios from "axios";

const rootPath =  process.env.NODE_ENV === "development" ? "" : ".";
// default
axios.defaults.baseURL = API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

class APIClient {
    /**
     * Fetches data from given url
    */
    constructor(baseURL, api = "", key=""){
        this.instanceAxios = axios.create({
                baseURL: `${baseURL}` ,
                headers:  { 
                'Authorization' : axios.defaults.headers.common["Authorization"],
                'X-API-Key' : key,
                'Content-Type': 'application/json'
            },
        });
  
      this.instanceAxios.interceptors.request.use(request => {
        const accessToken = axios.defaults.headers.common["Authorization"]
        if (accessToken) {
            request.headers['Authorization'] = `${accessToken}`;
        }
        return request;
    }, error => {
        return Promise.reject(error);
    });
  
    // intercepting to capture errors
    this.instanceAxios.interceptors.response.use(
        function (response) {
            return response.data ? response.data : response;
        },
        function (responseError) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            let error  = ( responseError.response || { status : 0 })
            // Cause this function to trigger
            let message;
            let text = undefined
  
            switch (error.status) {
                case 500:
                    text = undefined
                    if(error.data){
                        if(typeof error.data === "string")
                            text = error.data
                        else if(typeof error.data === "object"){
                            const { data } =  error
                            const apiMessage = data?.message || ""
                            text =  apiMessage 
                        }
                    }
                    message = text || " Internal Server Error: ";
                break;
                case 401:
                    message = "Invalid credentials";
                    document.location.href=`${rootPath}/logout`;
                break;
                case 404:
                    text = undefined
                    if(error.data)
                        if(typeof error.data === "string")
                            text = error.data
                    message = text || "!Lo siento! La información que estas buscando no fue encontrada";
                break;
                default:
                    message = ((error  && error.errors) || error ) || responseError
            }
  
            if(error.status === 0){
                message = "[API] Error de Conexión  "
            }
  
            return Promise.reject(message);
        }
      );
    }
  
    get = (url, params) => {
      let response;
      let paramKeys = [];
  
      if (params) {
        const objParams  = params?.params || {}
        Object.keys(objParams).map(key => {
          paramKeys.push(key + '=' + objParams[key]);
          return paramKeys;
        });
  
        // const queryString = (paramKeys && paramKeys.length) ? paramKeys.join('&') : "";
        response = this.instanceAxios.get(`${url}`, params);
      } else {
        response = this.instanceAxios.get(`${url}`, params);
      }
  
      return response;
    };
    /**
     * post given data to url
     */
    create = (url, data) => {
      
      return this.instanceAxios.post(url, data);
    };
  
    /**
     * Updates data
     */
    patch = (url, data) => {
      return this.instanceAxios.patch(url, data);
    };
  
    /**
     * Updates data
     */
    update = (url, data, config = {}) => {
      return this.instanceAxios.patch(url, data, { ...config });
    };
  
    put = (url, data) => {
      return this.instanceAxios.put(url, data);
    };
    
    /**
     * Delete
    */
    delete = (url, config) => {
      return this.instanceAxios.delete(url, { ...config });
    };
}
  
  
const getLoggedinUser = () => {
    const user = sessionStorage.getItem("authUser");
    if (!user) {
    return null;
    } else {
    return JSON.parse(user);
    }
}

export { APIClient, setAuthorization, getLoggedinUser };