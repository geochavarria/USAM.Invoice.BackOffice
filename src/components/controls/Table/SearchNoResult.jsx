import React from "react"



export const SearchNoResult = () => {
    return (
        <React.Fragment>
            <div className="noresult border">
                <div className="text-center">
                    <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop"
                        colors="primary:#121331,secondary:#08a88a" style={{ width: "75px", height: "75px" }}>
                    </lord-icon>
                    <p className="text-muted mb-0">Estamos buscando tu registro, espera un momento...</p>
                </div>
            </div>
        </React.Fragment>
    )
}