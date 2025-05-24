import { API_URL, APP_ID, APP_KEY }  from "@/config"
import { APIClient } from "../api_helper";
import * as url from "../url_helpers/dashboards_url";

const api = new APIClient(API_URL, APP_ID, APP_KEY);


export const getDashboardDocumentResumeStatusAsync = () => api.get(`${url.GET_DASHBOARD_DOCUMENT_RESUME_STATUS}`);
export const getDashboardDocumentResumeYearAsync = () => api.get(`${url.GET_DASHBOARD_DOCUMENT_RESUME_YEAR}`);
export const getDashboardDocumentResumeByAppAsync = () => api.get(`${url.GET_DASHBOARD_DOCUMENT_RESUME_APP}`);
export const getDashboardDocumentResumeByTypeAsync = () => api.get(`${url.GET_DASHBOARD_DOCUMENT_RESUME_TYPE}`);