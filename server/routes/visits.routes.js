const express = require("express");
const {
  visitadd,
  visitget,
  updateVisitStatus,
  getVisitsByParavatId,
} = require("../controllers/visits.controller");
const router = express.Router();

router.post("/add", visitadd);
router.get("/find", visitget);
router.put("/update", updateVisitStatus);
router.get("/find/:paravatId", getVisitsByParavatId);
module.exports = router;
