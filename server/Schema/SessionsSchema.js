const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SessionsSchema = new Schema({
    userid: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true,
        default: Date.now
    }
})

const Sessions = mongoose.model("Sessions", SessionsSchema)

module.exports = Sessions
