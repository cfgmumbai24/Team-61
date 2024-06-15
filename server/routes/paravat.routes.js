const express = require("express");
const router = express.Router();
const { createParavat } = require("../controllers/paravat.controller.js");
router.post("/add", createParavat);
module.exports = router;
