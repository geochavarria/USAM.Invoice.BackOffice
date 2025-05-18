import { logoutUser } from "@/slices/thunks";
import PropTypes from "prop-types";
import { createSelector } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import withRouter from "@/layout/withRouter";
import { resetStore } from "@/slices";


const Logout = () => {
    const dispatch = useDispatch();

    const isUserLogoutSelector = createSelector(
      (state) => state.Login,
      (isUserLogout) => isUserLogout.isUserLogout
    );
    const isUserLogout = useSelector(isUserLogoutSelector);
  
    useEffect(() => {
      dispatch(logoutUser());
      resetStore();
    }, [dispatch]);
  
    if (isUserLogout) {
      return <Navigate to="/login" />;
    }
  
    return <></>;
}

Logout.propTypes = {
    history: PropTypes.object,
};

  
export default withRouter(Logout);