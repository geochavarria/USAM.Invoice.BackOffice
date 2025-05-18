import Documentos from "@/pages/Facturacion/Documents"
import FileManager from "@/pages/Facturacion/FileManager"

const facturacionRoutes = [
    { path: "/Facturas/Documentos", component: <Documentos /> },
    { path: "/Facturas/Archivos", component: <FileManager /> }
]


export default facturacionRoutes