const mongoose = require('mongoose')
const config = require('dotenv').config()
const mongo_uri = process.env.MONGO_URI


const user = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String
})

const todo = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    done: Boolean
})

const usermodel = mongoose.model('users', user)
const todomodel = mongoose.model('todos', todo)

module.exports = {
    usermodel, 
    todomodel,
    mongo_uri
}