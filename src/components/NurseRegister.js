import React, {useState} from 'react'
import axios from "axios";
import axiosWithAuth from '../api/axiosWithAuth';
import {Form, Button} from "react-bootstrap";

const NurseRegister = () => {
    const id = localStorage.getItem('userId');
    const [ nurse, setNurse] = useState({
        user_id: id,
        license_type: '',
        rsc_child: false,
        rsc_adult: false,
        case_manager: false,
        available: false
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
        })
    }
    console.log(nurse)

    return(
        <div className="nurseRegister">
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label >License Type:</Form.Label>
                <Form.Control as="select" name='license_type' onChange={handleInput} defaultValue=''>
                    <option value='' disabled hidden>Please Select</option>
                    <option value="RN">RN</option>
                    <option value="LPN">LPN</option>
                </Form.Control>
                <Form.Label >Current Pediatric Vent Certification:</Form.Label>
                <Form.Control as="select" name='rsc_child' onChange={handleInput} defaultValue=''>
                    <option value='' disabled hidden>Please Select</option>
                    <option value={true} >Yes</option>
                    <option value={false}>No</option>
                </Form.Control>
                <Form.Label >Current Adult Vent Certification:</Form.Label>
                <Form.Control as="select" name='rsc_adult' onChange={handleInput} defaultValue=''>
                    <option value='' disabled hidden>Please Select</option>
                    <option value={true} >Yes</option>
                    <option value={false}>No</option>
                </Form.Control>
                <Form.Label >If you are an RN, are you willing to case manage?</Form.Label>
                <Form.Control as="select" name='case_manager' onChange={handleInput} defaultValue=''>
                    <option value='' disabled hidden>Please Select</option>
                    <option value={true} >Yes</option>
                    <option value={false}>No</option>
                </Form.Control>
                <Form.Label>Are you currently looking for a new case? </Form.Label>
                <Form.Control as="select" name='available' onChange={handleInput} defaultValue=''>
                    <option value='' disabled hidden>Please Select</option>
                    <option value={true} >Yes</option>
                    <option value={false}>No</option>
                </Form.Control>
                </Form.Group>
                
                <Button type="submit" variant="outline-info">Submit</Button>
            </Form>
        </div>
        
    )
}
export default NurseRegister;