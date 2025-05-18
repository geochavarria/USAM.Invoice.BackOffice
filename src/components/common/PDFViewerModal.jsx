import React, { useCallback, useEffect, useState } from "react"
import { Modal, ModalBody } from "reactstrap"

const PDFViewerModal = ({
    show =  true,
    canScape = true,
    modalTitle = "Custom Modal",
    params  = {},
    onHide = () => {},
}) => {

    const [ isFullScreenModal, setIsFullScreenModal]=  useState(false)
    const [ showModal, setShowModal ] =  useState(false)


    const modalToggle_onClick = useCallback(() => {
        setShowModal(!showModal)
        onHide(!showModal)
    }, [showModal, onHide])

    useEffect(()=> {
        setShowModal(show)
    }, [show])

    return(<React.Fragment>
         <Modal backdrop={'static'} 
            centered size={ "xl" } 
            keyboard= { canScape }
            isOpen={ showModal } 
            toggle={ modalToggle_onClick }  
            className={ isFullScreenModal ? "modal-fullscreen" : ""}
            modalClassName="modal fade flip " id= "modalReport">
            <div className="p-1 px-3 bg-success-subtle modal-header">
                <div className="d-flex  justify-content-between w-100">
                    <h5 className="modal-title">{ modalTitle }</h5>
                    <div className="buttons">
                        <button type="button" className="btn btn-ghost-dark p-0 px-2"
                            onClick={(e)=> setIsFullScreenModal(!isFullScreenModal)}>
                            <i className="fa  fa-expand fs-18" />
                        </button>
                        <button type="button"  
                            className="btn btn-ghost-dark py-2 btn-close" 
                            onClick={ (e) => modalToggle_onClick(e) } aria-label="Close"/>
                    </div>

                </div>
            </div>
            <ModalBody className="p-0 h-100" >
                <div style={{ 
                    position: "",
                    width: "100%",
                    height: "100vh",
                    minHeight: "450px",
                    maxHeight: isFullScreenModal ? "100vh" : "1080px"
                }}>
                {params?.type === "json" ? (
                    <pre className="language-markup rounded-2" style={{ height: "100%", overflow: "auto", whiteSpace: "pre-wrap", overflowWrap: "break-word" }}>
                        {JSON.stringify(JSON.parse(params?.url || "{}"), null, 2)}
                    </pre>
                ) : (
                    <object  style={{ height:"100%" ,
                        aspectRatio: 4 / 3
                        }}
                        data={ params?.url || ""}
                        type={`application/${params?.type}`}
                        width={"100%"}>
                    </object>
                )}
                </div>
            </ModalBody>
        </Modal>
       
    </React.Fragment>)
}


export default PDFViewerModal;