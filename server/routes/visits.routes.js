const express = require("express");
const {
  visitadd,
  visitget,
  updateVisitStatus,
} = require("../controllers/visits.controller");
const router = express.Router();

router.post("/add", visitadd);
router.get("/find", visitget);
router.put("/update", updateVisitStatus);
module.exports = router;
