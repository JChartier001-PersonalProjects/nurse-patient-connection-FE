import React from 'react';
import {Route} from "react-router-dom";

import Register from "./components/register.js";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path='/register' render={props => <Register {...props} />} />
      <Route exact path='/login' render={props => <Login {...props} />} />
      <Route exact path='/dashboard' render={props => <Dashboard {...props} />} />
    </div>
  );
}

export default App;
