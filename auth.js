const jwt = require('jsonwebtoken')
const jwtsecret = "mytopsecret"

function auth(req,res,next){
    const token = req.body.token
    const response = jwt.verify(token, jwtsecret)
    if(response){
        req.userId = token.userId
        next();
    }
    else{
        res.status(403).json({
            message: "invalid credentials"
        })
    }
}

module.exports = {
    auth,
    jwtsecret,
    jwt
}
