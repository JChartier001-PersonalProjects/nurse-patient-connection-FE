import React from 'react';
import {Button} from "react-bootstrap";
import {Redirect} from "react-router-dom";

const Nav = () => {
    const signedIn = localStorage.getItem('token');

    const handleLogout = e => {
        e.preventDefault();        
        localStorage.removeItem('token');
        localStorage.removeItem('nurse_id');
        localStorage.removeItem('role');
        // localStorage.removeItem('token');
        {if(!signedIn) return  (<Redirect to="/login" />)}
    }
        
    return (
        <div className="header">
            <Button variant="outline-info">Home</Button>
           {signedIn && <Button variant="outline-info" onClick={handleLogout}>Logout</Button>}
        </div>

    )
}

export default Nav;