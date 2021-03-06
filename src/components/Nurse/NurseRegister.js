import React, {useState} from 'react'
import axiosWithAuth from '../../api/axiosWithAuth';
import {Form, Button, Row} from "react-bootstrap";
// import axios from "axios";

const NurseRegister = (props) => {
    const token = localStorage.getItem('token')
    const parse = JSON.parse(atob(token.split('.')[1]))
    const id = parse.id
    const [ nurse, setNurse] = useState(
       { user_id: id,
        license_type: '',
        rsc_child: false,
        rsc_adult: false
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
        .post('api/nurse', nurse)
        .then(response => {
            console.log(response);
            props.history.push('dashboard');            
        })
    }
    console.log(nurse)

    return(
        <div className="registerContainer">
                <h2>Additional Nurse Info</h2>
                
                <Form.Group controlId="exampleForm.ControlSelect1" className="registerForm">
                <Row>
                            <Form.Label >License Type:</Form.Label>
                            <Form.Control as="select" name='license_type' onChange={handleInput} defaultValue=''>
                                <option value='' disabled hidden>Please Select</option>
                                <option value="RN">RN</option>
                                <option value="LPN">LPN</option>
                            </Form.Control>
                            </Row>
                            <Row>
                            <Form.Label >Current Pediatric Vent Certification:</Form.Label>
                                <Form.Control as="select" name='rsc_child' onChange={handleInput} defaultValue=''>
                                <option value='' disabled hidden>Please Select</option>
                                <option value={true} >Yes</option>
                                <option value={false}>No</option>
                            </Form.Control>
                            </Row>
                            <Row>
                            <Form.Label >Current Adult Vent Certification:</Form.Label>
                            <Form.Control as="select" name='rsc_adult' onChange={handleInput} defaultValue=''>
                                <option value='' disabled hidden>Please Select</option>
                                <option value={true} >Yes</option>
                                <option value={false}>No</option>
                            </Form.Control>  
                            </Row>
                    <Button type="submit" variant="outline-info" onClick={handleSubmit}>Submit</Button>
                </Form.Group>
            
        </div>        
    )
}

export default NurseRegister;