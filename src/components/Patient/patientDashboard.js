import React, {useState, useEffect} from 'react'
import axiosWithAuth from "../../api/axiosWithAuth.js";
import {Card, Button} from "react-bootstrap";

import NeedPost from "../Patient/case_posting/NeedPost.js"

const PatientDashboard = () => {
    const [patient, setPatient] = useState({});
    const [needs, setNeeds] = useState({});

  
  

    const token = localStorage.getItem('token')
        const parse = JSON.parse(atob(token.split('.')[1]))
        const id = parse.id;
        console.log(id)
     
    useEffect(() => {
        axiosWithAuth()
        .get(`/api/patient/${id}`)
                .then(response => {    
            setPatient(response.data);  
            const pt_id =response.data[0].id
            axiosWithAuth()
            .get(`/api/needs/${pt_id}`)
            .then(response => {
                console.log('needs', response)
              setNeeds(response.data)
            })          
        })

        .catch(error => {
            console.dir(error)
        })
    }, []);

return(
   
    <div className="patientDash">      
           <div className="key" >
      {patient && patient.length > 0 ? patient.map( patient => {
            return(
                <>
                <h3>Welcome {patient.first_name}</h3>
                <div className="container">
                   <div className="accountInfo">
                       <Card border="info" style={{width: '23rem'}}>
                           <Card.Header>Profile <Button type="submit" variant="outline-info">Edit</Button></Card.Header>
                           <Card.Body>
                           <Card.Text className="list">
                               <span>
                               {patient.first_name} {patient.last_name}</span>
                               <span>{patient.email}</span>
                               <span>{patient.city}, {patient.state}</span> 
                           </Card.Text>
                           <Card.Text className="list">                       
                               <span className="head">Current Age: </span><span>{patient.age}</span> 
                               <span className="head">Primary Insurance: </span><span>{patient.primary_insurance}</span> 
                               <span className="head">Secondary Insurance: </span><span>{patient.secondary_insurance === null ? "None" : patient.secondary_insurance}</span> 
                           </Card.Text>
                           </Card.Body>
                       </Card>
                       {needs && needs.length > 0 ? needs.map(needs => {
                           return(
                             <Card className='need' border="info" style={{width: '23rem'}}>
                             <Card.Header>Needs Profile <Button type="submit" variant="outline-info">Edit</Button></Card.Header>
                             <Card.Body >
                             <Card.Text className="list">
                                 <span>{!!needs.trach && "Trach"}</span>
                                 <span>{!!needs.vent  && "Vent"}</span>
                                 <span>{!!needs.gt  && "G-Tube"}</span>
                                 <span>{!!needs.epilepsy  && "Seizures"}</span>
                                 <span> {!!needs.o2  && "Oxygen"}</span>
                                 <span>{!!needs.left_req  && "Lifting Required"}</span>
     
                                 <span>{!!needs.lift_weight && `${needs.lift_weight}`}</span>
                                 <span>{!!needs.school  && "Attends School"}</span>
                                 <span>{!!needs.school_time && `${needs.school_time}`}</span>
                                 <span>{needs.verbal === 1 ? "Verbal" : "Non-verbal"}</span>
                               
                                 <span>{!!needs.develop_disabled  && "Developmentally delayed" }</span>     
                             </Card.Text>                          
                             </Card.Body>
                         </Card>
                         )}) : null }
                   
                </div>
                <div className="post">
                <NeedPost id={patient.id} need={needs} />
                </div>
                </div>
                </>
            )}): null}
           
                </div>



                </div>
       
       

)
}


export default PatientDashboard;