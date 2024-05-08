const express = require("express");
const app = express();
const router = express.Router();
const validation=require("./joivalidation");
const { Travel, FormdataModel } = require("./Schema");
const jwt = require('jsonwebtoken');
require("dotenv").config();

app.use(express.json());
router.use(express.json())

const validateRequest = (req, res, next) => {
  const { error } = validation.validate(req.body);
  if (error) {
      return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

//////////////////Creating the form//////////////////
router.post('/formcreation', async (req, res) => {
  try {
    //Error Validation......
    // const { error } = FormValidation.validate(req.body); 
    // if (error) {
    //   return res.json({ success: false, Message: error.details[0].message });
    // }
    ////Checking if the user exists or not.........
    const { Email } = req.body; 
    const user = await FormdataModel.findOne({ Email: Email });
    if (user && user.Email === Email) {
      res.json({ success: true, Message: "This user alreday exist please login with the another user name" })}
    else{
      const newData = new FormdataModel(req.body);
      const savedData = await newData.save();
      res.json({ success: true, data: savedData });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { Password, Email } = req.body;
    const user = await FormdataModel.findOne({ Email: Email, Password: Password });

    if (user && user.Password === Password && user.Email === Email) {

      const token = jwt.sign({ userId: user._id, email: user.Email },process.env.secret, { expiresIn: '7d' });

      res.json({ success: true, Message: "Login Success" ,token});
    } else {
      res.json({ Message: "Login Failed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/travel/Add",validateRequest,  async (req, res) => {
  try {
      const newUser = await Travel.create(req.body);
      if (newUser) {
          res.status(201).json(newUser);
      } else {
          res.status(400);
          throw new Error("Failed To Create User");
      }
  } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
  }
});



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
router.post("/travel/Data", async (req, res) => {
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