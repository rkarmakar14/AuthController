const expressAsyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken')
const secret = "pass1234"

const validateToken = (req,res,next) =>{
    let token;
    const authHeader = (req.headers.authorization || req.headers.Authorization)
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1]
        jwt.verify(token,secret,(err, decoded) =>{
            if(err){
                res.status(400)
                throw new Error(`Token is not valid`)
            }
            req.users = decoded.data
            next()
        })
    }
    if(!token){
        res.status(400)
        throw new Error(`Token is not available`)
    }
}

module.exports = validateToken