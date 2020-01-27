import React, {useState, useEffect} from 'react'
import axiosWithAuth from "../../api/axiosWithAuth.js";
import {Card, Button} from "react-bootstrap";

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
            <div key={patient.id}>
                <h3>Welcome {patient.first_name}</h3>
                <div className="accountInfo">
                <Card border="info" style={{width: '18rem,'}}>
                    <Card.Header>Profile <Button type="submit" variant="outline-info">Edit</Button></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {patient.first_name} {patient.last_name}<br/>
                                {patient.email}<br/>
                                {patient.city}, {patient.state}
                            </Card.Text>
                            <Card.Text>
                                Current Age: {patient.age}<br/>
                                Primary Insurance: {patient.primary_insurance}<br/>
                                Secondary Insurance: {patient.secondary_insurance === null ? "None" : patient.secondary_insurance}<br/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card border="info" style={{width: '18rem,'}}>
                        <Card.Header>Needs Profile <Button type="submit" variant="outline-info">Edit</Button></Card.Header>
                        <Card.Body className='need'>
                            <Card.Text>{!!patient.trach && "Trach"}</Card.Text>
                            <Card.Text>{!!patient.vent  && "Vent"}</Card.Text>
                            <Card.Text>{!!patient.gt  && "G-Tube"}</Card.Text>
                            <Card.Text>{!!patient.epilepsy  && "Seizures"}</Card.Text>
                            <Card.Text> {!!patient.o2  && "Oxygen"}</Card.Text>
                            <Card.Text>{!!patient.left_req  && "Lifting Required"}</Card.Text>
                            <Card.Text>{!!patient.lift_weight && `${patient.lift_weight}`}</Card.Text>
                            <Card.Text>{!!patient.school  && "Attends School"}</Card.Text>
                            <Card.Text>{!!patient.school_time && `${patient.school_time}`}</Card.Text>
                            <Card.Text>{patient.verbal === 1 ? "Verbal" : "Non-verbal"}</Card.Text>
                            <Card.Text>{!!patient.mobility !== null && `${patient.mobility}`}</Card.Text>
                            <Card.Text>{!!patient.develop_disabled  && "Developmentally delayed" }</Card.Text>                                
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )}): null}
    </div>

)
}

export default PatientDashboard;