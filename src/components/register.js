import React, {useState} from 'react';
import axios from "axios";
import {Button, Form, Row, Dropdown } from 'react-bootstrap';




const Register = (props) => {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const handleInput = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
   
    const handleSelect = e => {
        localStorage.setItem("role", e.target.value);
    }
    
    const handleSubmit = e => {
        const role = localStorage.getItem('role')
        e.preventDefault();        
        
        axios
        .post('http://localhost:4000/api/auth/register', user)
        .then(response => {   
            localStorage.setItem("token", response.data.token);
            localStorage.setItem('userId', response.data.id)
            props.history.push(`/${role}`);            
        })
        .catch(error => {
            console.dir(error)
        })
    }
    
    return(
        <div className="registerContainer">
            <Form onSubmit={handleSubmit}>
                <h1>Create an Account!</h1>
                <div className="registerForm" >                    
                    <Row >
                    <Form.Group controlId="formBasicName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control className="input" type="text" name="first_name" placeholder="First Name" onChange={handleInput}/>               
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control className="input" type="text" name="last_name" placeholder="Last Name" onChange={handleInput}/>
                    </Form.Group>
                    </Row>
                    <Row>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control className="input" type="email" name="email" placeholder="Enter email" onChange={handleInput}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="input" type="password" name="password" placeholder="Password" onChange={handleInput} />
                    </Form.Group>
                    </Row>
                    <Form.Control as="select" name="role" onChange={handleSelect}>
                        <option value="select">Please Select One</option>
                        <option value="nurse">I am a Nurse</option>
                        <option value="patient">I am a Parent/Patient</option>      
                    </Form.Control> 
                   
                    <Button type="submit" variant="outline-info">Register</Button>   
                    </div>             
            </Form>
        </div>
    )
}

export default Register;

