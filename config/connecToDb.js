
const mongoose = require("mongoose")


const connecToDb = async () =>{

    try {
        
    await mongoose.connect(process.env.DB_URL)
    console.log("connected to database")
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = connecToDb;