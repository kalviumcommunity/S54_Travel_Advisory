const mongoose=require("mongoose")
const schema = new mongoose.Schema({
  State:{
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
  location:{
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
})

const Travel = mongoose.model("Travel_Advisory",schema);
module.exports=Travel;