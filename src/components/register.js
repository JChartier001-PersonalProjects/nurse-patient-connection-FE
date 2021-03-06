import React, {useState} from 'react';
import axios from "axios";
import {Button, Form, Row, Col} from 'react-bootstrap';

const Register = (props) => {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        city: '',
        state: '',
        county: '',
        role: ""
    });

    const handleInput = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
   
    
    const handleSubmit = e => {
        
        e.preventDefault();       
        axios
        .post('api/auth/register', user)
        .then(response => {   
            localStorage.setItem('token', response.data.token)
            const token = localStorage.getItem('token')
            const parse = JSON.parse(atob(token.split('.')[1])) 
            localStorage.setItem('role', parse.role);     
            const role = localStorage.getItem('role')    
            props.history.push(`/${role}`);            
        })
        .catch(error => {
            console.dir(error)
        })
    }
    
    return(
        <div className="registerContainer">
            <Form onSubmit={handleSubmit}>
                <h2>Create an Account!</h2>
                <div className="registerForm" >      
                <Row>
                        <Col xs={6}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control className="input"  type="email" name="email" placeholder="Enter email" onChange={handleInput}/>
                        </Col>
                        <Col xs={6}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="input" type="password" name="password" placeholder="Password" onChange={handleInput} />
                        </Col>
                    </Row>              
                    <Row >
                        <Col xs={6}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control className="input" type="text" name="first_name" placeholder="First Name" onChange={handleInput}/>  
                        </Col> 
                        <Col xs={6}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control className="input" type="text" name="last_name" placeholder="Last Name" onChange={handleInput}/>
                        </Col>
                    </Row>
                    <Row >
                        <Col xs={6}>
                        <Form.Label>City</Form.Label>
                        <Form.Control className="input" type="text" name="city" placeholder="City" onChange={handleInput}/>  
                        </Col>
                        <Col xs={6}>
                        <Form.Label>State</Form.Label>
                        <Form.Control className="input" type="text" name="state" placeholder="State" onChange={handleInput}/>
                        </Col>
                    </Row>
                    <Row>
                    <Col xs={6}>
                        <Form.Label>County</Form.Label>
                        <Form.Control className="input" type="text" name="county" placeholder="County" onChange={handleInput} />
                        </Col>                   
                    <Col xs={6}>
                    <Form.Label>Please Select</Form.Label>
                    <Form.Control as="select" name="role" onChange={handleInput}>
                        <option value="select">Please Select One</option>
                        <option value="nurse">I am a Nurse</option>
                        <option value="patient">I am a Parent/Patient</option>      
                    </Form.Control> 
                    </Col>
                    </Row>
                    <Button type="submit" variant="outline-info">Register</Button>   
                    </div>             
            </Form>
        </div>
    )
}

export default Register;

