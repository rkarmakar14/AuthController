const mongoose = require('mongoose')

const productModel = new mongoose.Schema({
  product_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
  },
    ProductName:{
        type:String,
        required: true,
    },
    ProductPrice:{
        type:Number,
        required: true,
    },
    ManufacturingDate:{
        type:String,
        required: true,
    }
})


module.exports = mongoose.model('Products', productModel)