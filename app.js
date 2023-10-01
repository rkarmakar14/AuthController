const mongoose = require('mongoose')
const experss = require('express')
const app = experss()
const dotenv = require('dotenv').config()
const connectDb = require('./config/databaseDB')

const PORT = process.env.PORT

app.use(experss.json())
app.use('/api/products', require('./Routes/productRoutes'))
app.use('/api/users', require('./Routes/authRoutes'))
connectDb()

app.listen(PORT, (req,res) =>{
    console.log(`Server is Running in port ${PORT}`)
})

