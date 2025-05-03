
import React from "react"


export const CheckBoxFilter = React.forwardRef(({indeterminate, ...rest}, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])


    return (
        <>
            <input
                ref={resolvedRef} {...rest}
               type="checkbox"
            />
        </>
    )
})

CheckBoxFilter.displayName = "CheckBoxFilter"