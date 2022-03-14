// All errors codes and information are located here
/*
    Invalid codes: 100XXX
    Used data: 200XXX
    Available data: 300XXX
    DB codes: 400XXX
 */
const errors = {
    "200": {
        code: 200,
        text: "A successful request!"
    },
    "401": {
        code: 401,
        text: "Unauthorized!"
    },
    "404": {
        code: 404,
        text: "Not Found!"
    },
    "500": {
        code: 500,
        text: "Internal Server Error!"
    },


    "INVALID_EMAIL": {
        code: 100001,
        text: "Please enter a valid email address!"
    },
    "INVALID_PASSWORD": {
        code: 100002,
        text: "Please enter a valid password!"
    },
    "WRONG_EMAIL_OR_PASSWORD": {
        code: 100003,
        text: "Wrong email address or password!",
        call: "POST::SubmitLogin",
    },


    "USED_EMAIL": {
        code: 200001,
        text: "Sorry, This email address is already in use!"
    },


    "AVAILABLE_EMAIL": {
        code: 300001,
        text: "Good email :)"
    },


    "FAILED_TO_CREATE_ACCOUNT": {
        code: 400001,
        text: "Sorry, An error occurred while creating your account!",
        info: "An error occurred while creating user account => Error in (createUser) function",
        call: "POST::SubmitRegister",
        ans: "Classes/Register::createUser()"
    },
    "ACCOUNT_CREATED_SUCCESSFULLY": {
        code: 400002,
        text: "Account has been successfully created!",
        call: "POST::SubmitRegister",
        ans: "Classes/Register::createUser()"
    },
    "PRODUCT_ADDED_TO_CART": {
        code: 400003,
        text: "Product has been added to cart!",
        call: "POST::CartProduct_AddRemove",
    },
    "ERROR_ADDING_PRODUCT_TO_CART": {
        code: 400004,
        text: "An error occurred while adding product to cart!",
        call: "POST::CartProduct_AddRemove",
    },
    "PRODUCT_REMOVED_FROM_CART": {
        code: 400005,
        text: "Product has been removed from cart!",
        call: "POST::CartProduct_AddRemove",
    },
    "ERROR_REMOVING_PRODUCT_FROM_CART": {
        code: 400006,
        text: "An error occurred while removing product from cart!",
        call: "POST::CartProduct_AddRemove",
    },

}

module.exports = errors
