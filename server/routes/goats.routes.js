const express = require("express");
const { addGoats } = require("../controllers/goat.controller");
const router = express.Router();
router.post("/add", addGoats);
module.exports = router;
