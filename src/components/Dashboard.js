import React, {useState, useEffect} from 'react';
import axiosWithAuth from "../api/axiosWithAuth.js";
import {Card} from "react-bootstrap";
import PatientDashboard from "../components/Patient/patientDashboard.js";
import NurseDashboard from "../components/Nurse/NurseDashboard.js";
import Add_Avail from "../components/Nurse/Add_Avail.js"
import Avail_Posting from "../components/Nurse/Avail_Posting.js";
import {Link} from "react-router-dom";


const Dashboard = () => {
    const token = localStorage.getItem('token')
        const parse = JSON.parse(atob(token.split('.')[1]))
        const role = parse.role;

    return(
        <div className="dash">
            {role === "patient" ?
            <PatientDashboard/> :          
            <NurseDashboard/>            
            }
        </div>
    ) 
}
export default Dashboard;
