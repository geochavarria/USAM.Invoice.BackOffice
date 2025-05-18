import { TipoEstadoDanger, allTipoEstadoList, tipoEstadoInfo, tipoEstadoSecondary, tipoEstadoSuccess, tipoEstadoWarning } from "@/common/constants/estadoTypes"
import { CreateUUID } from "@/common/core/utilities/codes"
import { UncontrolledTooltip } from "reactstrap"

/** Indicador de estado string - Badge
 * @param {String} status - Estado Caracter
 * @param {String} caption - Indicador en Tooltip
 * @param {String} prefix - Prefijo antes de estado
 * @augments /constants/tipoEstado
 * @returns Badge String Tipo Estado
 */
const StatusColString = ({ status , caption, prefix="", subtle = "-subtle"}) => {
    const currentState =  allTipoEstadoList.find(x=> x.init === status)

    const getBadgeColor = () => {
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

    const badgeId = "B" + CreateUUID().substring(1,8)
    return (
        <>
           <span className={`badge bg-${ getBadgeColor()}${subtle || ""} text-${getBadgeColor()} fs-10`} id = { badgeId }> 
                { prefix }{ currentState?.label }
            </span>
           { caption && <UncontrolledTooltip placement="top" target={ badgeId } > {caption} </UncontrolledTooltip>}
        </>
        
    )
}


export default StatusColString;