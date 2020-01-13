import React, {useState, useEffect} from 'react';
import axiosWithAuth from "../api/axiosWithAuth.js";
import {Card} from "react-bootstrap";
import PatientDashboard from "../components/Patient/patientDashboard.js";


const Dashboard = () => {
    const[user, setUser] = useState({});
    const [patient,setPatient]= useState({});
    const [nurse, setNurse]= useState({})
   
    // useEffect(() => {    
    //     const id = localStorage.getItem('userId');
    //     const role = localStorage.getItem('role')
       
    //     axiosWithAuth()
    //     .get(`api/nurse/${id}/`)
    //     .then(response => {           
    //         setNurse(response.data);
    //     })
    //     })
    //     .catch(error => {
    //         console.dir(error)
    //     })    
    // }, []);
    console.log("patient", patient, user)

    return(
        <div className="dashboardContainer">
            <PatientDashboard/>
            {/* {user && user.length > 0 ? user.map(user => {
                return(
                    <div key={user.id}>
                        <h3>Welcome {user.first_name}</h3>
                        <div className="accountInfo">
                        <Card border="info" style={{ width: '18rem' }}>
                            <Card.Header>My Account Info</Card.Header>   
                                <Card.Body>                      
                                    <p>{`${user.first_name}  ${user.last_name}`}</p>
                                    <p>Email: {user.email}</p>
                                    {patient && patient.length > 0 ? patient.map(needs => {
                                        return ( 
                                            
                                                <div className="needsInfo" key={needs.id}>
                                                    <Card.Text>
                                                    City, State: {user.city}, {user.state}<br/>
                                                    Insurance type: {user.primary_insurance}
                                                    </Card.Text>
                                                </div>
                                            
                                        )}): null}
                                    {nurse && nurse.length > 0 ? nurse.map(nurse => {
                                        return(
                                            <Card.Text>
                                                <div className="nurseInfo" key={nurse.id} >
                                                    <p>License Type: {nurse.license_type}</p>
                                                    <p>Child Vent Certification: {nurse.rsc_child === 1 ? "Yes" : "No"}</p>
                                                    <p>Adult Vent Certification: {nurse.rsc_adult === 1 ? "Yes" : "No"}</p>
                                                    <p>Willing to Case Manage? {nurse.case_manager === 1 ? "Yes" : "No"}</p>
                                                    <p>Currently Available: {nurse.availability === 1 ? "Yes" : "No"}</p>
                                                </div>
                                            </Card.Text>
                                        )}): null}
                                </Card.Body>
                            </Card>
                        </div>
                    </div>  
                )}): null} */}
        </div>
    ) 
}
export default Dashboard;
