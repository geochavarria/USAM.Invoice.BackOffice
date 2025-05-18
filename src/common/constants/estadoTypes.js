/**
 * @module Tipo_Estado_Constant
 */ 

const TODOS = { 
    value : 0, 
    label: "Todos", 
    init : ""
}
export const ELABORACION = { 
    value : 1, 
    label: "Elaborado" , 
    init: "E" 
}
export const PROCESADO = { 
    value : 2, 
    label: "Procesado", 
    init: "P"
}
export const IMPRESO = { 
    value : 3, 
    label: "Impreso",  
    init: "I"
}
export const ANULADO = { 
    value : 4, 
    label: "Anulado", 
    init: "N"
}
export const CERRADO = { 
    value : 5, 
    label: "Cerrado", 
    init: "C"
}
export const REVISADO = { 
    value : 6, 
    label: "Revisado", 
    init: "R"
}
export const LIQUIDADO = { 
    value : 7, 
    label: "Liquidado", 
    init: "L"
}
export const ABIERTO = { 
    value : 8, 
    label: "Abierto", 
    init: "A"
}
export const SINREVISAR = { 
    value : 9, 
    label: "Sin Revisar", 
    init: "SR"
}
const CONCILIADO = { 
    value : 10, 
    label: "Conciliado", 
    init: "CN"
}
const NORECIBIDO = { 
    value : 11, 
    label: "No Recibido", 
    init: "NR"
}
export const RECIBIDO = { 
    value : 12, 
    label: "Recibido", 
    init: "RB"
}
export const APROBADO = { 
    value : 13, 
    label: "Aprobado", 
    init: "AP"
}
export const RECHAZADO = { 
    value : 14, 
    label: "Rechazado", 
    init: "RE"
}
export const SUSPENDIDO = { 
    value : 15, 
    label: "Suspendido", 
    init: "S"
}
const PEDIDO = { 
    value : 16, 
    label: "Pedido", 
    init: "PE"
}
const TRASLADADO = { 
    value : 17, 
    label: "Trasladado", 
    init: "T"
}
const MAYORIZADO = { 
    value : 18, 
    label: "Mayorizado", 
    init: "M"
}
export const AUTORIZADO = { 
    value : 19, 
    label: "Autorizado", 
    init: "AU"
}
/** Periodo Contable  - Estado */
const ABIERTO_NO_VENTA = { 
    value : 20, 
    label: "Abierto no ventas", 
    init: "ANV"
}
/** Periodo Contable  - Estado */
const ARCHIVADO = { 
    value : 21, 
    label: "Archivado", 
    init: "H"
}
/** Periodo Contable  - Estado */
export const BLOQUEADO = { 
    value : 22, 
    label: "Bloqueado", 
    init: "B"
}

export const SINENVIAR = { 
    value : 23, 
    label: "Sin Enviar", 
    init: "SE"
}

export const allTipoEstadoList = [
    TODOS,
    ELABORACION,
    PROCESADO,
    IMPRESO,
    ANULADO,
    CERRADO,
    REVISADO,
    LIQUIDADO,
    ABIERTO,
    SINREVISAR,
    SINENVIAR,
    CONCILIADO,
    NORECIBIDO,
    RECIBIDO,
    APROBADO,
    RECHAZADO,
    SUSPENDIDO,
    PEDIDO,
    TRASLADADO,
    MAYORIZADO,
    AUTORIZADO,
    ABIERTO_NO_VENTA,
    ARCHIVADO,
    BLOQUEADO
]

export const tipoEstadoSecondary = [
    IMPRESO,
    LIQUIDADO
]

export  const tipoEstadoSuccess = [
    PROCESADO,
    REVISADO,
    CONCILIADO,
    RECIBIDO,
    APROBADO,
    TRASLADADO,
    AUTORIZADO,
]

export  const TipoEstadoDanger = [
    ANULADO,
    RECHAZADO,
    ABIERTO_NO_VENTA
]

export const tipoEstadoWarning =[
    CERRADO,
    SUSPENDIDO,
    SINREVISAR,
    SINENVIAR,
    NORECIBIDO
]


export const tipoEstadoInfo =[
    ELABORACION,
    ABIERTO,
    ARCHIVADO
]


export const EventoInvalidacionEstado = [
    TODOS,
    ELABORACION,
    PROCESADO,
    RECHAZADO
]


export const PagoSolicitudEstado = [
    TODOS,
    ELABORACION,
    SINREVISAR,
    REVISADO,
    RECHAZADO,
    APROBADO,
    SUSPENDIDO,
    NORECIBIDO
]

export const pagoEstado = [
    TODOS,
    ELABORACION,
    AUTORIZADO,
    RECHAZADO,
    SUSPENDIDO,
    IMPRESO,
    ANULADO
]

export const transferenciaEstado = [
    TODOS,
    ELABORACION,
    RECHAZADO,
    ANULADO,
    PROCESADO
]

export const tipoEstadoCajaChMovimiento = [
    TODOS,
    ELABORACION,
    RECHAZADO,
    APROBADO,
    ANULADO,
    LIQUIDADO
]

/** Estados de Solicitud */
export const SolicitudReintegroEstado = [
    TODOS,
    ELABORACION,
    SINREVISAR,
    APROBADO,
    PROCESADO,
    LIQUIDADO
]

export const PartidaPreliminarEstado = [
    TODOS,
    ELABORACION,
    PROCESADO,
    CERRADO,
]



export const FacturaEstado = [
    TODOS,
    ELABORACION,
    PROCESADO,
    ANULADO
]