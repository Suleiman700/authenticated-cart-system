import React, {Component, useCallback, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap
import 'font-awesome/css/font-awesome.min.css'; // Fontawesome icons

import Redirect from "./Views/HomeView/Home"
import Home from "./Views/HomeView/Home"
import Cart from "./Views/CartView/Cart"
import Login from "./Views/LoginView/Login"
import Register from "./Views/RegisterView/Register"


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/home"/>} />
                <Route exact path="/home" element={<Home/>}/>
                <Route exact path="/cart" element={<Cart/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/register" element={<Register/>}/>
            </Routes>
        </Router>
    );
}

export default App;
