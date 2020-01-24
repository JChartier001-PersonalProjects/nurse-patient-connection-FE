import React, {useState} from 'react';
import axiosWithAuth from "../../api/axiosWithAuth.js";
import {Button, Form, Row, Col} from 'react-bootstrap';

const PatientRegister = (props) => {
    const id = localStorage.getItem('userId');
    
    const [ patient, setPatient] = useState({
      info: {
        user_id: id,
        age: null,
        city: '',
        state: 'WI',
        primary_insurance: '',
        secondary_insurance: '',
        smoke: false,
        case_manager: false,
        trach: false,
        gt: false,
        vent: false,
        epilepsy: false,
        o2: false,
        lift_req: false,
        lift_weight: '',
        school: false,
        verbal: false,
        animals: false,
        mobility: '',
        use_car: false,
        appt: false,
        school_time: '',
        develop_disabled: false,
        live_with: '',
        type_pet: ''
        }
    });

    const handleInput = e => {
        const stringToBoolean = string => {
            switch(string.toLowerCase().trim()) {
               case 'true': return true;
               case 'false': return false;
               default: return e.target.value;
         }}        
        setPatient({
            ...patient,
            [e.tartget.name]: stringToBoolean(e.target.value)
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('http://localhost:4000/api/patient', patient, id)
            .then(response => {
            console.log(response);
                props.history.push('/dashboard') 
            })
            .catch(error => {
                console.dir(error)
            })
    }
    console.log("patient", patient)

    return(
        <div className="patientRegister">            
                <Row >                    
                    <Col xs={6} >
                        <Form.Label>City</Form.Label>
                        <Form.Control className="input" type="text" name="city" placeholder="City" onChange={handleInput}/>
                        </Col>  
                        <Col xs={6}>
                        <Form.Label>State</Form.Label>
                        <Form.Control className="input" type="text" name="state" placeholder="State" onChange={handleInput}/>
                    </Col>                    
                </Row>
                <Row>
                    {/* <Col xs={4} > */}
                <Form.Label >Insurance Type</Form.Label>
                <Form.Control as="select" name='insurance' onChange={handleInput} defaultValue=''>                
                    <option value='' disabled hidden>Please Select</option>
                    <option value="ForwardHealth">ForwardHealth</option>
                    <option value="Private Insurance">Private Insurance</option>
                    <option value="Other">Other</option>     
                </Form.Control> 
                {/* </Col>
                <Col xs={8}> */}
                <Form.Label >In need of a Case Manager?</Form.Label>
                <Form.Control as="select"  name='case_manager' onChange={handleInput} defaultValue=''>                
                    <option value='' disabled hidden>Please Select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>    
                </Form.Control> 
                {/* </Col> */}
                </Row>
                <div className="check">
                    <Form.Label>Please check the needs of your child/self:</Form.Label>
                    <Form.Check type="checkbox" label="Trach" name='trach' value="true" onChange={handleInput}/>
                    <Form.Check type="checkbox" label="Vent" name='vent' value="true" onChange={handleInput}/>
                    <Form.Check type="checkbox" label="G-tube" name='gt' value="true" onChange={handleInput}/>                    
                    <Form.Check type="checkbox" label="Developmentally Delayed" name='develop_disabled' value="true" onChange={handleInput}/>
                    <Form.Check type="checkbox" label="Verbal" name='verbal' value="true" onChange={handleInput}/>
                    <Form.Check type="checkbox" label="Non-verbal" name='verbal' value="false" onChange={handleInput}/>
                    <Form.Check type="checkbox" label="Attends School" name='school' value="true" onChange={handleInput}/>
                    </div >
                    {/* <Row> */}
                    <Form.Label >If yes, what times does your child attend school?
                        <Form.Control className="input" type="text" name="school_time" onChange={handleInput}/>
                        </Form.Label>
                    {/* </Row> */}
                    <Form.Label >What are your child/self's mobility needs
                    <Form.Control className="input" type="text" name="mobility" onInput={handleInput}/>
                </Form.Label>
                <div className="check">
                <Form.Check type="checkbox" label="Nurse to attend appointments?" name='appt' value="true" onChange={handleInput}/>
                <Form.Check type="checkbox" label="If yes, will nurse need to use own car?" name='use_car' value="true" onChange={handleInput}/>
                </div>
                <div className="check animal">
                <Form.Check type="checkbox" label="Animals in the home?" name='animals' value="true" onChange={handleInput}/>
                
                <Form.Label >Who does your child/self live with? </Form.Label>
                <Row>
                    <Col xs={6} md={4}>
                        <Form.Check type="checkbox" label="Self" name='live_with' value="self" onChange={handleInput}/>
                        <Form.Check type="checkbox" label="Parents" name='live_with' value="parent" onChange={handleInput}/>
                        <Form.Check type="checkbox" label="Others"name='live_with' value="other" onChange={handleInput}/>
                    </Col>
                </Row>
                </div>
               
                <Button type="submit" variant="outline-info" onClick={handleSubmit}>Submit</Button>
        </div>
    )
}
export default PatientRegister;