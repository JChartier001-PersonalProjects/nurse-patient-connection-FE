import React, {useState} from 'react';
import axios from "axios";

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
            localStorage.setItem('userId', response.data.id)
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
        <div className="LoginContainer">
            <form onSubmit={handleSubmit}>
                <h1>Please Login</h1>
                <div className="LoginForm">                    
                    <label>Email: <input type="text" name="email" placeholder="Email" onInput={handleInput}/></label>
                    <label>Password: <input type="password" name="password" placeholder="Password" onInput={handleInput}/></label>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )

}
export default Login;
