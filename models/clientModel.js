const mongoose = require('mongoose');

let clientsSchema = new mongoose.Schema({
    name:{
        type:String
        
    },
    
    date:{type: Date, default: Date.now},
    timeStamp:{type:Number,default:Date.now},

    email:{
        type:String,
        unique:true 
    },
    phone:{
        type:String,
        unique:true 
    },
    timeIn:{
        type: Number,
        default: 0
    },
    timeOut:{
        type: Number,
        default: 0
    },
    finalTime:{
        type: Number,
        default: 0
    },
    status:{
        type: Boolean,
        default: false
    },
    terms:{
        type: Boolean,
        default: false
    },
    startTime:{
        type: String,
        default:0
    },
    adults:{
        type: Number,
        default:0
    },
    kids:{
        type: Number,
        default:0
    },
    minikids:{
        type: Number,
        default:0
    },
    adultsRemaining:{
        type: Number,
        default:0
    },
    kidsRemaining:{
        type: Number,
        default:0
    },
    adultsClients:[{
        name:{
            type:String,
        },
        timeIn:{
            type: Number,
            default: 0
        },
        timeOut:{
            type: Number,
            default: 0
        },
        endTime:{
            type: String,
            default:''
        },
        status:{
            type: Boolean,
            default:false
        },
        startTime:{
            type: String,
            default:0
        },
        endTime:{
            type: String,
            default:0
        },
        due:{
            type:Number,
            default:0
        },
        
    }],
    noOfpeopleClimbing:{
        type: Number,
        default:0
    },
    payed:{
        type: Number,
        default:0
    },
    paused:{
        type: Number,
        default:0
    },
    resume:{
        type: Number,
        default:0
    },
    totalPausedRAM:{
        type:Number,
        default:0
    },
    totalPaused:{
        type:Number,
        default:0
    },
    elapsedOnPaused:{
        type:Number,
        default:0
    },
    pausedStatus:{
        type:Boolean,
        default:false
    },
    due:{
        type:Number,
        default:0
    },
    dueList:[{
        climber:{
            type:String,
        },
        due:{
            type:Number
        }
    }],
    prodHistory:[{
        productName:{
            type:String,
        },
        price:{
            type:Number
        },
        qty:{
            type:Number
        },
        total:{
            type:Number
        }
    }],
    
    statusSub:{
        type:Boolean,
        default:false
    },
    initialSub:{
        type:Number,
        default:16
    },
    remainigSub:{
        type:Number,
        default:0
    },
    sessionHistory:[{
        admin:{
            type:String,
        },

        totalTime:{
            type:Number
        },
        kids:{
            type:Number
        },
        adults:{
            type:Number
        },
        due:{
            type:Number
        },
        kickedOF:{
            type:Boolean,
            default:false
        },
        timeIn:{
            type:String
        },
        dateLog:{
            type:Number
        }
    }]
        
    
   
})


let Client = module.exports = mongoose.model("Client", clientsSchema);