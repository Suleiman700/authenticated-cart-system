import React, { useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DemoPic from "../../demo.jpg"
import Session from "../../Func/SessionFunc";
import RequestsFunc from "../../Func/RequestsFunc"

import Notification from "../../Func/Notification";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';

function Home() {
    const navigate = useNavigate();
    const [state, setState] = useState([])

    useEffect(() => {
        checkLogged()
        getCart()
    }, [])

    // Check if logged
    const checkLogged = async () => {
        const isLogged = await Session.checkLogged()
        if (!isLogged) navigate("/login");
    }

    // Get user cart
    const getCart = async () => {
        const user_id = Session.getSessionUserID()

        const requestOptions = {
            endpoint: "GetUserCartProducts",
            method: "POST",
            body: JSON.stringify({user_id: user_id,})
        }
         await RequestsFunc.sendRequest(requestOptions)
             .then((res) => {
                 const data = res.data
                 setState(data)
             })
    }

    // Handle deleting product from cart
    const handleCartDelete = async (product_id) => {
        const user_id = await Session.getSessionUserID()

        const requestOptions = {
            endpoint: "DeleteUserProductFromCart",
            method: "DELETE",
            body: JSON.stringify({user_id: user_id, product_id: product_id})
        }

        await RequestsFunc.sendRequest(requestOptions)
            .then((res) => {
                // Show notification
                Notification.showNotification("info", res.statusText)

                // Remove product from state
                const data = state.filter(product => product._id !== product_id)

                // Update state
                setState(data)
            })
    }

    return (
        <React.Fragment>
            {<Header/>}
            <div className="container text-center mt-5 pt-5">
                <h2>Your Cart!</h2>
                {state.length? "": "No products has been found in your cart..."}
                <table className="table table-responsive table-hover table-striped mt-5" style={{display: `${state.length? "":"none"}`}}>
                    <thead className="">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Picture</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Options</th>
                    </tr>
                    </thead>
                    <tbody className="">
                    {
                        state.map((product, i) =>
                            <tr key={product._id}>
                                <th>{i+1}</th>
                                <th><img src={DemoPic} className="img-fluid img-thumbnail" alt="product_picture" width={50} /></th>
                                <td>{product.name}</td>
                                <td>{product.desc}</td>
                                <td>₪{product.price}</td>
                                <td><button className="btn btn-danger btn-sm" onClick={() => handleCartDelete(product._id)}><span className="fa fa-trash text-white" /></button></td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            {/*{<Footer />}*/}
            <NotificationContainer/>
        </React.Fragment>
    )
}

export default Home
