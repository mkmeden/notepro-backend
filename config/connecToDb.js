
const mongoose = require("mongoose")
if(process.env.NODE_ENV!='production')
    require("dotenv").config()

const connecToDb = async () =>{

    try {
        
    await mongoose.connect(process.env.DB_URL)
    console.log("connected to database")
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = connecToDb;