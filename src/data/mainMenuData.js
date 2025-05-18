export const homeItems = [
    {
      name: "Dashboard",
      routePath: "/dashboard"
    },
    {
      name: "Facturación",
      items: [
        {
          name: "Documentos Transmitidos",
          routePath: "/Facturas/Documentos",
        },
        {
          name: "Importar Documentos",
          routePath: "/Facturas/Importar",
        },
        {
          name: "Administrador de Archivos",
          routePath: "/Facturas/Archivos",
        },
      ],
    },
    {
      name: "Gestión/Eventos",
      routePath: "#section-docs",
    },
    {
      name: "Configuración",
      items: [
        {
          name: "Parámetros",
          routePath: "/Configuracion/Parametros",
        },
        {
          name: "Catálogos",
          routePath: "/Configuracion/Ficheros",
        },
        {
          name: "Empresa",
          routePath: "/Configuracion/Empresa",
        },
        {
          name: "API",
          routePath: "/Configuracion/API-Manager",
        }
      ],
    }
];