import { API_URL, APP_ID, API_KEY }  from "@/config"
import { APIClient } from "../api_helper";
import * as url from "../url_helpers/admin_url";

const api = new APIClient(API_URL, APP_ID, API_KEY);





/* :::::::::::::::::::: CONFIGURACION :::::::::::::::::::::::*/
export const getAllParametroAsync = () => api.get(`${url.GET_ALL_PARAMETERS}/`);
export const getParametroByCodeAsync = (ID) => api.get(`${url.GET_PARAMETER_BY_CODE}/${ID}`);
export const postParametroUpsertAsync = ({ code, data}) => api.create(`${url.POST_PARAMETER_UPSERT}/${code}`,data );

export const getAllAplicacionAsync = () => api.get(`${url.GET_ALL_APPLICATIONS}/`);
export const getAllPuntoVentaAsync = () => api.get(`${url.GET_ALL_POINT_OF_SALES}/`);
export const getAllCajerosAsync = () => api.get(`${url.GET_ALL_CASHIERS}/`);
export const getAllSocioNegocioAsync = () => api.get(`${url.GET_ALL_SOCIO_NEGOCIO}/`);

/* :::::::::::::::::::: CATALOGOS ::::::::::::::::::::::::::*/
export const getAllCatalogoCategoryAsync = async() => (catalogoList);
export const getAllCatalogoByTypeAsync = (oFileType) => api.get(`${url.GET_ALL_CATALOGO_BY_TYPE}/${oFileType}`);
export const getAllTipoDocumentoAsync = () => api.get(`${url.GET_ALL_TIPO_DOCUMENTO}`);
export const getAllActividadEconomicaGroupedAsync = () => api.get(`${url.GET_ALL_ACTIVIDAD_ECONOMICA_GROUPED}`);
export const getMunicipioByDeptoIDAsync = (deptoID)  => api.get(`${url.GET_MUNICIPIO_BY_DEPTO}/${deptoID}`);
export const getDistritoByMunicipioIDAsync = (deptoID, munID)  => api.get(`${url.GET_DISTRITO_BY_MUN_ID}/${munID}/${deptoID}`);

/* :::::::::::::::::::: EMPRESA ::::::::::::::::::::::::::*/
//Empresa
export const getAllEmpresaAsync = (ID = 0) => api.get(`${url.GET_ALL_EMPRESA}`);
export const getEmpresaByCodeAsync = (ID = 0) => api.get(`${url.GET_EMPRESA_PERFIL_BY_CODE}/${ID}`);
export const getSucursalByEmpIDAsync = (ID = 0) => api.get(`${url.GET_SUCURSAL_BY_EMPRESA_CODE}/${ID}`);
//Api Managers
export const postAPIKeyUpsertAsync = ({ code, data}) => api.create(`${url.POST_API_KEY_UPSERT}/${code}`,data );
export const getAllAPIKeysAsync = () => api.get(`${url.GET_ALL_API_KEYS}/`);
export const getAPIKeysBySucAsync = (sucID) => api.get(`${url.GET_API_KEYS_BY_SUC}/${sucID}`);
