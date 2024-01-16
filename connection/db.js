const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:"./config.env"})

const connection = async()=>{
    try {
        const data = await mongoose.connect(process.env.DATABASE)
        if(data){
            console.log('Connection Successful');
        }
    } catch (error) {
         console.log(error);
    }
}

connection()