const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = require('../model/authModel')

const postRegister = asyncHandler(async(req,res) => {
    const {FirstName, LastName, Email, Password} = req.body

    if(!(FirstName && LastName && Email && Password)){
        res.status(401)
        throw new Error(`All Fields are mandatory`)
    }
    const data = await user.findOne({Email})
    console.log(data)
    if(data){
            res.status(400)
            throw new Error(`User is already register`)
        }
        const new_password = await bcrypt.hash(Password,10)
        console.log(new_password)
        const new_data = await user.create({
            FirstName,
            LastName, 
            Email, 
            Password: new_password,
        })
        res.status(200).json({
            message: `Register successful`,
            UserFirstName: new_data.FirstName,
            UserLastName:new_data.LastName,
            userEmail:new_data.Email
        })
})

const postlogin = asyncHandler(async(req,res) => {

    const{Email,Password} = req.body

    if(!(Email && Password)){
        res.status(401)
        throw new Error(`Please enter the email and Password`)
    }
    const data = await user.findOne({Email})

    if(!data){
        res.status(400)
        throw new Error(`Email id does not match`)
    }
    const secret = process.env.ACCESS_SECRET
    console.log(secret)

    if(data && await bcrypt.compare(Password, data.Password)){
        const token = jwt.sign(
            {
            data:{
                id:data.id,
                Email:data.Email,
                Password:data.Password
                },
            }, secret,
            {
                expiresIn:'2h'
            }
        )
        res.status(200).json({
                message:`Login succesful`,
                user_id:data._id,
                Access_token:token
            })
    }
    else{
        res.status(401)
        throw new Error(`Unauthorized access`)
    }
})

const getCurrent = asyncHandler(async(req,res) => {
    const data = await user.findById(req.params.id)
    console.log(data)
    res.status(200).json({
        message:`This current User`,
        User_deatils:data,
    })
    res.status(200).json(`This is current user`)
})

module.exports = {postRegister, postlogin, getCurrent}