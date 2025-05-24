import React, { useEffect } from 'react'
import  Route from '@/Routes'
import { BrowserRouter } from "react-router-dom";

import Aos from "aos";
import "aos/dist/aos.css";
import "./assets/index.scss";

import ScrollToTop from "./components/common/ScrollTop";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";

//import { store } from "./store/store";
import "react-toastify/dist/ReactToastify.css";
import 'simplebar-react/dist/simplebar.min.css';

import { ToastContainer } from "react-toastify";
import { BASE_PATH } from './config';



if (typeof window !== "undefined") {
  import("bootstrap");
}

import moment from 'moment';
import 'moment/locale/es';
moment().locale("es")


function App() {
  useEffect(() => {
    Aos.init({
      duration: 1400,
      once: true,
    });
  }, []);

  return (
    <React.Fragment>
        <div className="page-wrapper">
          <BrowserRouter basename={BASE_PATH}>
            <Route />
            <ScrollTopBehaviour/>
          </BrowserRouter>

           {/* Toastify */}
          <ToastContainer
            position="bottom-right"
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <ScrollToTop />

        </div>
    </React.Fragment>
  )
}

export default App
