import React from "react";
import { Navigate  } from "react-router-dom";
import { PublicRoutes as publicRoutes } from "./AppRoutes"
import adminRoutes from "./AppRoutes/adminRoutes";

const authProtectedRoutes = [
    ...adminRoutes,
    { path: "/", component:  <Navigate  to="/home"  />,},
    { path: "*",  component:  <Navigate  to="/404-NotFound"  replace /> },
]


export { authProtectedRoutes, publicRoutes };