
import Login from "@/pages/Authentication/Login";
import Home5 from "@/pages/home/home-5";
import NotFoundPage from "@/pages/others/404";
import { Navigate } from "react-router-dom";

const publicRoutes = [
    { path: "/login", component: <Login /> },
    { path: "/home", component: <Home5 /> },
    { path: "/404-NotFound", component: <NotFoundPage /> },
        //From Base
    { path: "/admin", component:  <Navigate  to="/admin/"  />,},
]


export default publicRoutes