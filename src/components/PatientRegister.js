import React, {useState} from 'react';
import axiosWithAuth from "../api/axiosWithAuth.js";
import {Button, Form, Row, Col} from 'react-bootstrap';

const PatientRegister = (props) => {
    const id = localStorage.getItem('userId');
    
    const [ patient, setPatient] = useState({
      info: {
        user_id: id,
        city: '',
        state: 'WI',
        insurance: '',
        case_manager: false}
    });

    const [needs, setNeeds] = useState({
       needs:
        {trach: false,
        gt: false,
        school: false,
        verbal: false,
        animals: false,
        mobility: '',
        use_car: false,
        school_time: '',
        develop_disabled: false,
        live_with: '',
        vent: false,
        appt: false
        }
    })

    const handleInputPatient = e => {
        const stringToBoolean = string => {
            switch(string.toLowerCase().trim()) {
               case 'true': return true;
               case 'false': return false;
               default: return e.target.value;
         }}        
        setPatient({
            ...patient,
            info: {...patient.info, [e.target.name]: stringToBoolean(e.target.value)}
        })
    };

    const handleInputNeeds = e => {
        const stringToBoolean = string => {
            switch(string.toLowerCase().trim()) {
               case 'true': return true;
               case 'false': return false;
               default: return e.target.value;
         }}        
        setNeeds({
            ...needs,
           needs: {...needs.needs, [e.target.name]: stringToBoolean(e.target.value)}
        })
    }

    const handleSubmit = e => {
        console.log("inSubmit",patient, needs)
        e.preventDefault();
        axiosWithAuth()
        .post('http://localhost:4000/api/patient', patient, needs, id)
        .then(response => {
           console.log(response);
            props.history.push('/dashboard') 
        })
        .catch(error => {
            console.dir(error)
        })
    }
    console.log("patient", patient, "needs", needs)

    return(
        <div className="patientRegister">
            <Form onSubmit={handleSubmit}>
                <Row >                    
                    <Col xs={6} md={4}>
                        <Form.Label>City</Form.Label>
                        <Form.Control className="input" type="text" name="city" placeholder="City" onChange={handleInputPatient}/>
                        </Col>  
                        <Col xs={6} md={4}>
                        <Form.Label>State</Form.Label>
                        <Form.Control className="input" type="text" name="state" placeholder="State" onChange={handleInputPatient}/>
                    </Col>                    
                </Row>
                <Row>
                    <Col xs={6} >
                <Form.Label >Insurance Type</Form.Label>
                <Form.Control as="select" name='insurance' onChange={handleInputPatient} defaultValue=''>                
                    <option value='' disabled hidden>Please Select</option>
                    <option value="ForwardHealth">ForwardHealth</option>
                    <option value="Private Insurance">Private Insurance</option>
                    <option value="Other">Other</option>     
                </Form.Control> 
                </Col>
                <Col xs={6}>
                <Form.Label >In need of a Case Manager?</Form.Label>
                <Form.Control as="select"  name='case_manager' onChange={handleInputPatient} defaultValue=''>                
                    <option value='' disabled hidden>Please Select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>    
                </Form.Control> 
                </Col>
                </Row>
                
                    <Form.Label>Please check the needs of your child/self:</Form.Label>
                    <Form.Check type="checkbox" label="Trach" name='trach' value="true" onChange={handleInputNeeds}/>
                    <Form.Check type="checkbox" label="Vent" name='vent' value="true" onChange={handleInputNeeds}/>
                    <Form.Check type="checkbox" label="G-tube" name='gt' value="true" onChange={handleInputNeeds}/>                    
                    <Form.Check type="checkbox" label="Developmentally Delayed" name='develop_disabled' value="true" onChange={handleInputNeeds}/>
                    <Form.Check type="checkbox" label="Verbal" name='verbal' value="true" onChange={handleInputNeeds}/>
                    <Form.Check type="checkbox" label="Non-verbal" name='verbal' value="false" onChange={handleInputNeeds}/>
                    <Form.Check type="checkbox" label="Attends School" name='school' value="true" onChange={handleInputNeeds}/>
                    <Row>
                    <Form.Label >If yes, what times does your child attend school?
                        <Form.Control className="input" type="text" name="school_time" onChange={handleInputNeeds}/>
                        </Form.Label>
                    </Row>
                    <Form.Label >What are your child/self's mobility needs
                    <Form.Control className="input" type="text" name="mobility" onInput={handleInputNeeds}/>
                </Form.Label>
                <Form.Check type="checkbox" label="Nurse to attend appointments?" name='appt' value="true" onChange={handleInputNeeds}/>
                <Form.Check type="checkbox" label="If yes, will nurse need to use own car?" name='use_car' value="true" onChange={handleInputNeeds}/>
                
                <Form.Label >Who does your child/self life with? </Form.Label>
                <Row>
                    <Col xs={6} md={4}>
                        <Form.Check type="checkbox" label="Self" name='live_with' value="self" onChange={handleInputNeeds}/>
                        <Form.Check type="checkbox" label="Parents" name='live_with' value="parent" onChange={handleInputNeeds}/>
                        <Form.Check type="checkbox" label="Others"name='live_with' value="other" onChange={handleInputNeeds}/>
                    </Col>
                </Row>
               <Form.Check type="checkbox" label="Animals in the home?" name='animals' value="true" onChange={handleInputNeeds}/>
                
                <Button type="submit" variant="outline-info" onClick={handleSubmit}>Submit</Button>
                </Form>
        </div>
    )
}
export default PatientRegister;