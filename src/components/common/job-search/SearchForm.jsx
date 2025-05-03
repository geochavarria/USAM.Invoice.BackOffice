import { useState } from "react";
const SearchForm = ({

  onChange = () => { }
}) => {

  const [ searchTerm, setSearchTerm ] =  useState("")
  const [ searchTypePlaceholder, setSearchTypePlaceholder ] =  useState("Código de Generación")
  const [ selectedSearchType, setSelectedSearchType ] =  useState("TGEN")

  const handleSubmit = (event) => {
    event.preventDefault();
  };


  const selSearchType_onChange = (e)  => {
    const { target } = e;
    const { value } = target
    setSelectedSearchType(value)
    if(value === "TDUI")
      setSearchTypePlaceholder("Documento Único/ Homologación")
    else if(value === "TNIT")
      setSearchTypePlaceholder("No. Tributario / Registro de IVA")
    else if(value === "TNRC")
      setSearchTypePlaceholder("Registro de IVA")
    else if(value === "TGEN")
      setSearchTypePlaceholder("Código de Generación")
    else if(value === "TCTR")
      setSearchTypePlaceholder("Número de Control")
    else 
      setSearchTypePlaceholder("Otro Documento")
  }

  return (
    <form onClick={handleSubmit} className="px-2">
      <div className="row">
        <div className="form-group col-lg-6 col-md-12 col-sm-12">
          <span className="icon flaticon-search-1"></span>
          <input
            type="text"
            name="field_name"
            onChange={({target})=>  setSearchTerm(target.value)}
            value = { searchTerm }
            placeholder= { searchTypePlaceholder }
          />
        </div>
        {/* <!-- Form Group --> */}

        <div className="form-group col-lg-3 col-md-12 col-sm-12 category">
          <span className="icon flaticon-file"></span>
          <select className="chosen-single form-select" 
            onChange={e => selSearchType_onChange(e)}
            defaultValue={selectedSearchType}
            >
            <option value="TDUI">DUI/NIT</option>
            <option value="TNIT">NRC/NIT</option>
            <option value="TOTR">Carnet</option>
            <option value="TCTR">Número</option>
            <option value="TGEN" >Código</option>
          </select>
        </div>
        {/* <!-- Form Group --> */}

        <div className="row form-group col-lg-3 col-md-12 col-sm-12 btn-box">
          <button
            type="submit" style={{ minWidth: 130}}
            className="theme-btn btn-style-one"
            onClick={() => onChange({
              DocRef: searchTerm,
              DocType: selectedSearchType
            })}
          >
            <span className="btn-title">Buscar DTE</span>
          </button>
        </div>
      </div>
      {/* End .row */}
    </form>

    
  );
};

export default SearchForm;
