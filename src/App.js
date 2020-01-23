import React from 'react';
import {Route} from "react-router-dom";

import Register from "./components/register.js";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";
import NurseRegister from "./components/Nurse/NurseRegister.js";
import PatientRegister from "./components/Patient/PatientRegister.js";
import AddAvail from "./components/Nurse/Add_Avail.js";
import CurrentPosting from "./components/Nurse/CurrentPosting.js";
import './css/index.css';

function App() {
  return (
    <div className="App">
      <Route exact path='/register' render={props => <Register {...props} />} />
      <Route exact path='/login' render={props => <Login {...props} />} />
      <Route exact path='/dashboard' render={props => <Dashboard {...props} />} />
      <Route exact path='/nurse' render={props => <NurseRegister {...props} />} />
      <Route exact path='/patient' render={props => <PatientRegister {...props} />} />
      <Route exact path='/add-avail/:id' render={props => <AddAvail {...props} />}/>
      <Route exact path='/avail-posting/:id' render={props => <CurrentPosting {...props} />}/>
    </div>
  );
}

export default App;
