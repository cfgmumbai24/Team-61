const express = require("express");
const router = express.Router();
const {addgoats} = require("../controllers/goat.controller.js");
router.post("/add", addgoats);
module.exports = router;
