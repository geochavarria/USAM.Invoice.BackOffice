import { TipoEstadoDanger, allTipoEstadoList, tipoEstadoInfo, tipoEstadoSecondary, tipoEstadoSuccess, tipoEstadoWarning } from "@/common/constants/estadoTypes"
import { CreateUUID } from "@/common/core/utilities/codes"
import { UncontrolledTooltip } from "reactstrap"

/** Indicador de estado string - Dot
 * @param {String} status - Estado Caracter
 * @param {String} caption - Indicador en Tooltip
 * @augments /constants/tipoEstado
 * @returns Dot String Tipo Estado
 */
const StatusDotString = ({ status, caption}) => {

    const currentState =  allTipoEstadoList.find(x=> x.init === status)
    const getDotColor = () => {
        let color = "secondary"
        if(!currentState) return color

        const { init } =  currentState
        if(tipoEstadoSuccess.some(x=> x.init === init))
            color = "success"
        else if(tipoEstadoSecondary.some(x=> x.init === init))
            color = "secondary"
        else if(tipoEstadoInfo.some(x=> x.init === init))
            color = "info"
        else if(tipoEstadoWarning.some(x=> x.init === init))
            color = "warning"
        else if(TipoEstadoDanger.some(x=> x.init === init))
            color = "danger"
        else 
            color = "info"

        return color
    }
    const dotId = "dot" + CreateUUID().substring(1,8)
    return <>
        <span style={{fontSize: 8}}  id = { dotId }  className={` text-opacity-50  text-${ getDotColor() }`}>
            <i className={` mdi mdi-circle  me-1 `} />
        </span>
        <UncontrolledTooltip placement="top" target={ dotId } > {currentState?.label || ""} </UncontrolledTooltip>
    </>
}

export default StatusDotString;