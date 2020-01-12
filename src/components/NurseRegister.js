import React, {useState} from 'react'
import axiosWithAuth from '../api/axiosWithAuth';
import {Form, Button, Row, Col} from "react-bootstrap";

const NurseRegister = (props) => {
    const id = localStorage.getItem('userId');
    const [ nurse, setNurse] = useState({
        user_id: id,
        license_type: '',
        rsc_child: false,
        rsc_adult: false,
        case_manager: false,
        available: false,
        ped_exp: false,
        peds_years: "",
        pdn_exp: false,
        pdn_years: '',
        epilepsy_exp: false,
        epilepsy_years: '',
        pets: false,
        type_pet: "",
        smoke: false,
        lift_res: false

    });

    const handleInput = e => {
        const stringToBoolean = string => {
            switch(string.toLowerCase().trim()) {
               case 'true': return true;
               case 'false': return false;
               default: return e.target.value;
         }}
        console.log(nurse)
        setNurse({
            ...nurse,
            [e.target.name]: stringToBoolean(e.target.value)
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('http://localhost:4000/api/nurse', nurse)
        .then(response => {
            console.log(response);
            props.history.push('dashboard');            
        })
    }
    console.log(nurse)

    return(
        <div className="nurseRegister">
            <Form onSubmit={handleSubmit}>
                <h2>Additional Nurse Info</h2>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Row className="license">
                        <Col xs={2}>
                            <Form.Label >License Type:</Form.Label>
                        </Col>
                        <Col xs={6}>
                            <Form.Control as="select" name='license_type' onChange={handleInput} defaultValue=''>
                                <option value='' disabled hidden>Please Select</option>
                                <option value="RN">RN</option>
                                <option value="LPN">LPN</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Form.Label >Current Pediatric Vent Certification:</Form.Label>
                                <Form.Control as="select" name='rsc_child' onChange={handleInput} defaultValue=''>
                                <option value='' disabled hidden>Please Select</option>
                                <option value={true} >Yes</option>
                                <option value={false}>No</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Form.Label >Current Adult Vent Certification:</Form.Label>
                            <Form.Control as="select" name='rsc_adult' onChange={handleInput} defaultValue=''>
                                <option value='' disabled hidden>Please Select</option>
                                <option value={true} >Yes</option>
                                <option value={false}>No</option>
                            </Form.Control>  
                        </Col>   
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Form.Label >If you are an RN, are you willing to case manage?</Form.Label>
                            <Form.Control as="select" name='case_manager' onChange={handleInput} defaultValue=''>
                                <option value='' disabled hidden>Please Select</option>
                                <option value={true} >Yes</option>
                                <option value={false}>No</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Form.Label>Are you currently looking for a new case? </Form.Label>
                            <Form.Control as="select" name='available' onChange={handleInput} defaultValue=''>
                                <option value='' disabled hidden>Please Select</option>
                                <option value={true} >Yes</option>
                                <option value={false}>No</option>
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} >
                            <Form.Check type="checkbox" label="Do you have Peds Exp." name="ped_exp" value="true" onChange={handleInput}/> 
                            <Col xs={6}> 
                                <Form.Label>If yes, how many years? </Form.Label>
                                <Form.Control as="select"  name='peds_years' onChange={handleInput} defaultValue=''>                
                                    <option value='' disabled hidden>Please Select</option>
                                    <option>1</option>
                                    <option>2</option>    
                                    <option>3</option>
                                    <option>4</option> 
                                    <option>5+</option>
                                </Form.Control> 
                            </Col>
                        </Col>
                        <Col xs={6}>
                            <Form.Check type="checkbox"  label="Do you have PDN/Home Health Exp." name="pdn_exp" value="true" onChange={handleInput}/>
                            <Col xs={6}>
                                <Form.Label>If yes, how many years?</Form.Label>
                                <Form.Control as="select"  name='pdn_years' onChange={handleInput} defaultValue=''>                
                                    <option value='' disabled hidden>Please Select</option>
                                    <option>1</option>
                                    <option>2</option>    
                                    <option>3</option>
                                    <option>4</option> 
                                    <option>5+</option>   
                                </Form.Control> 
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} >
                            <Form.Check type="checkbox"  label="Have you worked with an epileptic patient before?" name="epilepsy_exp" value="true" onChange={handleInput}/>
                            <Col xs={6}>
                                <Form.Label>If yes, how many years?</Form.Label>
                                <Form.Control as="select"  name='epilepsy_years' onChange={handleInput} defaultValue=''>                
                                    <option value='' disabled hidden>Please Select</option>
                                    <option>1</option>
                                    <option>2</option>    
                                    <option>3</option>
                                    <option>4</option> 
                                    <option>5+</option>   
                                </Form.Control> 
                            </Col>
                        </Col>
                        <Col xs={6}>
                            <Form.Check type="checkbox"  label="Do you have any pets" name="pets" value="true" onChange={handleInput}/>
                            <Col xs={6}>
                                <Form.Label>If yes, what type? </Form.Label>
                                <Form.Control type="text" name='type_pet' onChange={handleInput} /> 
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Form.Check type="checkbox"  label="Do you smoke?" name='smoke' value="true" onChange={handleInput}/>
                        </Col>
                        <Col xs={6}>
                            <Form.Check type="checkbox"  label="Do you have any lifting restrictions?" name='lift_res' value="true" onChange={handleInput}/>
                        </Col>
                    </Row>
                    <Button type="submit" variant="outline-info">Submit</Button>
                </Form.Group>
            </Form>
        </div>        
    )
}

export default NurseRegister;