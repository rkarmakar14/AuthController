const experss = require('express')
const { get } = require('mongoose')


const {getProduct, getProductbyId, putProductbyid, postProduct, deleteProductbyid} = require('../controller/productController')
const validateToken = require('../middleware/validateToken')

const myRoutes = experss.Router()

myRoutes.use(validateToken)

myRoutes.route('/').get(getProduct)

myRoutes.route('/:id').get(getProductbyId)

myRoutes.route('/').post(postProduct)

myRoutes.route('/:id').put(putProductbyid)

myRoutes.route('/:id').delete(deleteProductbyid)

module.exports = myRoutes