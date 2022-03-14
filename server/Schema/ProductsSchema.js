const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: false,
    },
    barcode: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    }
})

const Products = mongoose.model("Products", ProductsSchema)

module.exports = Products
