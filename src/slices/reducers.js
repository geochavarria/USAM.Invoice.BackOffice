import { combineReducers } from "redux";

import filterSlice from "./filters/filterSlice";



const rootReducer = combineReducers({
    filter: filterSlice,
});


export default rootReducer;