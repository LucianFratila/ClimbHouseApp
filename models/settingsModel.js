const mongoose = require('mongoose');


let settingsSchema = mongoose.Schema({
    
        adultPrice:{
            type:Number,
        },
        kidPrice:{
            type:Number
        }
        
   

})

let Settings = module.exports = mongoose.model("Settings", settingsSchema);