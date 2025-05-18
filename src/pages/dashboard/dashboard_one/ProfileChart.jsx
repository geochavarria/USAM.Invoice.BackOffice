

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Line } from "react-chartjs-2";
import { useEffect, useMemo, useState } from "react";
import { getDashboardDocumentResumeYearAsync } from "@/helpers/backend_helpers/dashborad_helpers";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
  
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
  
      tooltips: {
        position: "nearest",
        mode: "index",
        intersect: false,
        yPadding: 10,
        xPadding: 10,
        caretSize: 4,
        // backgroundColor: "rgba(72, 241, 12, 1)",
        // borderColor: "rgb(255, 99, 132)",
        backgroundColor: "#1967d2",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 4,
      },
    },
  };
  
  
  
  const ProfileChart = () => {

    const [ profileResume, setProfileResume ] =  useState([])
    const [ catchError, setCatchError ] =  useState("")


    const labels = useMemo(()=> profileResume.map((e)=> e.label), [profileResume]);
  

    const data =  useMemo(()=> {
        return  {
            labels,
            datasets: [
              {
                label: "Documetos ",
                data: profileResume.map((e)=> e.counter),
                borderColor: "#1967d2",
                backgroundColor: "#1967d2",
                // data: [196, 132, 215, 362, 210, 252],
                fill: false,
              },
            ],
          };
    }, [profileResume])

  

    const onLoadAsync = async() => {
        try {
            const response = await getDashboardDocumentResumeYearAsync()

            const { data } =  response
            setProfileResume(data || []);
            console.log(data)
        } catch (error) {
            setCatchError(error)
        }
    }

    useEffect(()=> {
        onLoadAsync()
    }, [])
    return (
      <div className="tabs-box">
        <div className="widget-title">
          <h4>Transmisiones</h4>
          <div className="chosen-outer">
            {/* <!--Tabs Box--> */}
            <select className="chosen-single form-select">
              <option>Últimos 12 Meses</option>
            </select>
          </div>
        </div>
        {/* End widget top bar */}
  
        <div className="widget-content">
          <Line options={options} data={data} />
        </div>
        {/* End  profile chart */}
      </div>
    );
  };
  
  export default ProfileChart;
  