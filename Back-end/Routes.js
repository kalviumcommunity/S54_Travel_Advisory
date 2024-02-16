const express = require("express");
const app = express();
const router = express.Router();
const Travel = require("./Schema.js");

app.use(express.json());
router.use(express.json())
router.get("/Travel", async (req, res) => {
  try {
    const NewPlace = await Travel.find();
    console.log("NewPlace: ", NewPlace);
    res.send(NewPlace);
  } catch (err) {
    console.log("error",err);
  }
});

// post a new data
router.post("/Travel", async (req, res) => {
  const data=req.body
  const newUserTravel= new Travel(data)
  console.log(newUserTravel)
  try {
    await newUserTravel.save()
    res.send({message:true,data:newUserTravel})
  } catch (err) {
    res.send({message:false,response:"please verify the code .",error:err})
  }
});


//  Updates the data 

router.put("/Travel/:id", async (req, res) => {
  try {
    const id=req.params.id
    const newData=req.body
    const updatedTravel=await Travel.findByIdAndUpdate(id,newData,{new:true})
    res.send({message:true,data:"data Updated succesfully.",updatedTravel:updatedTravel})
  } catch (err) {
    console.log("error");
    res.send({message:false,response:"please verify the code .",error:err})
  }
});




// Delete the data 
router.delete("/Travel/:id", async (req, res) => {
  try {
    const id=req.params.id
    const data=req.data
    const deleteddata=await Travel.findByIdAndDelete(id)
    res.send({message:true,data:"data Deleted succesfully.",data:deleteddata})
  } catch (err) {
    console.log("error");
    res.send({message:false,response:"Please check here their is an error",error:err})
  }
});


module.exports = router;