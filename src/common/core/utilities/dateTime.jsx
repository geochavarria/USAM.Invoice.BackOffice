import moment from "moment";
import 'moment/locale/es'


export const dateTimeToNormal = (dateValue) => {
    return moment(dateValue).format("DD/MM/YYYY HH:mm:ss a");
}

export const dateTimeToHTML = (dateValue) => {
    if(!dateValue) return "N/D"
    const date = moment(dateValue).format("DD MMM YYYY")
    const time =  moment(dateValue).format("HH:mm:ss a")
    return (<span className="text-capitalize">{ date } <small className="text-muted text-uppercase">{time}</small></span>)
}

export const getCurrentDate = ( { extraDay =  null, format = null, withTime =  false }) => {

    if(extraDay)
        return  moment().add(extraDay, "days").format("YYYY-MM-DD");

    if(format){
        const format =  "YYYY-MM-DD" + (withTime ? "HH:mm:ss a" : "")
        return moment().format(format)
    }
    return  moment()
}