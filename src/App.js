import React from 'react';
import {Route} from "react-router-dom";

import Register from "./components/register.js";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";
import NurseRegister from "./components/Nurse/NurseRegister.js";
import PatientRegister from "./components/Patient/PatientRegister.js";
import AddAvail from "./components/Nurse/Posting/Add_Avail.js";
import EditPost from "./components/Nurse/Posting/EditPost.js";


import Nav from "./components/Nav.js"
import './css/index.css';

function App() {
  return (
    <div className="App">
      <div className="middle">
       <Route path='/' render={props => <Nav {...props} />} />
       
       <h1 className="title" style={{ fontFamily: "Kaushan Script', cursive"}}> Connecting Nurses </h1>
       <h1 className="titleTwo" style={{ fontFamily: "Kaushan Script', cursive"}}> with Families</h1>
       <img className="nurse" src="img/nurse.jpg" alt="nurse taking blood pressure"/>
      <Route exact path='/' render={props => <Register {...props} />} />
    
      <Route exact path='/login' render={props => <Login {...props} />} />
      <Route exact path='/dashboard' render={props => <Dashboard {...props} />} />
      <Route exact path='/nurse' render={props => <NurseRegister {...props} />} />
      <Route exact path='/patient' render={props => <PatientRegister {...props} />} />
      <Route exact path='/add-avail/:id' render={props => <AddAvail {...props} />}/>
      </div>
      
      
      <img className="family" src="img/family.jpg" alt="family in field"/>
       
    </div>
  );
}

export default App;
