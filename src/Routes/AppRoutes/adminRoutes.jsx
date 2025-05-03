
import APIManager from "@/pages/Admin/API"
import Empresa from "@/pages/Admin/Empresa"
import Ficheros from "@/pages/Admin/Ficheros"
import Parametro from "@/pages/Admin/Parametro"
import Dashboard from "@/pages/dashboard"
const adminRoutes = [
    { path: "/dashboard", component: <Dashboard /> },
    { path: "/Configuracion/Empresa", component: <Empresa /> },
    { path: "/Configuracion/Parametros", component: <Parametro /> },
    { path: "/Configuracion/Ficheros", component: <Ficheros /> },
    { path: "/Configuracion/API-Manager", component: <APIManager /> },
]


export default adminRoutes