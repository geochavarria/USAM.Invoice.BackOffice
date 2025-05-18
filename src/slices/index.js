import { STORAGE } from "../config.js";
import { persistReducer, persistStore } from "redux-persist"
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt"
import rootReducer from "./reducers";


let persistConfig = {}


if(process.env.NODE_ENV === "development"){
    persistConfig = {
      key: STORAGE.PERSIST_KEY,
      storage
    }
}else{
    persistConfig = {
        key: STORAGE.PERSIST_KEY,
        storage,
        whiteList: ["System, Login"],
        transforms:[
            encryptTransform({
                secretKey : "$$ooPs_BUG2220",
                onError: function(err){}
            })
        ]
    }
}

const persistedReduce =  persistReducer(persistConfig, rootReducer);
const store = configureStore({ 
    reducer: persistedReduce, 
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }
    ),
    devTools: true 
});

const persistor =  persistStore(store)

const resetStore = async () => {
    await  persistor.purge();
    await persistor.flush();
    localStorage.removeItem(`persist:${STORAGE.PERSIST_KEY}`)
}

export { store, persistor, resetStore}