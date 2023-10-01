const experss = require('express')
const authRoute = experss.Router()
const validateToken = require('../middleware/validateToken')

const {postRegister, postlogin, getCurrent} = require('../controller/authController')
const { get } = require('mongoose')

authRoute.route('/register').post(postRegister)
authRoute.route('/login').post(postlogin)
authRoute.route('/current/:id').get(validateToken, getCurrent)


module.exports = authRoute