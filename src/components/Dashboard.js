import React, {useState, useEffect} from 'react';
import axiosWithAuth from "../api/axiosWithAuth.js";


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
    console.log(needs, user, nurse)
    return(
        <div className="dashboardContainer">
            {user && user.length > 0 ? user.map(user => {
                return(
                    <div key={user.id}>
                    <h3>Welcome {user.first_name}</h3>
                    <div className="accountInfo">
                        <h3>My Account Info</h3>
                        <p>{`${user.first_name}  ${user.last_name}`}</p>
                        <p>Email: {user.email}</p>
                        {needs && needs.length > 0 ? needs.map(needs => {
                            return (
                                <div className="needsInfo" key={needs.id}>
                        <p>City, State: {user.city}, {user.state}</p>
                        <p>Insurance type: {user.insurance}</p>
                        </div>
                        )}): null}
                        {nurse && nurse.length > 0 ? nurse.map(nurse => {
                            return(
                                <div className="nurseInfo" key={nurse.id} >
                                    <p>License Type: {nurse.license_type}</p>
                                    <p>Child Vent Certification: {nurse.rsc_child === 1 ? "Yes" : "No"}</p>
                                    <p>Adult Vent Certification: {nurse.rsc_adult === 1 ? "Yes" : "No"}</p>
                                    <p>Willing to Case Manage? {nurse.case_manager === 1 ? "Yes" : "No"}</p>
                                    <p>Currently Available: {nurse.availability === 1 ? "Yes" : "No"}</p>
                                </div>
                            )
                        }): null}
                    </div>    
                    </div>                            
                )
            }): null}
        </div>
    )
}
export default Dashboard;
