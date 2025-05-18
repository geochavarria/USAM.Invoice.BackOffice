import React, { useEffect, useState } from "react"
import { Spinner } from "reactstrap"




export const ContentWaitLoading = ({ isLoading } ) => {

    const [ loading, setLoading] =  useState(false)

    useEffect(()=> {
        setLoading(isLoading )
    },[isLoading])
    return (
        <React.Fragment>
            { loading && <div className="container-loading" style={{ backgroundColor: "rgba(255,255,255,0.4)"}}>
                <div className="loading-content" style={{ marginTop: "-29.5px" }}>
                    <Spinner  color="primary">Loading...</Spinner>
                </div>
               
            </div>}
        </React.Fragment>
    )
}

export default ContentWaitLoading