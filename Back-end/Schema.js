const mongoose = require(mongoose)
const schema = new mongoose.schema({
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

const dataModel = mongoose.model("Travel_Advisory",schema);
module.exports=dataModel;