import React, { useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Products from "./Products"; // Products
import SessionFunc from "../../Func/SessionFunc";

function Home() {

    useEffect(() => {
        checkLogged()
    }, [])

    // Check if logged
    const checkLogged = async () => {
        const isLogged = await SessionFunc.checkLogged()
        if (!isLogged) navigate("/login");
    }

    const navigate = useNavigate()
    const routeChange = (path) => {
        navigate(path);
    }

    return (
        <React.Fragment>
            {<Header/>}
            <div className="wrapper pt-5 min-vh-100">
                <div className="container text-center mt-5">
                    <h2>Your Homepage!</h2>
                    {<Products />}
                </div>
            </div>
            {<Footer />}
        </React.Fragment>
    )
}

export default Home
