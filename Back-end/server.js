const express = require('express');
const app = express()
app.listen(3000)
const router = require("./Routes");
const cors = require("cors");
app.use(cors());
app.use("/Travel ", router);


const connectDB=require("./conectionDB")
connectDB()
app.get('/ping', (req, res) => 
  res.send('pong'));




