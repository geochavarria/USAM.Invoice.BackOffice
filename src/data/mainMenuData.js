export const homeItems = [
    {
      name: "Dashboard",
      routePath: "/dashboard",
    },
    {
      name: "Facturación",
      routePath: "#section-info",
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