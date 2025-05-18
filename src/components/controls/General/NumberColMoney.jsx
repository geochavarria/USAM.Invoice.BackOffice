/**
 * @module General_Numbers_Col
 */

import { formatMoneySV } from "@/common/core/utilities/money";


/** Formato Moneda Column/Container - Link
 * @param { String } symbol Moneda Default => $
 * @param { String } value - Valor
 * @param { Number } scale - Escala decimal  Default => 2  
 */
const NumberColMoney = ({ 
    symbol = "$", 
    className = "", 
    value 
}) =>{
    return(
        <>
            <div className={"d-flex " + className }>
                <span> { symbol } </span>
                <div className={ "flex-grow-1 text-end " + className }> { formatMoneySV(Number(value || 0).toFixed(2)) }</div>
            </div>
        </>
    )
}


export default NumberColMoney;