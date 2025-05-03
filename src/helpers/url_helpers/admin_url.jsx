export const GET_ALL_EMPRESA= "/Administracion/Empresa/GetAll"
export const GET_EMPRESA_PERFIL_BY_CODE = "/Administracion/Empresa/GetByID";
export const GET_SUCURSAL_BY_EMPRESA_CODE = "/Administracion/Sucursal/GetByEmp";

export const GET_ALL_API_KEYS = "/Administracion/APIManager/GetAll"
export const GET_API_KEYS_BY_SUC = "/Administracion/APIManager/GetBySuc"
export const POST_API_KEY_UPSERT = "/Administracion/APIManager"


/*:::::::::::: CONFIG :::::::::::::: */
export const GET_ALL_PARAMETERS = "/Parametrizacion/Sistema/GetAll"
export const GET_PARAMETER_BY_CODE = "/Parametrizacion/Sistema/Get"
export const POST_PARAMETER_UPSERT = "/Parametrizacion/Sistema"


export const GET_ALL_APPLICATIONS = "/Parametrizacion/Aplicacion/GetAll"
export const GET_ALL_POINT_OF_SALES = "/Parametrizacion/PuntoVenta/GetAll"
export const GET_ALL_CASHIERS = "/Parametrizacion/Cajero/GetAll"
export const GET_ALL_SOCIO_NEGOCIO = "/Parametrizacion/SociosNegocio/GetAll"

/*::::::::: CATALOGOS :::::::::::::: */
export const GET_MUNICIPIO_BY_DEPTO = "/Catalogo/Municipio/GetByDepto"
export const GET_DISTRITO_BY_MUN_ID = "/Catalogo/Distritos/GetByMun"
export const GET_ALL_CATALOGO_BY_TYPE = "/Catalogo/GetAll"
export const GET_ALL_TIPO_DOCUMENTO = "/Catalogo/TipoDocumento/GetAll";
export const GET_ALL_ACTIVIDAD_ECONOMICA_GROUPED = "/Catalogo/Actividad/Grouped";
