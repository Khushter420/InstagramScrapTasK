const express = require("express");

const controller = require("../controller/controller.js");
const router = express.Router();

router.get("/getInstaDetail", controller.fetchData);

module.exports = router;
