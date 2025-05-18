import CustomCatchError from "@/components/common/CustomCatchError";
import MetaComponent from "@/components/common/MetaComponent";
import { getDirectoryFileSystemAsync, getFileByDirectoryPathAsync } from "@/helpers/backend_helpers/documentManagement_helpers";
import CustomPage from "@/layout/CustomPage";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledDropdown } from "reactstrap";
import SimpleBar from "simplebar-react";
import FileTable from "./FileTable";
import PDFViewerModal from "@/components/common/PDFViewerModal";
import classNames from "classnames";
import { OperacionUsuario } from "@/common/constants";
import { ContentWaitLoading } from "@/components/common/ContentWaitLoading";


const metadata = {
    title: "Administrador de Archivos",
};
  
const FileManager = () => {

    //Data State
    const [ folders, setFolders ] =  useState({ name : "root"})
    const [ selectedRoot, setSelectedRoot] =  useState({});
    const [ fileList, setFileList] =  useState([])

    //Trigger State
    const [catchError, setCatchError ] = useState("")
    const [ isLoadingData, setIsLoadingData ] =  useState(false)

    //Modal State
    const [ showPrintModal, setShowPrintModal ] =  useState(false)
    const [ printOptions, setPrintOptions ] = useState({
        url:  ""
    })


    const fx_getDirectoryAndFiles =  async(path = '') => {
            const response  =  await getDirectoryFileSystemAsync(path);
            if (!response.succeeded) {
                throw new Error(response.message)
            }
    
            return response.data
    }

    const onLoad_Async = async() =>{
        try {
            setIsLoadingData(true)
            const data  =  await fx_getDirectoryAndFiles(); 
            setFolders(data)

        } catch (error) {
            setCatchError(error)
        }finally{
            setIsLoadingData(false)
        }
    }


    const btnFolder_onClick = async(e) => {
        const  { action } =  e
        if(action === OperacionUsuario.VER){
            btnVer_onClick(e)
        }else if (action === OperacionUsuario.EXPORTAR){
            btnDownloadFile_onClick(e)
        }
        
    }


    const btnVer_onClick = async(e)=> {
        const { data } =  e

        if(data.type === "Directory"){
            setIsLoadingData(true)
            setFileList([])
            if(data.children.length > 0)
                setFileList(data.children || [])
            else{
                const { fullPath } =  data
                const response  =  await fx_getDirectoryAndFiles(fullPath); 
                const { children } =  response
                setFileList(children)
                setSelectedRoot(prev => ({...prev, title : response.fullPath }))
            }

            setIsLoadingData(false)
        }else {
            btnImprimir_onClick(e)
        }
    }

    const btnImprimir_onClick = async(e) => {
        const { data } = e
        setIsLoadingData(true)
        try {
            const response =  await getFileByDirectoryPathAsync(data.fullPath)
            var dataBlodOrText = undefined
            if(data.type === "pdf"){
                dataBlodOrText =  URL.createObjectURL(response);
            }else{
                dataBlodOrText = await response.text()
                //ValidandoBraces.
                const start = dataBlodOrText.startsWith("{")
                if(!start)
                    dataBlodOrText = `{ ${dataBlodOrText}`
            }

            setPrintOptions({
                url: dataBlodOrText ,
                type: data.type
            })
            setShowPrintModal(true)

        } catch (error) {
            setCatchError(error)
        }finally{
            setIsLoadingData(false)
        }
    } 


    const btnDownloadFile_onClick = async(e)=> {

        const { data } = e
        try {
            const response =  await getFileByDirectoryPathAsync(data.fullPath)
            const blob = response

            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = `${data.name}`;
            a.click();    
            a.remove();
        } catch (error) {
            setCatchError(error)
        }
    }


    useEffect(()=> {
        onLoad_Async()
    },[])
    return (
        <>
            <MetaComponent meta={metadata} />
            <CustomPage pageTitle={metadata.title }>
              <div className="row bg-white">
                    <CustomCatchError innerException={catchError} />
                    <div className="file-manager-content w-100 p-3 py-0 ">
                        <SimpleBar autoHide={false}  className="mx-n3 pt-4 px-4 file-manager-content-scroll overflow-x-hidden overflow-y-auto"  id={"simpleBarContent"}>
                            <div id="folder-list" className="mb-4"> 
                                <Row className="justify-content-beetwen g-2 mb-3 mb-4">
                                    <Col>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0 me-2 d-block d-lg-none">
                                                <button type="button" className="btn btn-soft-success btn-icon btn-sm fs-16 file-menu-btn">
                                                    <i className="ri-menu-2-fill align-bottom"></i>
                                                </button>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="fs-16 mb-0">Carpetas</h5>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row id="folderlist-data">
                                {(folders.children || []).map((item, key) => (
                                    <Col xxl={2} className="col-4 folder-card" key={key}>
                                        <Link to="#" 
                                            onClick={e => {
                                                setSelectedRoot(item)
                                                btnFolder_onClick({
                                                    originalEvent : e,
                                                    action: OperacionUsuario.VER,
                                                    data: item,
                                                    index: key
                                                })
                                            }}>
                                            <Card className={ "card-animate shadow-none " +
                                                classNames(({
                                                    "bg-primary-subtle" :  item === selectedRoot,
                                                    "bg-light" : item !== selectedRoot,
                                                }))
                                            } style={{height: "inherit"}}  id={"folder-" + key}>
                                                <CardBody>
                                                    <div className="text-center">
                                                        <div className="mb-2">
                                                            <i className="fa fa-folder align-bottom text-warning display-3"></i>
                                                        </div>
                                                        <h6 className="fs-15 folder-name">{item.name}</h6>
                                                    </div>
                                                    <div className="hstack mt-2 text-muted">
                                                        <span className="me-auto"><b>{item.folderFile}</b> {""}</span>
                                                        <span><b>{item.size}</b>{""}</span>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Link>
                                    </Col>
                                ))}
                                </Row>
                            </div>
                            <div>
                                <div className="d-flex align-items-center mb-3">
                                    <h6 className="flex-grow-1 fs-16 mb-0" id="filetype-title">Archivo Recientes en {selectedRoot.title}</h6>
                                </div>
                                <FileTable
                                    data={fileList}
                                    onRowClick={e => btnFolder_onClick(e)}
                                    isLoadingData={isLoadingData}
                                />
                            </div>
                        </SimpleBar>
                    </div>
              </div>
              <ContentWaitLoading isLoading={isLoadingData} />
            </CustomPage>

            { showPrintModal && <PDFViewerModal 
                modalTitle="Visor de Archivos"
                show={ showPrintModal }
                params={ printOptions }
                onHide={e => setShowPrintModal(false)}
            />}
        </>
      );
}

export default FileManager;