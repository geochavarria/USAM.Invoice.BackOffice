import Home5 from "@/pages/home/home-5";
import NotFoundPage from "@/pages/others/404";
const publicRoutes = [

    { path: "/home", component: <Home5 /> },
    { path: "/404-NotFound", component: <NotFoundPage  replace/> },
]


export default publicRoutes