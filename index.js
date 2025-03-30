const express = require('express')
const {usermodel, todomodel, mongo_uri} = require("./db.js")
const {auth, jwtsecret, jwt} = require("./auth.js")
const mongoose = require('mongoose')


const app = express()
app.use(express.json())

mongoose.connect(mongo_uri).then(function(){
    console.log("mongo connected")
}).catch(function(error){
    console.log(error)
})

app.get('/', function(req, res){
    res.send("/ route ok")
})

app.post('/signup', async function(req, res){
    try{
        //name email and password
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        await usermodel.create({
            name: name,
            email: email,
            password: password
        })
        res.json({
            message: "you are signed up"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
})

app.post('/signin', async function(req, res){
    const email = req.body.email
    const password = req.body.password

    const response = await usermodel.findOne({
        email: email,
        password: password
    })
    if(response){
        const token = jwt.sign({
            id: response._id.toString()
        }, jwtsecret)
        res.status(200).json({
            token: token
        })
    }
    else{
        res.status(403).json({
            message: "invalid sigin credentials"
        })
    }

})

app.post('/todo', auth, async function(req, res){
    try{
        const userid = req.userId
        const todo = req.body.todo
        const isdone = req.body.isdone
        await todomodel.create({
            userId: userid,
            title: todo,
            done: isdone
        })
        res.json({
            message: "posted your todos hurray!"
        })
    }
    catch(error){
        res.status(400).json({
            message: "some error has occured"
        })
    }
})

app.get('/todos',auth, async function(req, res){
    try{
        const userid = req.userId
        const response = await todomodel.find({
            userId: userid
        }).select("title")
        res.status(200).json({
            todos: response
        })
    }
    catch(error){
        res.status(403).json({
            message: error.message
        })
    }
})

app.listen(3000, function(){
    console.log("app started on 3000 port")
})