
import React, {useState} from 'react';
import {Form, Button, Row, Col} from "react-bootstrap";
import axiosWithAuth from "../../api/axiosWithAuth.js"

const EditNurseProfile = (props) => {
        const nurse = props.nurse;
        const handleClose = props.handleClose
        
        const [user, setUser] = useState({
           license_type: nurse.license_type,
           rsc_child: nurse.rsc_child,
           rsc_adult: nurse.rsc_adult
        });
        console.log("user", user)
    const handleInput = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
console.log("props", props)
    const handleSubmit = e => {
        const id = nurse.id
        e.preventDefault();
        axiosWithAuth()
        .put(`/api/nurse/${id}`, user)
        .then(response => {
            console.log("update profile",response)
            setUser(response.data)
            handleClose("showProfile");
            window.location.reload();
        })
        .catch(error => {
            console.log(error)
        })
    }

    const booleanToString = boolean => {
        switch(boolean){
            case "true": return true;
            case "false" : return false;
            default: return boolean
        }
    }
    
    return (
        <Form.Group className="edit" controlId="exampleForm.ControlSelect1">
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
        
        <Button onClick={handleSubmit} name={"showProfile"} variant="outline-info">Save Changes</Button>   
<Button variant="outline-info" name="showShifts" onClick={handleClose}>Close</Button>
        </Form.Group>

)
  }
  export default EditNurseProfile;



