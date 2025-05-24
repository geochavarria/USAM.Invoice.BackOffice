import moment from 'moment';
import 'moment/dist/locale/es.js'

export const dateToNormal = (dateValue) => {
    return moment(dateValue).format("DD/MM/YYYY");
}



export const dateTimeToNormal = (dateValue) => {
    return moment(dateValue).format("DD/MM/YYYY HH:mm:ss a");
}

export const dateTimeToHTML = (dateValue) => {
    moment.locale("es");

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


export const getMonthList = () => {
    const meses = [
        { value : 1, label : "Enero" },
        { value : 2, label : "Febrero" },
        { value : 3, label : "Marzo" },
        { value : 4, label : "Abril" },
        { value : 5, label : "Mayo" },
        { value : 6, label : "Junio" },
        { value : 7, label : "Julio" },
        { value : 8, label : "Agosto" },
        { value : 9, label : "Septiembre" },
        { value : 10, label : "Octubre" },
        { value : 11, label : "Noviembre" },
        { value : 12, label : "Diciembre" }
    ]
    return meses || []
}