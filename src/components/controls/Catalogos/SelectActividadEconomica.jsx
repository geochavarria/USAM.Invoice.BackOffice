import { getAllActividadEconomicaGroupedAsync } from "@/helpers/backend_helpers/admin_helpers";
import React, { useCallback, useEffect, useMemo, useState } from "react"
import Select from "react-select";
import { formatOptionLabel } from "../globalFormatSelect";

/** Select Tipo de Actividad Economica
 * @param { string } id Id de element default null
 * @param {function (e) {}} onOptionSelect funcion que retorna el evento onChange, se retorna objeto con propiedad [value: data, label:data]
 * @param {boolean} isSearch habilidar opcion de busqueda
 * @param {boolean} isClear habilidar opcion de limpieza de valor seleccionado
 * @param {boolean} isDisabled habilidar o desabilitar el control
 * @param {any} setDefaultValue value seleccionado en caso de mostrar informacion por defecto
 * @param {function (e) {}} onError Desplegar el error
 */
export const SelectActividadEconomica = ({ 
    id, 
    name, 
    size = "",
    onOptionSelect, 
    className = "",
    isSearch =  true, 
    isClear, 
    isDisabled, 
    setDefaultValue = '',
    onError = () => {}
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ catchError, setCatchError ] =  useState("")
    const [isRtl, setIsRtl] = useState(false);
    const [ dataSource, setDataSource] = useState([]);
    const [defaultValues, setDefaultValues] = useState([]);

    const idElement = (id || ("sld-" + Math.random().toString(16).slice(2)));
    const nameElement = (name || idElement);
    const isSearchable = (isSearch || false);
    const isClearable = (isClear || false);
    const toDisabled = (isDisabled || false);

    const options  =  useMemo(()=> {
        let optionsList =  [];
        dataSource.forEach(e => {
            const data =  e.actividad;
            const template = {
                label :  e.nombre,
                options : (data || []).map(i => ({
                    value: i.codigo,
                    label: `${i.codigo}`,
                    shortDescr : i.nombre,
                    data : i
                })) 
            }

            optionsList = [
                ...optionsList, 
                template]
        });

        return optionsList
    }, [dataSource])


    const actividadEconomica_OnLoadAsync = async ( ) => {
        setIsLoading(true);
        setDataSource([]);
        try {
            let response = await getAllActividadEconomicaGroupedAsync();
            if (!response.succeeded) {
                throw new Error(response.message)
            }
            const data =  response.data || []
            //Add Items
            setDataSource(data)
        } catch (ex) {
            setCatchError(ex)
        } finally {
            setIsLoading(false)
        }
    }


    const onSelectedItems = useCallback(()=> {
        const selectedValue =  (setDefaultValue || "")
      
        if (String(selectedValue) !== ("" || "0")) {
            var selectedItem  = undefined;
            for (const element of options) {
                const optionsList =  element.options
                const option =  optionsList.find(x=>  String(x.value) === String(selectedValue))
                if(option){
                    selectedItem =  option
                    break
                }
            }
            setDefaultValues(selectedItem);
        } else {
            setDefaultValues({});
        }
    },[setDefaultValue, options,])

    useEffect(()=> {
        onError(catchError)
    }, [catchError,onError])

    useEffect(()=> {
        onSelectedItems()
    },[ onSelectedItems])


   useEffect(()=> {
        if(!setDefaultValue?.trim())
            setDefaultValues(null);
    },[setDefaultValue])
    
   
   useEffect(() => {
        actividadEconomica_OnLoadAsync();
    }, [])

    const [ customStyle, setCustomStyle ] = useState({})
    useEffect(()=> {
        if(!size) return;

        setCustomStyle({
            control: (base, state) => ({
                ...base,
                height: '28px',
                minHeight: '28px',
            }),
            dropdownIndicator: (base) => ({
                ...base,
                paddingTop: 0,
                paddingBottom: 0,
            }),menuList: (base) => ({
                ...base,
                fontSize: '12px',
            }),
        })
    }, [size])

    const filterOption = (option, inputValue) => {
        const { value, data } = option;
        var { shortDescr } =  data
        shortDescr = shortDescr.toUpperCase();

        const mergedOptions = options.flatMap(group => group.options || []);

        const otherKey = mergedOptions.filter(
            opt => opt.shortDescr.toUpperCase() === shortDescr && opt.shortDescr.toUpperCase().includes(inputValue.toUpperCase())
        );

        return value.toString().includes(inputValue) || otherKey.length > 0;
    };

    return(
        <React.Fragment>
            <Select
                    id={ idElement } 
                    name={ nameElement }
                    formatOptionLabel={formatOptionLabel}
                    filterOption={filterOption}
                    className={ "basic-single " + className }
                    classNamePrefix="choices"
                    isDisabled={ toDisabled } 
                    isLoading={ isLoading }
                    isClearable={ isClearable }
                    isSearchable={ isSearchable }
                    onChange={(e) => onOptionSelect({
                        data: e
                    })}
                    placeholder={ "(Actividad Económica)" }
                    value={defaultValues}
                    styles={customStyle}
                    options={options} /> 
        </React.Fragment>
    )
}


export default SelectActividadEconomica