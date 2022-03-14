const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const app = express()
app.use(express.json())
app.use(cors())

const oneDay = 1000 * 60 * 60 * 24;
app.use(expressSession({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// Helpers
const Errors = require("./Helpers/Errors") // Error codes
const Generators = require("./Helpers/Generators"); // Generators
const Checker = require("./Helpers/Checker"); // Custom functions

// Classes
const Register = require("./Classes/Register");
const Login = require("./Classes/Login");
const Session = require("./Classes/Session");
const Cart = require("./Classes/Cart");

// Database
const db_name = "abra-db" // DB name
const users_tbl = require('./Schema/UsersSchema')
const sessions_tbl = require('./Schema/SessionsSchema')
const products_tbl = require('./Schema/ProductsSchema')
const cart_tbl = require('./Schema/CartSchema')

mongoose.connect(`mongodb://localhost:27017/${db_name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to local DB'))
    .catch(console.error)

// var MongoClient = require('mongodb').MongoClient;

//MongoClient.connect(`mongodb://localhost:27017/${db_name}`, async function (err, db) {
    /*if (err) throw err;
    var dbo = db.db(db_name);


    const collections = ["users", "carts", "sessions", "products"]

    for (const collection of collections) {
        const exists = (await (await dbo.listCollections().toArray()).findIndex((item) => item.name === collection) !== -1)
        console.log(`${collection} not found -> creating it`)
        if (!exists) {
            dbo.createCollection(collection, function(err, res) {
                if (err) throw err;
                console.log("Collection created!");
                db.close();
            });
        }
    }
    });

    */






// Return response (information message to the frontend)
const returnResponse = (res, string) => {
    return res.status(200).json({
        statusCode: Errors[string]["code"],
        statusText: Errors[string]["text"]
    });
}

// Return data (data that will be used in the frontend)
const returnData = (res, data) => {
    return res.status(200).json({
        statusCode: 200,
        data: data
    });
}

// Handle adding / removing specific product (ID) from user cart
app.post("/CartProduct_AddRemove", async (req, res) => {
    const user_id = req.body.user_id
    const product_id = req.body.product_id

    // Check if product is in user cart
    const cart = new Cart(cart_tbl, user_id, product_id)
    const inCart = await cart.checkProductInCart()
    if (inCart.length) {
        // Remove from cart
        const removedFromCart = await cart.removeProductFromCart()
        if (removedFromCart) returnResponse(res, "PRODUCT_REMOVED_FROM_CART")
        else returnResponse(res, "ERROR_REMOVING_PRODUCT_FROM_CART")
    }
    else {
        // Add to cart
        const addedToCart = await cart.saveProductInCart()
        if (addedToCart) returnResponse(res, "PRODUCT_ADDED_TO_CART")
        else returnResponse(res, "ERROR_ADDING_PRODUCT_TO_CART")
    }
})

// Handle deleting product from user cart
app.delete("/DeleteUserProductFromCart", async (req, res) => {
    const user_id = req.body.user_id
    const product_id = req.body.product_id

    // Check if product exist in user cart
    const cart = new Cart(cart_tbl, user_id, product_id)
    const inCart = await cart.checkProductInCart()
    if (inCart) {
        // Delete product from user cart
        const deletedFromCart = await cart.removeProductFromCart()
        if (deletedFromCart) returnResponse(res, "PRODUCT_REMOVED_FROM_CART")
        else returnResponse(res, "ERROR_REMOVING_PRODUCT_FROM_CART")
    }
})

// Get user's cart products data
app.post("/GetUserCartProducts", async (req, res) => {
    const user_id = req.body.user_id
    const cart_products_data = await Checker.getUserCart(cart_tbl, user_id)

    // Store cart products IDs into array
    let userCartProductsIDs = []
    for (let cart_product_data of cart_products_data) {
        userCartProductsIDs.push(cart_product_data.product_id)
    }

    // Get cart products data
    let userCartProductsData = []
    for (let userCartProductsID of userCartProductsIDs) {
        let product_data = await Checker.getProductData(products_tbl, userCartProductsID)
        userCartProductsData.push(product_data)
    }

    returnData(res, userCartProductsData)
})

// Get user cart products IDs
app.post("/GetUserCartIDs", async (req, res) => {
    const user_id = req.body.user_id
    const cart_products_data = await Checker.getUserCart(cart_tbl, user_id)

    // Store cart products IDs
    let userCartProductsIDs = []
    for (let cart_product_data of cart_products_data) {
        userCartProductsIDs.push(cart_product_data.product_id)
    }

    returnData(res, userCartProductsIDs)
})

// Get all products
app.post("/GetProducts", async (req, res) => {
    let products = await products_tbl.find()
    returnData(res, products)
})

// Delete user session from DB
app.delete("/DeleteUserSession", async (req, res) => {
    const userid = req.body.id
    const secret = req.body.secret

    // Check if session exist in DB
    const session = new Session(sessions_tbl, userid, secret)
    await session.checkSession()
        .then(async session_found => {
            if (session_found) {
                await session.deleteSession()
                    .then(() => returnResponse(res, "200"))
            }
        })
})

// Check if user is logged
app.post("/CheckLogged", async (req, res) => {
    const userid = req.body.id
    const secret = req.body.secret

    // Check if session exist in DB
    const session = new Session(sessions_tbl, userid, secret)
    await session.checkSession()
        .then(session_found => {
            if (session_found) {
                returnResponse(res, "200")
            }
            else {
                returnResponse(res, "401")
            }
        })
})

// Handle login
app.post("/SubmitLogin", async (req, res) => {
    let reqEmail = req.body.email
    let reqPassword = req.body.password

    const login = new Login(reqEmail, reqPassword)

    // Check email
    const validEmail = login.checkEmail()
    if (!validEmail) returnResponse(res, "INVALID_EMAIL")

    // Check password
    const validPassword = login.checkPassword()
    if (!validPassword) returnResponse(res, "INVALID_PASSWORD")

    // Find email and compare hashed password
    if (validEmail && validPassword) {
        // Check if email exist
        const user = await Checker.checkEmailExist(users_tbl, reqEmail)
        if (!user) returnResponse(res, "WRONG_EMAIL_OR_PASSWORD")
        else {
            // Check hashed password
            const validHashedPassword = await bcrypt.compare(reqPassword, user.password)
            if (!validHashedPassword) returnResponse(res, "WRONG_EMAIL_OR_PASSWORD")
            else {
                // Generate secret key
                const secretKey = Generators.randString("30")

                // Save DB session
                const session = new Session(sessions_tbl, user._id, secretKey)
                await session.saveSession()
                    .then(created_session => {
                        if (created_session) {
                            // Return data to client to store (local session)
                            return res.status(200).json({
                                statusCode: 200,
                                data: {
                                    id: user._id,
                                    secret: secretKey
                                }
                            });
                        }
                        else {
                            returnResponse(res, "FAILED_TO_CREATE_ACCOUNT")
                        }
                    })
            }
        }
    }




})

// Handle register
app.post("/SubmitRegister", async (req, res) => {
    const reqEmail = req.body.email
    const reqPassword = req.body.password

    const register = new Register(reqEmail, reqPassword)

    // Check email
    const validEmail = register.checkEmail()
    if (!validEmail) returnResponse(res, "INVALID_EMAIL")

    // Check password
    const validPassword = register.checkPassword()
    if (!validPassword) returnResponse(res, "INVALID_PASSWORD")

    // Check if email is in use
    const emailUsed = await Checker.checkEmailExist(users_tbl, reqEmail)
    if (emailUsed) returnResponse(res, "USED_EMAIL")
    else {

        await register.createUser(users_tbl)
        .then(created_user => {
            if (created_user) {
                returnResponse(res, "200")
            }
            else {
                returnResponse(res, "FAILED_TO_CREATE_ACCOUNT")
            }
        })
    }
})


app.use((req,res, next)=>{
    res.setHeader('Access-Control-Allow-Origin',"http://localhost:3000");
    res.setHeader('Access-Control-Allow-Headers',"*");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(3001);
