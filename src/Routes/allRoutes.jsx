import React from "react";
import { Navigate  } from "react-router-dom";
import { PublicRoutes as publicRoutes } from "./AppRoutes"
import adminRoutes from "./AppRoutes/adminRoutes";
import facturacionRoutes from "./AppRoutes/facturacionRoutes";
import Logout from "@/pages/Authentication/Login/Logout";

const authProtectedRoutes = [
    ...adminRoutes,
    ...facturacionRoutes,
    
    { path: "/logout", component: <Logout /> },
    { path: "/", component:  <Navigate  to="/login"  />,},
    { path: "*",  component:  <Navigate  to="/404-NotFound"  replace /> },

]


export { authProtectedRoutes, publicRoutes };