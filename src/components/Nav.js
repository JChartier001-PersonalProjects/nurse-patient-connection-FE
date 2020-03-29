import React from 'react';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";



const Nav = (props) => {
    const signedIn = localStorage.getItem('token');
   

    const handleLogout = e => {
        e.preventDefault();        
        localStorage.removeItem('token');
        localStorage.removeItem('nurse_id');
        localStorage.removeItem('role');
        props.history.push('/login')
       
    }
        
    return (
        <div className="header">
            <Button variant="outline-info"><Link to="/">Home</Link></Button>
            <Button variant="outline-info"><Link to="/login">Login</Link></Button>
           {signedIn &&<Button variant="outline-info"><Link to="/dashboard">Dashboard</Link></Button>}           
           {signedIn && <Button variant="outline-info" onClick={handleLogout}>Logout</Button>}
        </div>

    )
}

export default Nav;