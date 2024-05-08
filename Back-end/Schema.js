const mongoose=require("mongoose")
const schema = new mongoose.Schema({
  state:{
    type:String,
    require:true,
  },
  name:{
    type:String,
    require:true,
  },
  rating:{
    type:Number,
    require:true,
  },
  img:{
    type:String,
    require:true,
  },
  google_map_location:{
    type:String,
    require:true,
  },
  location:{
    type:String,
    require:true,
  },
  infrastructure:{
    type:String,
    require:true,
  },
  review:{
    type:String,
    require:true,
  },
})
const Datatype=mongoose.Schema({
  FirstName:String,
  Email:String,
  Password:String,
  ConfirmPassword:String,
  DOB:String
})

const FormdataModel=mongoose.model("FormList",Datatype)
const Travel = mongoose.model("Travel_Advisory",schema);
module.exports={Travel,FormdataModel};