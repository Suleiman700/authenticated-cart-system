import React, { Component } from 'react';
import Logo from "../logo.svg"
import "../App.css"
import SessionFunc from "../Func/SessionFunc"
import RequestsFunc from "../Func/RequestsFunc"
import {useNavigate} from "react-router-dom";

function Header() {

    const navigate = useNavigate();
    const handleLogout = () => {
        SessionFunc.removeSession() // Remove local session
        SessionFunc.removeDBSession() // Remove DB session
        navigate("/login")
    }

    const routeChange = (path) => {
        navigate(path);
    }

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container-fluid">
                    <img src={Logo} alt="" width="30" height="24" />
                    <span className="navbar-brand pointer" onClick={() => routeChange("/home")}>Navbar</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <span className="nav-link pointer" onClick={() => routeChange("/home")}>Home</span>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link pointer" onClick={() => routeChange("/cart")}>Cart</a>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <button className="btn btn-outline-danger" onClick={() => handleLogout()}>Logout</button>
                        </div>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Header
