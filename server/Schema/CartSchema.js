const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    product_id: {
        type: String,
        required: true,
    },
})

const Cart = mongoose.model("Cart", CartSchema)

module.exports = Cart
