const express = require("express");
const app = express();
const router = express.Router();
const Travel = require("./Schema.js");

app.use(express.json());

router.get("/", async (req, res) => {
  try {
    const NewPlace = await Travel.find();
    console.log("NewPlace: ", NewPlace);
    res.send(NewPlace);
  } catch (err) {
    console.log("error",err);
  }
});


module.exports = router;