import { combineReducers } from "redux";

import filterSlice from "./filters/filterSlice";

// Authentication
import LoginReducer from "./auth/login/reducer";

const rootReducer = combineReducers({
    filter: filterSlice,
    Login: LoginReducer
});


export default rootReducer;