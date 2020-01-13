import React, {useState} from 'react';
import axios from "axios";
import {Form, Button} from "react-bootstrap";

const Login = props => {
    const [user, setUser] = useState({       
        email: "",
        password: ""
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
        .post('http://localhost:4000/api/auth/login', user)
        .then(response => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('role', response.data.role);
            console.log(response);
           if(localStorage.getItem('token')) {
               props.history.push('/dashboard')
           }
            })
        .catch(error => {
            console.dir(error)
        })
    }

    return(
        <div className="loginContainer">
            <Form onSubmit={handleSubmit}>
                <h1>Please Login</h1>
                <div className="LoginForm">                    
                    <Form.Label>Email: <Form.Control type="text" name="email" placeholder="Email" onInput={handleInput}/></Form.Label>
                    <Form.Label>Password: <Form.Control type="password" name="password" placeholder="Password" onInput={handleInput}/></Form.Label>
                    <Button type="submit"  variant="outline-info">Login</Button>
                </div>
            </Form>
        </div>
    )

}
export default Login;
