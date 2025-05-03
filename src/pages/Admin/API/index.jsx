
import MetaComponent from "@/components/common/MetaComponent";
import CustomTable from "@/components/controls/Table/CustomTable";
import { getAllAPIKeysAsync, getAllPuntoVentaAsync } from "@/helpers/backend_helpers/admin_helpers";
import CustomPage from "@/layout/CustomPage";
import  classNames from 'classnames';
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import APIForm from "./APIForm";
import { dateTimeToHTML } from "@/common/core/utilities/dateTime";
import { StatusColBoolean } from "@/components/controls/Status";


const metadata = {
  title: "API Manager",
};

const APIManager = () => {

  const [ dataSource, setDataSource ] = useState([])
  const [ selectedData, setSelectedData ] =  useState({}) 
  const [ puntoVentaSource, setPuntoVentaSource] = useState([])
  const [ defaultFilter, setDefaultFilter ] =  useState([
      {
          id : "pointOfSale",
          value : ""
      }
  ])

  const [ showFormModal, setShowFormModal ] =  useState(false)


  const [activeTab, setActiveTab ] = useState("0")
  const tabSection_onChange = (tab) => {
      if (activeTab !== tab) 
          setActiveTab(tab);
  }

  const onLoadAsync = async() => {
    try {
        const response = await getAllAPIKeysAsync();
        if (!response.succeeded) {
            throw new Error(response.message)
        }
        
        setDataSource(response.data || {})

        const responseTwo = await getAllPuntoVentaAsync();
        if (!responseTwo.succeeded) {
            throw new Error(responseTwo.message)
        }
        
        setPuntoVentaSource(responseTwo.data || {})
        setActiveTab("")

    } catch (error) {
        setCatchError(error)
    }
  }

  const btnNew_onClick = (e)  => {
    setSelectedData({})
    setShowFormModal(true)
  }


  const columnsDefinition = useMemo(()=> {
      let columnsTable = []
      columnsTable = [...columnsTable, ...[
          {
              header: "Código",
              accessorKey: "codigo",
              size: 16,
              maxSize: 16,
              cell : ({ row }) => (
                  <a  href="#"
                  className=" fw-medium fs-13 link-primary"> {row.original.codigo}</a>
              )
          },
          {
              header: "API",
              id:"app",
              accessorKey: "app",
              size: 16,
              minSize: 16,
              cell : ({ row }) => (
                  <a  href="#"
                  className=" text-body fw-semibold fs-13 link-primary"> {row.original.app}</a>
              )
          },
          {
              header: "Nombre",
              accessorKey: "nombre"
          },
          {
              header: "Key",
              accessorKey: "key",
              cell : ({ row }) => (
                  <a  href="#"
                  className="fw-semibold fs-13 link-primary text-uppercase"> {row.original.key}</a>
              )
          },
          {
              header: "Validez",
              accessorKey: "duedate",
              cell : ({ row }) => (
                  <div className="d-flex flex-column fs-12">
                      <span className="text-muted">{dateTimeToHTML(row.original.fechaCreacion)}</span>
                      <span className="text-muted">{dateTimeToHTML(row.original.fechaExpiracion)}</span>
                  </div>
              )
          },
          {
              header: "POS",
              id: "pointOfSale",
              accessorKey: "puntoVentaMH",
          },
          {
              header: "Sucursal",
              accessorKey: "nomsuc",
          },
          {
              header: "Estado",
              accessorKey: "estado",
              cell : ({ row }) => (
                  <StatusColBoolean status={row.original.activo} />
              )
          },
      ]]

      return columnsTable
  },[])

  useEffect(()=> {
      onLoadAsync();
  },[])

  return (
    <>
      <MetaComponent meta={metadata} />
      <CustomPage pageTitle={metadata.title}>
            <div className=" row">
              <div className="contacts_column  col-12 col-md-4 col-lg-3">
                <div className="card contacts_card ">
                  {/* Tab */}
                    <div className="card-body contacts_body">
                      <ul className="contacts">
                        {(puntoVentaSource || []).map((_item, index)=> (
                          <li key={_item.codigo} className={ classNames({ 
                              active: activeTab === _item.codigo.toString() 
                            })}>
                            <Link to="#" className="text-dark ps-3 py-2" 
                                onClick={() => {
                                    tabSection_onChange(String(_item.codigo));
                                    setDefaultFilter(prev=> ([{
                                        id : "pointOfSale",
                                        value : String(_item.codigo)  || ""
                                    }]))
                                }} >
                              <i className="fa fa-store"></i> {_item.nombre}
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
                            <i className={"fa fa-cogs"}></i>
                          </div>
                          <div className="user_info">
                              <span>API Keys Autorizadas</span>
                              <p>Integración de comunicación entre diferentes puntos de ventas (POS) y el transmisor de facturación electrónica, una vez la KEY es compartida y anexada.</p>
                          </div>
                      </div>
                    </div>
                    <div className="card-body msg_card_body p-0">
                      <CustomTable
                          isGlobalFilter={true}
                          data={dataSource}
                          columns={columnsDefinition}
                          customPageSize={20}
                          divClass="table-responsive"
                          tableClass="table-hover align-middle mb-0 table-striped table-sm table-nowrap "
                          theadClass="table-light text-muted"
                          filtered={defaultFilter}
                      >
                        <Col className="col-auto">
                            <button className="theme-blue add-info-btn " onClick={e => btnNew_onClick(e)}>
                                <span className="icon flaticon-plus"/>
                            </button>
                        </Col>
                      </CustomTable>
                    </div>
                  {/* Tab Content */}
                  
                </div>
              </div>
            </div>
      </CustomPage>
      <APIForm 
          show={ showFormModal} 
          data = { selectedData } 
          onConfirm = {e => parameter_onEndEdit(e)}
          onHide={e=> setShowFormModal(false)}/>
    </>
  );
};

export default APIManager
