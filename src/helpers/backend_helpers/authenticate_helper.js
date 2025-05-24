import { APP_AUTH } from "@/config";
import { APIClient } from "../api_helper";


const api = new APIClient(APP_AUTH.API_URL, "", APP_AUTH.API_KEY);
export const postLoginJwtAsync = data => api.create("Core/Auth/Login", data);