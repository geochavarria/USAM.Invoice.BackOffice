import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";


import MetaComponent from "@/components/common/MetaComponent";
import Header from "./header";
import MobileMenu from "@/components/header/MobileMenu";
import FormContent from "./FormContent";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


const metadata = {
    title: "Inicio de Sesión",
};

const Login = () => {
    
    const hasTokenSelector = createSelector(
        (state) => state?.Login,
        (props) => props?.token
    );
    const hasTokenValue = useSelector(hasTokenSelector);

    if(hasTokenValue){
        return <Navigate to="/dashboard" />;
    }


    return(<React.Fragment>
        <MetaComponent meta={metadata} />
        <Header/>

        <MobileMenu />
        {/* Content */}
        <div className="login-section">
            <div
                className="image-layer d-none"
                style={{ backgroundImage: "url(/images/background/12.jpg)" }}
            ></div>
            <div className="outer-box " style={{marginLeft: "inherit"}}>
            {/* <!-- Login Form --> */}
                <div className="login-form default-form">
                    <FormContent /> 
                </div>
            {/* <!--End Login Form --> */}
            </div>
        </div>
    </React.Fragment>)
}


export default Login;