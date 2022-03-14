const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
})

const Users = mongoose.model("Users", UsersSchema)

module.exports = Users
