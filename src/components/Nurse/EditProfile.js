import React, {useState} from 'react';
import {Form, Button, Row, Col} from "react-bootstrap";
import axiosWithAuth from "../../api/axiosWithAuth.js"

const EditProfile = (props) => {
        const nurse = props.nurse;
        const handleClose = props.handleClose
    
        const [user, setUser] = useState({
            first_name: nurse.first_name,
            last_name:  nurse.last_name,
            email: nurse.email,          
            city: nurse.city,
            state: nurse.state
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
        const id = props.id
        e.preventDefault();
        axiosWithAuth()
        .put(`/api/user/${id}`, user)
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
        <div className="edit">
        <Form.Label>First Name</Form.Label>
        <Form.Control className="input" type="text" name="first_name"  placeholder={nurse.first_name} onChange={handleInput}/>  
    
        <Form.Label>Last Name</Form.Label>
        <Form.Control className="input" type="text" name="last_name" placeholder={nurse.last_name}  onChange={handleInput}/>
    
    <Form.Label>City</Form.Label>
    <Form.Control className="input" type="text" name="city" placeholder={nurse.city}  onChange={handleInput}/>  
   
    <Form.Label>State</Form.Label>
    <Form.Control className="input" type="text" name="state" placeholder={nurse.state}  onChange={handleInput}/>
   
    <Form.Label>Email address</Form.Label>
    <Form.Control className="input" type="email" name="email" placeholder={nurse.email}  onChange={handleInput}/>
   

<Button onClick={handleSubmit} name={"showProfile"} variant="outline-info">Register</Button>   
</div>

)
  }
  export default EditProfile;