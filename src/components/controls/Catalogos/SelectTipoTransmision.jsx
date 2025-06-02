import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { formatOptionLabel } from "../globalFormatSelect";
import { getAllCatalogoByTypeAsync } from "@/helpers/backend_helpers/admin_helpers";

const SelectTipoTransmision = ({
    id, 
    name, 
    size = "",
    showAll =  true, 
    onOptionSelect, 
    className = "",
    isSearch, 
    isClear, 
    isDisabled, 
    setDefaultValue = '',
    onError = () => {}
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [ catchError, setCatchError ] =  useState("")
    const [isRtl, setIsRtl] = useState(false);
    const [options, setOptions] = useState([]);
    const [defaultValues, setDefaultValues] = useState([]);

    const idElement = (id || ("sld-" + Math.random().toString(16).slice(2)));
    const nameElement = (name || idElement);
    const isSearchable = (isSearch || false);
    const isClearable = (isClear || false);
    const toDisabled = (isDisabled || false);


    const [ dataSource, setDataSource ] =  useState([])

    const select_OnLoadAsync = async( ) => {
        setIsLoading(true);
        setOptions([]);

        try {
            const response = await getAllCatalogoByTypeAsync("TipoTransmision");
            if (!response.succeeded) {
                throw new Error(response.message)
            }

            setDataSource(response.data || {})
        
        } catch (ex) {
            setCatchError(ex)
        } finally {
            setIsLoading(false)
        }
    }

    const select_onDataSource = useCallback((setValueDefault) => {
        //Add "todo"
        let optionsList =  [];
        //Add Items
        dataSource.forEach(e => {
            optionsList.push({
                value: e.codigo,
                label: `${e.codigo}`,
                shortDescr : `${e.nombre}`,
                data : e
            });
        });

        if (String(setValueDefault) !== ("" || "0")) {
            setDefaultValues(optionsList.filter(a => String(a.value) === String(setValueDefault)));
        } else {
            setDefaultValues(null);
        }

        setOptions(optionsList);
    },[dataSource])
    

    const filterOption = (option, inputValue) => {
        const { value, data } = option;
        var { shortDescr } =  data
        shortDescr = shortDescr.toUpperCase()
        const otherKey = options.filter(
            opt => opt.shortDescr.toUpperCase() === shortDescr && opt.shortDescr.toUpperCase().includes(inputValue.toUpperCase())
        );

        return value.toString().includes(inputValue) || otherKey.length > 0;
    };
    
    useEffect(()=> {
        onError(catchError)
        //eslint-disable-next-line
    }, [catchError])

    
    useEffect(() => {
        select_onDataSource(setDefaultValue);
    }, [select_onDataSource, setDefaultValue])


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

    useEffect(()=> {
        select_OnLoadAsync(showAll)
        //eslint-disable-next-line 
    },[])

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
                isLoading={isLoading}
                isClearable={ isClearable }
                isRtl={ isRtl }
                isSearchable={ isSearchable }
                onChange={(e) => onOptionSelect({
                    data: e
                })}
                placeholder={ "(Seleccione)" }
                value={defaultValues}
                styles={customStyle}
                options={options} /> 


        </React.Fragment>
    )
}

export default SelectTipoTransmision;