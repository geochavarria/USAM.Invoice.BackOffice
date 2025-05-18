import { createSelector } from "@reduxjs/toolkit";
import { useState } from "react";
import { useSelector } from "react-redux";

/** Perfil de usuario */
const useProfile = () => {
    //Get from storageState
  
    const selectState = (state) => state.Login
    const selectLoginProperty = createSelector(
      selectState,
      (login) => ({
          user: login.user,
          token : login.token,
          isLockScreen :  login.isLockScreen
      }
  ))
    const {
      user: userProfile, 
      token, 
      isLockScreen 
    } =  useSelector(selectLoginProperty)
  
    const [ loading ] = useState(userProfile ? false : true);
    return { userProfile, loading , token , isLockScreen };
  };
  
  export { useProfile };