const mongoose = require('mongoose')
const schema = mongoose.schema

const myschema = new schema({
    name: String,
    email: String,
    lastupdated: Date
})

myschema.pre('save', function(next){
    this.lastupdated = new Date()
    console.log("prep to save.....brrr....")
    next();
})

myschema.post('save', function(doc, next){
    console.log(`user ${doc.name} was saved at ${doc.lastupdated}`)
    next();
})

const user = mongoose.model('user', myschema)

const currentuser = new user({
    name: "jagmohan sharma",
    email: "jms21082003@gmail.com"
})

currentuser.save()
