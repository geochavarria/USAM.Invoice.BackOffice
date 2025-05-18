import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function MetaComponent({ meta }) {
  return (<>
    <HelmetProvider>
      <Helmet>
        <title>{`${meta?.title || ""} || ${import.meta.env.VITE_APPNAME}`}</title>
        <meta name="description" content={import.meta.env.VITE_APPNAME + " " + import.meta.env.VITE_COMPANY} />
      </Helmet>
    </HelmetProvider>
  </>);
}
