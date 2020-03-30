import React, {useState} from 'react';
import axiosWithAuth from "../../api/axiosWithAuth.js";
import {Button, Form, Row, Col} from 'react-bootstrap';

const PatientRegister = (props) => {
    
    const token = localStorage.getItem('token')
      const parse = JSON.parse(atob(token.split('.')[1]))
      const id = parse.id

    const [ patient, setPatient] = useState({
       user_id: id
    });
   

    const [needs, setNeeds] =useState({
      
              
    });

    const handlePatient = e => {
        const stringToBoolean = string => {
            switch(string.toLowerCase().trim()) {
               case 'true': return true;
               case 'false': return false;
               default: return e.target.value;
         }}        
        setPatient({
            ...patient,
            [e.target.name]: stringToBoolean(e.target.value)
        })
    };

    const handleNeed = e => {
        const stringToBoolean = string => {
            switch(string.toLowerCase().trim()) {
               case 'true': return true;
               case 'false': return false;
               default: return e.target.value;
         }}        
        setNeeds({
            ...needs,
            [e.target.name]: stringToBoolean(e.target.value)
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('http://localhost:4000/api/patient', patient)
            .then(response => {
            console.log("post patient register", response.data.id);
            setPatient(response.data)
            // const pt_id =response.data[0].id
              axiosWithAuth()
            //   const pt_id =response.data[0].id
              .post('/api/needs', {needs, 'pt_id': response.data.id})
              .then(response => {
                  setNeeds(response.data)
                  props.history.push('/dashboard')
              }) 
              .catch(error => {
                  console.log(error)
              })
            })
            .catch(error => {
                console.dir(error)
            })
    }
    console.log("patient", patient, "needs", needs)

    return(
        <div className="register">     
            <div className="container">         
                <Form.Label >Patient Age </Form.Label>  
                <Form.Control type="text" name="age" onChange={handlePatient}/>                       
                <Form.Label >Insurance Type</Form.Label>
                <Form.Control as="select" name='primary_insurance' onChange={handlePatient} defaultValue=''>                
                    <option value='' disabled hidden>Please Select</option>
                    <option value="ForwardHealth">ForwardHealth</option>
                    <option value="Private Insurance">Private Insurance</option>
                    <option value="Other">Other</option>     
                </Form.Control> 
                <Form.Label >Secondary Insurance Type</Form.Label>
                <Form.Control as="select" name='secondary_insurance' onChange={handlePatient} defaultValue=''>                
                    <option value='' disabled hidden>Please Select</option>
                    <option value="ForwardHealth">ForwardHealth</option>
                    <option value="Private Insurance">Private Insurance</option>
                    <option value="Other">None</option>     
                </Form.Control> 
                <Form.Label>Please check the needs of the patient:</Form.Label>
                <Form.Check type="checkbox" label="Trach" name='trach' value="true" onChange={handleNeed}/>
                
                <Form.Check type="checkbox" label="Vent" name='vent' value="true" onChange={handleNeed}/>
                <Form.Check type="checkbox" label="Oxygen Needs" name='o2' value="true" onChange={handleNeed}/>
                <Form.Check type="checkbox" label="G-tube" name='gt' value="true" onChange={handleNeed}/>             
                <Form.Check type="checkbox" label="Epilepsy" name='epilepsy' value="true" onChange={handleNeed}/>       
                <Form.Check type="checkbox" label="Developmentally Delayed" name='develop_disabled' value="true" onChange={handleNeed}/>
                <Form.Check type="checkbox" label="Verbal" name='verbal' value="true" onChange={handleNeed}/>
                <Form.Check type="checkbox" label="Non-verbal" name='verbal' value="false" onChange={handleNeed}/>
                <Form.Label  className="input" >What are the patient's mobility needs</Form.Label>
                <Form.Control type="text" name="mobility" onInput={handleNeed}/>



                <Button type="submit" variant="outline-info" onClick={handleSubmit}>Submit</Button>
            </div> 
        </div>
    )
}
export default PatientRegister;
