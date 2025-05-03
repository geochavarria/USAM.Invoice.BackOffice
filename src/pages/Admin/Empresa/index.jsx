
import MetaComponent from "@/components/common/MetaComponent";
import CompanyProfile from "./CompanyProfile";
import CustomPage from "@/layout/CustomPage";

const metadata = {
  title: "Datos de Empresa",
};

const Empresa = () => {
  return (
    <>
        <MetaComponent meta={metadata} />
        <CustomPage pageTitle={"Perfil de Empresa"}>
          <CompanyProfile /> 
        </CustomPage>
    </>
  );
};

export default Empresa
