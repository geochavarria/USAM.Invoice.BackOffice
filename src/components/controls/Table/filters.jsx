import React, { useEffect, useState } from 'react';

export const Filter = ({ column }) => {
  return (
    <div style={{ marginTop: 5 }}>
      {column.canFilter && column.render('Filter')}
    </div>
  );
};


export const GlobalFilter = ({
    preGlobalFilteredRows, 
    filter : initialValue, 
    onChange,
    debounce = 500,
  
  }) => {
  
    const count = preGlobalFilteredRows.length;
    const [valueInput, setValue] = useState(initialValue);
  
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(valueInput);
    }, debounce);
  
      return () => clearTimeout(timeout);
  
    }, [debounce, onChange, valueInput]);
  
    return (
      <React.Fragment>
        <div className="search-box">
            <input 
                type="text" 
                placeholder={`Buscar en ${count} registros...`} 
                className="form-control search bg-light border-light"  
                autoComplete="off"
                onChange={(e) =>  setValue(e.target.value)}
                id="search-bar"
                value={ valueInput || ""}
              />
            <i className="ri-search-line search-icon"></i>
        </div>
      </React.Fragment>
    )
  }