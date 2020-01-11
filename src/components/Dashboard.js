import React, {useState, useEffect} from 'react';
import axiosWithAuth from "../api/axiosWithAuth.js";
import {Card} from "react-bootstrap";


const Dashboard = () => {
    const[user, setUser] = useState({});
    const [needs,setNeeds]= useState({});
    const [nurse, setNurse]= useState({})
   
    useEffect(() => {    
        const id = localStorage.getItem('userId');
        const role = localStorage.getItem('role')
        
        axiosWithAuth()
        .get(`api/${role}/${id}`)
        .then(response => {
            setUser(response.data)
        axiosWithAuth()
        .get(`api/patient/${id}/needs`)
        .then(response => {           
            setNeeds(response.data);
        })
        axiosWithAuth()
        .get(`api/nurse/${id}/`)
        .then(response => {           
            setNurse(response.data);
        })
        })
        .catch(error => {
            console.dir(error)
        })    
    }, []);
    

    return(
        <div className="dashboardContainer">
            {user && user.length > 0 ? user.map(user => {
                return(
                    <div key={user.id}>
                        <h3>Welcome {user.first_name}</h3>
                        <div className="accountInfo">
                        <Card border="info" style={{ width: '18rem' }}>
                            <Card.Header>My Account Info</Card.Header>   
                                <Card.Body>                      
                                    <p>{`${user.first_name}  ${user.last_name}`}</p>
                                    <p>Email: {user.email}</p>
                                    {needs && needs.length > 0 ? needs.map(needs => {
                                        return ( 
                                            <Card.Text>
                                                <div className="needsInfo" key={needs.id}>
                                                    <p>City, State: {user.city}, {user.state}</p>
                                                    <p>Insurance type: {user.insurance}</p>
                                                </div>
                                            </Card.Text>
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
                )}): null}
        </div>
    ) 
}
export default Dashboard;
