/** Formato Porcetaje Column/Container - Link
 * @param { String } symbol Moneda Default => %
 * @param { String } value - Valor
 * @param { Number } scale - Escala decimal  Default => 2  
 */
const NumberColPercent= ({ symbol = "%", value, scale = 2 }) =>{
    return(
        <>
            <div className="d-flex">
                <div className="flex-grow-1 text-end"> { Number(value || 0).toFixed(scale) }</div>
                <span>{ symbol }</span>
            </div>
        </>
    )
}


export default NumberColPercent;