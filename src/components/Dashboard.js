import React, {useState, useEffect} from 'react';
import axiosWithAuth from "../api/axiosWithAuth.js";

const Dashboard = () => {
    const[user, setUser] = useState();
   
    useEffect(() => {    
        const id = localStorage.getItem('userId');

        axiosWithAuth()
        .get(`api/nurse/${id}`)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.dir(error)
        })
    });


    return(
        <div className="dashboardContainer">
            


          
        </div>
    )

}
export default Dashboard;
