import React from 'react';
import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage.jsx';
import NavBar from './NavBar/NavBar';
import 'reset-css';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>LC VOUGHT CO</h1>
      <Route exact path="/" component={ HomePage } />
    </div>
  );
}

export default App;
