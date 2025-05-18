import { API_URL, APP_ID, APP_KEY }  from "@/config"
import { APIClient } from "../api_helper";
import * as url from "../url_helpers/documentManagement_url";

const api = new APIClient(API_URL, APP_ID, APP_KEY);

export const getDirectoryFileSystemAsync = (path = "") => api.get(`${url.GET_DIRECTORY_FILE_SYSTEM}`,{ 
    params: { basePath: path ?? ""}
});
export const getFileByDirectoryPathAsync = (path) => api.get(`${url.GET_FILE_BY_DIRECTORY_PATH}`, { 
    params: { basePath: path ?? ""},
    responseType: 'blob' 
})


export const getInvoiceDocumentByCodeAsync = (code) => api.get(`${url.GET_INVOICE_DOCUMENT_BY_CODE}/${code}`);
export const getAllDocumentPagedAsync = ({ page, pageSize, fechaDesde, fechaHasta, docID, sucID, appID, searchTerm }) => 
    api.get(url.GET_ALL_DOCUMENT_PAGED, {
        params: {
            page,
            pageSize,
            fechaDesde,
            fechaHasta,
            docID : docID ?? "",
            sucID: sucID ?? "",
            appID: appID ?? "",
            searchTerm : searchTerm ?? ""
        }
});