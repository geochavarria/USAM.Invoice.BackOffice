import BreadCrumb from "@/components/dashboard-pages/BreadCrumb";

const CustomPage = ({ parentTitle, pageTitle, children }) => {
    return (<>
     <div className="container-fluid" >
        <section className="user-dashboard">
            <div className="dashboard-outer pt-2">
                <BreadCrumb title={pageTitle} />
                
                {/* Content Page */}
                { children }
            </div>
        </section>
     </div>
    </>)
}

export default CustomPage;