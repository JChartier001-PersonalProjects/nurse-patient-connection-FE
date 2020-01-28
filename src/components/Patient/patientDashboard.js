import React, {useState, useEffect} from 'react'
import axiosWithAuth from "../../api/axiosWithAuth.js";
import {Card, Button} from "react-bootstrap";

import NeedPost from "./NeedPost.js"

const PatientDashboard = () => {
    const [patient, setPatient] = useState({});
   
    useEffect(() => {
        const token = localStorage.getItem('token')
        const parse = JSON.parse(atob(token.split('.')[1]))
        const id = parse.id
        
        axiosWithAuth()
        .get(`api/patient/${id}`)
        .then(response => {           
            setPatient(response.data);            
        })
        .catch(error => {
            console.dir(error)
        })
    }, []);

return(
    <div className="patientDash">
        {patient && patient.length > 0 ? patient.map(patient => {            
            return(
            <div  key={patient.id}>
                <h3>Welcome {patient.first_name}</h3>
                <div className="container">
                <div className="accountInfo">
                <Card border="info" style={{width: '23rem,'}}>
                    <Card.Header>Profile <Button type="submit" variant="outline-info">Edit</Button></Card.Header>
                        <Card.Body>
                            <Card.Text className="list">
                                <span>
                                {patient.first_name} {patient.last_name}</span>
                                <span>{patient.email}</span>
                                <span>{patient.city}, {patient.state}</span>
                            </Card.Text>
                            <Card.Text>
                                Current Age: {patient.age}<br/>
                                Primary Insurance: {patient.primary_insurance}<br/>
                                Secondary Insurance: {patient.secondary_insurance === null ? "None" : patient.secondary_insurance}<br/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card border="info" style={{width: '23rem,'}}>
                        <Card.Header>Needs Profile <Button type="submit" variant="outline-info">Edit</Button></Card.Header>
                        <Card.Body className='need'>
                            <Card.Text className="list">
                                <span>{!!patient.trach && "Trach"}</span>
                                <span>{!!patient.vent  && "Vent"}</span>
                                <span>{!!patient.gt  && "G-Tube"}</span>
                                <span>{!!patient.epilepsy  && "Seizures"}</span>
                                <span> {!!patient.o2  && "Oxygen"}</span>
                                <span>{!!patient.left_req  && "Lifting Required"}</span>

                                <span>{!!patient.lift_weight && `${patient.lift_weight}`}</span>
                                <span>{!!patient.school  && "Attends School"}</span>
                                <span>{!!patient.school_time && `${patient.school_time}`}</span>
                                <span>{patient.verbal === 1 ? "Verbal" : "Non-verbal"}</span>
                                <span>{!!patient.mobility && `${patient.mobility}`}</span>
                                <span>{!!patient.develop_disabled  && "Developmentally delayed" }</span>     
                            </Card.Text>                          
                        </Card.Body>
                    </Card>
                </div>
                <div className="post">
                        <NeedPost id={patient.id}/>
              
                </div>
            </div>
            </div>
        )}): null}
    </div>

)
}

export default PatientDashboard;