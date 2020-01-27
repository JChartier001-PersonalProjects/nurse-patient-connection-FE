import React, {useState, useEffect} from 'react';
import axiosWithAuth from "../../api/axiosWithAuth.js";
import {Card, Button} from "react-bootstrap";
import CurrentPosting from "./Posting/CurrentPosting.js"

const NurseDashboard = (props) => {
    const [nurse, setNurse] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token')
        const parse = JSON.parse(atob(token.split('.')[1]))
        const id = parse.id
        console.log("id", id)
        axiosWithAuth()
        .get(`api/nurse/${id}`)
        .then(response => {
            setNurse(response.data);
            localStorage.setItem("nurse_id", response.data[0].id)
        })
        .catch(error => {
            console.log(error);
        })
    }, [])
        
    return(
        <div className="dashCont">
        {nurse && nurse.length > 0 ? 
        nurse.map(nurse => {
            return(
                <div  key={nurse.id}>
                    <h3>Welcome {nurse.first_name}</h3>
                    <div className="nurseDash">
                        <div className="left">
                        <Card border="info" style={{ width: "fit-content"}}>
                            <Card.Header>Profile  <Button type="submit" variant="outline-info">Edit</Button></Card.Header>
                            <Card.Body className="profile">
                                <Card.Text className="list">
                                    <span>{nurse.first_name} {nurse.last_name}</span>
                                    <span>{nurse.email}</span>
                                    <span>{nurse.city}, {nurse.state}</span>                                    
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card border="info" style={{ width: "fit-content"}}>
                            <Card.Header>Nurse Profile <Button type="submit" variant="outline-info">Edit</Button></Card.Header>
                            <Card.Body className='profile'>
                                <Card.Text className="list">
                                    <span>License Type: {nurse.license_type}</span>
                                    <span>Ped Vent Cert: {nurse.rsc_child === 1 ? "Yes" : "No"}</span>
                                    <span> Adult Vent Cert: {nurse.rsc_adult === 1 ? "Yes" : "No"}</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <CurrentPosting props={props}/>
                    </div>
                </div>
         )})
        : null
        }
        </div>
    )
}
export default NurseDashboard;