import React, { Component } from 'react';
import {useNavigate} from "react-router-dom";

function Footer() {

    const navigate = useNavigate()
    const routeChange = (path) => {
        navigate(path);
    }

    return (
        <React.Fragment>
            <div className="d-flex flex-column bg-light mt-5">
                <footer className="mt-auto">
                    <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                        <div className="me-5 d-none d-lg-block">
                            <span>Get connected with us on social networks:</span>
                        </div>
                        <div>
                            <a href="#" className="me-4 text-reset">
                                <i className="fa fa-facebook-f" />
                            </a>
                            <a href="#" className="me-4 text-reset">
                                <i className="fa fa-github"/>
                            </a>
                        </div>
                    </section>
                    <section className="">
                        <div className="container text-center text-md-start mt-5">
                            <div className="row mt-3">
                                <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-4">
                                    <h6 className="text-uppercase fw-bold mb-4">
                                        <i className="fa fa-info me-3"/>Company name
                                    </h6>
                                    <span>
                                        Here you can use rows and columns to organize your footer content. Lorem ipsum
                                        dolor sit amet, consectetur adipisicing elit.
                                    </span>
                                </div>
                                <div className="col-md-4 col-lg-2 col-xl-2 mx-auto mb-4">
                                    <h6 className="text-uppercase fw-bold mb-4">
                                        Useful links
                                    </h6>
                                    <span>
                                        <p className="pointer" onClick={() => routeChange("/home")}>Products</p>
                                    </span>
                                    <span>
                                        <p className="pointer" onClick={() => routeChange("/cart")}>Cart</p>
                                    </span>
                                </div>
                                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                    <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                    <span><i className="fa fa-home me-3"/> New York, NY 10012, US</span>
                                    <span>
                                        <i className="fa fa-envelope me-3"/>
                                        info@example.com
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="text-center p-4">
                        © 2021 Copyright:
                        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">MDBootstrap.com</a>
                    </div>
                </footer>
            </div>
        </React.Fragment>
    )
}

export default Footer
