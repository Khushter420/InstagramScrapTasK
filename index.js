const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");

const userRoutes = require("./routes/route");

// get config vars
dotenv.config();
// app.use(cors());

//app.use(bodyParser.urlencoded());  ////this is for handling forms
// app.use(express.json()); //this is for handling jsons

app.use(bodyParser.json());
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended:true}))
app.use("", userRoutes);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});
