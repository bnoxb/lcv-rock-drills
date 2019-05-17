import React from 'react';
import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage.jsx';
import NavBar from './NavBar/NavBar';
import ProductContainer from './ProductContainer/ProductContainer';
import 'reset-css';
import './App.css';
import About from './About/About';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/" component={ HomePage } />
      <Route exact path="/about" component={ About } />
      <Route exact path="/products" component={ ProductContainer } />
    </div>
  );
}

export default App;
