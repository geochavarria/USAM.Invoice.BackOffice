import { API_URL, APP_ID, APP_KEY }  from "@/config"
import { APIClient } from "../api_helper";
import * as url from "../url_helpers/transmision_url";

const api = new APIClient(API_URL, APP_ID, APP_KEY);

export const getVerifyDocumentByCodeAsync = (code) => api.get(`${url.VERIFY_DOCUMENT_BY_CODE}/${code}`);
