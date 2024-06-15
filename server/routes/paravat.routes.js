const express = require("express");
const router = express.Router();
const { addparavat } = require("../controllers/paravat.controller.js");
router.post("/add", addparavat);
module.exports = router;
