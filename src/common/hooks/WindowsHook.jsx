/**
 * @module Window_Hooks
 */

import { useEffect, useState } from "react";

/** Obtener Dimensiones Actuales
 * @returns  width, height, breakpoint
 */
const getWindowDimensions = () => {
    const { 
        innerWidth: width, 
        innerHeight: height 
    } = window

    return{
        width,
        height,
        breakpoint : ""
    }
}

/** Obtener Dimensiones  - Hooks
 * @returns  width, height, breakpoint
 */
export const useWindowDimensions = () => {

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        const handleResize = () => {
            let dimensions  = getWindowDimensions()
            const getBreakPointPrefix = () => {
                const { width } =  dimensions
                if (width >= 1400) return "xxl"
                else if (width >= 1200) return "xl"
                else if (width >= 992) return "lg"
                else if (width >= 768) return "md"
                else if (width >= 576) return "sm"
                else return "xs"
            }
            const breakpoint = getBreakPointPrefix()
            setWindowDimensions({ ...dimensions, breakpoint  } );
        }
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}
