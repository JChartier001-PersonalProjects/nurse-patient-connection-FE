import React from 'react';
import {Route} from "react-router-dom";

import Register from "./components/register.js";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";
import NurseRegister from "./components/NurseRegister.js";
import PatientRegister from "./components/PatientRegister.js";
import './css/index.css';

function App() {
  return (
    <div className="App">
      <Route exact path='/register' render={props => <Register {...props} />} />
      <Route exact path='/login' render={props => <Login {...props} />} />
      <Route exact path='/dashboard' render={props => <Dashboard {...props} />} />
      <Route exact path='/nurse' render={props => <NurseRegister {...props} />} />
      <Route exact path='/patient' render={props => <PatientRegister {...props} />} />
    </div>
  );
}

export default App;
