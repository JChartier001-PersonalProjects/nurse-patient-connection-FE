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
       <Route path='/' render={props => <Nav {...props} />} />
      <Route exact path='/register' render={props => <Register {...props} />} />
      <Route exact path='/login' render={props => <Login {...props} />} />
      <Route exact path='/dashboard' render={props => <Dashboard {...props} />} />
      <Route exact path='/nurse' render={props => <NurseRegister {...props} />} />
      <Route exact path='/patient' render={props => <PatientRegister {...props} />} />
      <Route exact path='/add-avail/:id' render={props => <AddAvail {...props} />}/>
      {/* <Route exact path='/edit-post/:id' render={props => <EditPost {...props} />}/>       */}
    </div>
  );
}

export default App;
