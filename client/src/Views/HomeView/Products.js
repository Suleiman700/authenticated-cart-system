import {useEffect, useRef, useState} from "react";
import RequestsFunc from "../../Func/RequestsFunc"
import Demo from "../../demo.jpg"
import SessionFunc from "../../Func/SessionFunc";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";


import Notification from "../../Func/Notification";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';

function Products() {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);


    const [state, setState] = useState([]);

    useEffect(() => {
        GetProducts()
    }, [])


    const GetProducts = async () => {
        // Get products
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/GetProducts`, {method: "POST"});
        const json = await response.json();
        let products = json.data

        // Update state
        // setState(json.data);

        // Get user cart
        const user_id = SessionFunc.getSessionUserID()
        const requestOptions = {
            endpoint: "GetUserCartIDs",
            method: "POST",
            body: JSON.stringify({user_id: user_id,})
        }
        await RequestsFunc.sendRequest(requestOptions)
            .then(res => {
                // User favorite products IDs
                const fav_products = res.data

                // Store checked products
                let checkedProducts = []

                // Get products favorite info
                for (let product of products) {
                    // Check if product is in favorites
                    product.fav = !!fav_products.find(id => id === product._id)
                    // Save product
                    checkedProducts.push(product)
                }

                // Update state
                setState(checkedProducts)
            })

    }

    // Handle favorite
    const handleFavorite = async (product_id) => {
        const user_id = SessionFunc.getSessionUserID();
        const requestOptions = {
            endpoint: "CartProduct_AddRemove",
            method: "POST",
            body: JSON.stringify({product_id: product_id, user_id: user_id})
        }
        const response = await RequestsFunc.sendRequest(requestOptions)

        // Show notification
        createNotification("info", response.statusText)

        // refresh data
        await GetProducts()

    }

    const createNotification = (type, text) => {
        Notification.showNotification(type, text)
    };



    return (
        <div className="col-12 mt-3 d-flex justify-content-center">
            <Modal show={showModal} onHide={handleClose} className="text-center">
                <Modal.Header closeButton>
                    <Modal.Title>Demo Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you're reading this text in a modal!
                    <br />
                    Here should be the product details :)
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-info text-white" onClick={handleClose}>Ok</button>
                </Modal.Footer>
            </Modal>

            <div className="row">
                {state.length? "": "No products has been found..."}
                {
                    state.map((product, i) =>
                        <div className="col-12 col-md-4 mt-5" key={i}>
                            <div className="card">
                                <img className="card-img-top" src={Demo} alt="Card image cap"/>
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.desc}</p>
                                    <h6>₪{product.price}</h6>
                                    <button className={"btn " + (product.fav? "btn-success":"btn-outline-info")} onClick={() => handleFavorite(product._id)}>{product.fav? "Added to cart":"Add to cart"}</button>
                                    <a href="#" className="btn btn-info text-white mx-1" onClick={() => handleShow()}><span className="fa fa-eye" /> View</a>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <NotificationContainer/>
        </div>
    )
}

export default Products
