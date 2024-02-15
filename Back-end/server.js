const express = require('express');
const app = express()
app.listen(3000)
const router = require("./Routes");
const cors = require("cors");
app.use(cors());
app.use("/Travel ", router);
require("dotenv").config()
const PORT = process.env.PORT || 5000


const connectDB=require("./conectionDB")
connectDB()
app.get('/ping', (req, res) => 
  res.send('pong'));
app.get("/",(req,res)=>{
  res.send("Hello world, My api is working")
})
app.listen(PORT,()=>{
  console.log(`http://localhost:${PORT}/`)
})




