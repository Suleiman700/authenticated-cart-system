import React, {Component, useCallback, useEffect, useState} from "react";
import ValidateEmail from "../../Validations/ValidateEmail"
import SessionFunc from "../../Func/SessionFunc"
import RequestsFunc from "../../Func/RequestsFunc"
import {useNavigate} from "react-router-dom";

function Register() {
    // Store alert message
    const [message, setMessage] = useState({text: ""})

    // Store login validation data
    const [state, setState] = useState({
        email_valid: true,
        email_message: "", // Can store error messages in the future
        password_valid: true,
        password_message: "", // Can store error messages in the future
    })

    // Input on change
    const handleChange = e => {
        /*
        When input has border-danger class and triggers onChange event, it will update the state and will remove the border-danger class
         */
        // Update state
        setState((prevState) => ({
            ...prevState,
            [e.target.id + "_valid"]: true,
        }))

        // Update state
        setMessage((prevState) => ({
            text: ""
        }))
    }

    // Update message state
    const updateMessageState = message => {
        setMessage((prevState) => ({
            text: message
        }))
    }

    // Handle form submit
    const handleSubmit = event => {
        event.preventDefault()

        const email = event.target[0].value
        const password = event.target[1].value

        // ================= [ Check Email ] =================
        // Store temp data
        let temp_email_valid
        // Validate
        const email_validation = ValidateEmail(email)
        // Update temp data
        if (!email_validation.valid) temp_email_valid = false
        else temp_email_valid = true
        // ===================================================

        // ================ [ Check Password ] ===============
        // Store temp data
        let temp_password_valid
        // Update temp data
        temp_password_valid = password.length;
        // ===================================================

        // Update state
        setState((prevState) => ({
            ...prevState,
            email_valid: temp_email_valid,
            password_valid: temp_password_valid
        }))

        // Send request
        if (temp_email_valid && temp_password_valid) {
            submitData({
                email,
                password
            })
        }
    }

    // Ajax
    const submitData = async (userdata) => {
        // Send request
        const requestOptions = {
            endpoint: "SubmitRegister",
            method: "POST",
            body: JSON.stringify({email: userdata.email, password: userdata.password,})
        }

        // Handle response
        const data = await RequestsFunc.sendRequest(requestOptions)
            .then(data => {
                if (data.statusCode === 200) {
                    window.location.href = "/login";
                }
                else {
                    updateMessageState(data.statusText)
                }
            })
    }

    useEffect(() => {
        checkLogged()
    }, [])

    // Check if logged
    const navigate = useNavigate();
    const checkLogged = async () => {
        const isLogged = await SessionFunc.checkLogged()
        if (isLogged) navigate("/home");
    }

    return (
        <React.Fragment>
            <div className="container mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 p-0">
                            <div className="login-card">
                                <h4 className="text-center">Register</h4>
                                {(message['text'] ?
                                    <div className="alert alert-info text-center">{message['text']}</div> : '')}

                                <form className="theme-form login-form" onSubmit={handleSubmit}>

                                    <div className="form-group mt-3">
                                        <label htmlFor="email">Email Address</label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="fa fa-at"/>
                                            </span>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                className={"form-control " + (!state['email_valid'] ? "border-danger" : "")}
                                                required="required"
                                                placeholder="Test@gmail.com"
                                                onChange={e => handleChange(e)}/>
                                        </div>
                                    </div>

                                    <div className="form-group mt-3">
                                        <label htmlFor="password">Password</label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="fa fa-key"/>
                                            </span>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                className={"form-control " + (state['password_valid'] ? "" : "border-danger")}
                                                required="required"
                                                placeholder="*********"
                                                onChange={e => handleChange(e)}/>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center text-center">
                                        <div className="form-group mt-3">
                                            <button className="btn btn-primary" type="submit">Register</button>
                                            <p>Already have account? <a href="login">Login</a></p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Register
