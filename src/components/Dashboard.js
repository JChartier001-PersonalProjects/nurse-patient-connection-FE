import React from 'react';
import PatientDashboard from "../components/Patient/patientDashboard.js";
import NurseDashboard from "../components/Nurse/NurseDashboard.js";


const Dashboard = (props) => {
    const token = localStorage.getItem('token')
        const parse = JSON.parse(atob(token.split('.')[1]))
        const role = parse.role;

    return(
        <div className="dash">
            {role === "patient" ?
            <PatientDashboard/> :          
            <NurseDashboard props={props}/>            
            }
        </div>
        )
}
export default Dashboard;
