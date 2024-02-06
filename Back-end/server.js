const express = require('express');
const app = express()
app.listen(3000)

const connectDB=require("./conectionDB")
connectDB()
app.get('/ping', (req, res) => 
  res.send('pong'));



