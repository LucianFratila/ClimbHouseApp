const mongoose = require('mongoose');


let productsSchema = mongoose.Schema({
    
        productName:{
            type:String,
        },
        price:{
            type:Number
        }
        
   

})

let Products = module.exports = mongoose.model("Products", productsSchema);