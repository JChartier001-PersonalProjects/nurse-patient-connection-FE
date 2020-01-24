import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import axiosWithAuth from "../../api/axiosWithAuth.js";
import {Card, Button} from "react-bootstrap";
import Add_Avail from "./Add_Avail.js";
import Avail_Posting from "./Avail_Posting.js";

const NurseDashboard = () => {
    const [nurse, setNurse] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token')
        const parse = JSON.parse(atob(token.split('.')[1]))
        const id = parse.id
        console.log("id", id)
        axiosWithAuth()
        .get(`api/nurse/${id}`)
        .then(response => {
            console.log("getnurse", response.data[0])
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
                                <Card.Text>{nurse.first_name} {nurse.last_name}</Card.Text>
                                <Card.Text>{nurse.email}</Card.Text>
                                <Card.Text>{nurse.city}, {nurse.state}</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card border="info" style={{ width: "fit-content"}}>
                            <Card.Header>Nurse Profile <Button type="submit" variant="outline-info">Edit</Button></Card.Header>
                            <Card.Body className='profile'>
                                <Card.Text>License Type: {nurse.license_type}</Card.Text>
                                <Card.Text>Ped Vent Cert: {nurse.rsc_child === 1 ? "Yes" : "No"}</Card.Text>
                                <Card.Text>Adult Vent Cert: {nurse.rsc_adult === 1 ? "Yes" : "No"}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <Avail_Posting/>
                    </div>
                </div>
         )})
        : null
        }
        </div>
    )
}
export default NurseDashboard;