import { createSelector } from "@reduxjs/toolkit";

import * as Yup from "yup";
import { useFormik } from "formik";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, resetLoginFlag } from "@/slices/thunks";
import { Alert, Form, FormFeedback, Input } from "reactstrap";
import { toast } from "react-toastify";
import { CatchErrorMessage } from "@/components/common/CustomCatchError";

const FormContent = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Trigger State
    const [ showPassword, setShowPassword] =  useState(false)
    const [ isLoading, setIsLoading ] =  useState(false)
    const [ capsLockOn, setCapsLockOn] =  useState(false)

    const selectLayoutState = (state) => state.Login;
    const selectLayoutProperties = createSelector(
        selectLayoutState,
        (login) => ({
            errorMsg: login.errorMsg,
            loading: login.loading,
            error: login.error,
        })
    );

    const {
        errorMsg,
        error
    } = useSelector(selectLayoutProperties);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: process.env.NODE_ENV === "development" ? "admin" : '',
            password: process.env.NODE_ENV === "development" ? "USAM2025+" : '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Por favor ingrese su usuario"),
            password: Yup.string().required("Por favor ingrese su contraseña"),
        }),
        onSubmit: (values) => {
            try {
                setIsLoading(true)
                
                dispatch(loginUser(values, navigate));
            } catch (error) {
                console.log(error)
            }finally{
                setIsLoading(false)
            }
          
        }
    });
    

    const password_onKeyUp = (e)=> {
        const capsLockOn =  e.getModifierState('CapsLock');
        setCapsLockOn(capsLockOn)
    }


    useEffect(() => {
        if (errorMsg) {
            setTimeout(() => {
                dispatch(resetLoginFlag());
                setIsLoading(false)
            }, 2000);
        }
    }, [dispatch, errorMsg]);

  return (
    <div className="form-inner">
      <h3 className="text-primary">Invoice Hub -Back Office</h3>

      {/* <!--Login Form--> */}
      <Form method="post" autoComplete="off"
        onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
        }}>

        {error && error ? (<Alert color="danger">  { CatchErrorMessage(error).complete } </Alert>) : null}
        <div className="form-group">
          <label>Usuario</label>
          <Input type="text" 
            name="username" 
            placeholder="Username" 
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            value={validation.values.username || ""}
            invalid={
                validation.touched.username && validation.errors.username ? true : false
            }
          />
           {validation.touched.username && validation.errors.username ? (
                <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
            ) : null}
        </div>
        {/* name */}

        <div className="form-group">
          <label>Contraseña</label>
          <Input id="txtPasswordfield"
            type="password"
            name="password"
            value={validation.values.password || ""}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            onKeyUp={password_onKeyUp}
            invalid={
                validation.touched.password && validation.errors.password ? true : false
            }
            placeholder="Password"
          />
            {validation.touched.password && validation.errors.password ? (
                <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
            ) : null}
            { capsLockOn && <div className='ms-2 fs-11 fw-semibold text-danger'> * Mayusculas activas</div>}
        </div>
       
        {/* password */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            name="log-in"
          >
            Iniciar
          </button>
        </div>
        {/* login */}
      </Form>
      {/* End form */}

      <div className="bottom-box">
        <div className="text">
         ¿No tienes acceso? <Link to="/#">Contácte al administrador</Link>
        </div>

        <div className="divider">
          <span>Sign In by</span>
          <p><strong>UOnline</strong><span className="text-danger">Auth</span></p>
        </div>

      </div>
      {/* End bottom-box LoginWithSocial */}
    </div>
  );
};

export default FormContent;