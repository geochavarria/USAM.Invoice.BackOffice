
import MetaComponent from "@/components/common/MetaComponent";
import CustomPage from "@/layout/CustomPage";
import  classNames from 'classnames';
import { useState } from "react";
import { Link } from "react-router-dom";
import Applications from "./Applications";
import PointSales from "./PointSales";
import Cashiers from "./Cashiers";
import System from "./System";
import SociosNegocio from "./SociosNegocio";

const metadata = {
  title: "Parametrizaciones",
};



const tabList = [
  { id : "1" , label : "Parámetros de Sistema", desc: "Parámetrizaciones internos de sistema y de sistema de transmisión Minisiterio de Hacienda", icon: "fa fa-cogs"},
  { id : "2" , label : "Aplicaciones", desc: "Aplicaciones y Dispositivos. Agentes conectados al sistema de transmisión", icon: "fa fa-rocket"},
  { id : "3" , label : "Puntos de Venta", desc: "", icon: "fa fa-store"},
  { id : "4" , label : "Asesores", desc: "", icon: "fa fa-users"},
  { id : "5" , label : "Socios Negocio", desc: "", icon: "fa fa-briefcase"}
]

const Parametro = () => {

  const [activeTab, setActiveTab ] = useState("0")
  const tabSection_onChange = (tab) => {
      if (activeTab !== tab) 
          setActiveTab(tab);
  }


  return (
    <>
      <MetaComponent meta={metadata} />
      <CustomPage pageTitle={"Parametrizaciones"}>
            <div className=" row">
              <div className="contacts_column  col-12 col-md-4 col-lg-3">
                <div className="card contacts_card ">
                  {/* Tab */}
                    <div className="card-body contacts_body">
                      <ul className="contacts">
                        {(tabList || []).map((_item, index)=> (
                          <li key={_item.id} className={ classNames({ 
                              active: activeTab === index.toString() 
                            })}>
                            <Link to="#" className="text-dark ps-3 py-2" 
                                onClick={() => {
                                    tabSection_onChange(index.toString());
                                }} >
                              <i className={_item.icon}></i> {_item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-9 chat" >
                <div className="card message-card">
                    <div className="card-header msg_head">
                      <div className="d-flex bd-highlight">
                          <div className="">
                            <i className={tabList[activeTab].icon}></i>
                          </div>
                          <div className="user_info">
                              <span>{tabList[activeTab].label}</span>
                              <p>{tabList[activeTab].desc}</p>
                          </div>
                      </div>
                    </div>
                    <div className="card-body msg_card_body p-3">
                      {activeTab === "0" && <System />}
                      {activeTab === "1" && <Applications />}
                      {activeTab === "2" && <PointSales />}
                      {activeTab === "3" && <Cashiers />}
                      {activeTab === "4" && <SociosNegocio />}
                     
                    </div>
                  {/* Tab Content */}
                  
                </div>
              </div>
            </div>
          
      </CustomPage>
    </>
  );
};

export default Parametro
