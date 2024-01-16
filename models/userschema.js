const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    img:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    tasks:[
        {
            title:{
                type:String,
                require:true
            },
            description:{
                type:String,
                require:true
            },
            date:{
                type:Date,
                require:true
            },
            completed:{
                type:Boolean,
                require:true,
                default:false
            },
            important:{
                type:Boolean,
                require:true,
                default:false
            },
            incomplete:{
                type:Boolean,
                require:true,
                default:false
            }
        }
    ]
})

const user = mongoose.model('USER' , userSchema)
module.exports=user