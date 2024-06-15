const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisitsSchema = new Schema({
  paravatId: { type: String },
  beneficiaryId: { type: String },
  status: { type: String, enum: ["Pending", "Completed", "Incomplete"] },
  date: { type: Date },
});

module.exports = mongoose.model("Visits", VisitsSchema);
