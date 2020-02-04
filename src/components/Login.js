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
        .post('https://connections-p-n.herokuapp.com/api/auth/login', user)
        .then(response => {
            localStorage.setItem('token', response.data.token)
            const token = localStorage.getItem('token')
            const parse = JSON.parse(atob(token.split('.')[1])) 
            localStorage.setItem('role', parse.role);
            // localStorage.setItem('')               
            console.log(parse);
            console.log(response)
           if(token) {
               props.history.push('/dashboard')
           }
            })
        .catch(error => {
            console.dir(error)
        })
    }
    console.log(user)
    return(
        <div className="loginContainer">
            <h2>Please Login</h2>
            <div className="loginForm">                    
                <Form.Label>Email: <Form.Control type="text" name="email" placeholder="Email" onInput={handleInput}/></Form.Label>
                <Form.Label>Password: <Form.Control type="password" name="password" placeholder="Password" onInput={handleInput}/></Form.Label>
            </div>   
            <Button onClick={handleSubmit} variant="outline-info">Login</Button>         
        </div>
    )

}
export default Login;
