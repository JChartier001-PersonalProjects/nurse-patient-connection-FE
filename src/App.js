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
      {/* <div className="img"> */}
      <img className="nurse" src="img/nurse.jpg" alt="nurse taking blood pressure"/>
      <p className="nursePhotoCredit">Photo by Hush Naidoo on Unsplash</p>
      {/* </div> */}
      <div className="middle">
       <Route path='/' render={props => <Nav {...props} />} />
       <h1 className="title" style={{ fontFamily: "Kaushan Script', cursive"}}> Connecting Nurses </h1>
       <h1 className="titleTwo" style={{ fontFamily: "Kaushan Script', cursive"}}> with Families</h1>
      <Route exact path='/register' render={props => <Register {...props} />} />
      <Route exact path='/login' render={props => <Login {...props} />} />
      <Route exact path='/dashboard' render={props => <Dashboard {...props} />} />
      <Route exact path='/nurse' render={props => <NurseRegister {...props} />} />
      <Route exact path='/patient' render={props => <PatientRegister {...props} />} />
      <Route exact path='/add-avail/:id' render={props => <AddAvail {...props} />}/>
      </div>
      {/* <div className="img"> */}
      <img className="family" src="img/family.jpg" alt="family in field"/>
      <p className="familyPhotoCredit">Photo by Jessica Rockowitz on Unsplash</p>
      {/* </div> */}
      
    </div>
  );
}

export default App;
