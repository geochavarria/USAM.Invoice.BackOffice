import { getDashboardDocumentResumeStatusAsync } from "@/helpers/backend_helpers/dashborad_helpers";
import { useEffect, useState } from "react";

const TopCardBlock = () => {
   
    
    const [ cardContent, setCardContent ] =  useState([])


    //Trigger
    const [ catchError, setCathError ] = useState("")
    const loadAsync =  async() => {
        try {
            const response  = await getDashboardDocumentResumeStatusAsync();
            setCardContent(response.data || [])

        } catch (error) {
            setCathError(error)
        }
    }


    useEffect(()=> {
        loadAsync();
    },[])
  
    return (
      <>
        {cardContent.map((item, index) => (
          <div
            className="ui-block col-xl-3 col-lg-6 col-md-6 col-sm-12"
            key={item.index}
          >
            <div className={`ui-item ui-${item.badge}`}>
              <div className="left">
                <i className={`icon la ${item.icon}`}></i>
              </div>
              <div className="right">
                <h4>{item.counter}</h4>
                <p>{item.label}</p>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };
  
  export default TopCardBlock;
  