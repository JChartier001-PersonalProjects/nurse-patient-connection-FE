import React, {useState} from 'react';
import axios from "axios";

const Register = () => {
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

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .post('http://localhost:4000/api/auth/register', user)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.dir(error)
        })
    }

    return(
        <div className="registerContainer">
            <form onSubmit={handleSubmit}>
                <h1>Create an Account!</h1>
                <div className="registerForm">
                    <label>First Name: <input type="text" name="first_name" placeholder="First Name" onInput={handleInput}/></label>
                    <label>Last Name: <input type="text" name="last_name" placeholder="Last Name" onInput={handleInput}/></label>
                    <label>Email: <input type="text" name="email" placeholder="Email" onInput={handleInput}/></label>
                    <label>Password: <input type="password" name="password" placeholder="Password" onInput={handleInput}/></label>
                    <button type="submit">Register</button>


                </div>
            </form>
        </div>
    )

}
export default Register;

