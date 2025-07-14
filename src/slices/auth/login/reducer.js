import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    error: null, // for error message
    loading: false,
    token: null,
    isUserLogout: false,
    isLockScreen: false,
    errorMsg: false, // for error
};


const loginSlice = createSlice({
    name: "Login",
    initialState,
    reducers: {
      apiError(state, action) {
        state.error = action.payload;
        state.loading = true;
        state.isUserLogout = false;
        state.isLockScreen =  false;
        state.errorMsg = true;
      },

      setLoading(state, action){
        return {...state, 
          loading : true,
        }
      },
  
      setLoginSuccess(state, action) {
        const { payload } = action;
        
        console.log(payload)
        return {...state,
          user : payload.user,
          token : payload.token,
          loading : false,
          errorMsg : false,
          isLockScreen : false
        }
        
      },
  
      logoutUserSuccess(state, action) {
        state.isUserLogout = true;
        state.token =  null;
      },
  
      lockScreenSuccess(state, action) {
        state.isLockScreen = true
      },
  
      reset_login_flag(state) {
        state.error = null
        state.loading = false;
        state.errorMsg = false;
      }
    },
  });
  
export const {
    apiError,
    setLoginSuccess,
    setLoading,
    logoutUserSuccess,
    reset_login_flag,
    lockScreenSuccess,
} = loginSlice.actions

export default loginSlice.reducer;