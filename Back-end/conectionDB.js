require("dotenv").config()
const mongoose=require("mongoose")
const mongoURI=process.env.MONGOURL
const connectDB= async ()=>{
    try{
        // const {mongoURI}=config
        await mongoose.connect(mongoURI)
        console.log("DataBase Connected")

    }catch(error){
        console.log("error:",error)
        console.log("DataBase Disconnected")        
    }
}
module.exports=connectDB