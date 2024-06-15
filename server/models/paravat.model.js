const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParavatSchema = new Schema({
  userId: {type: String},
  name: { type: String },
  address: { type: String },
  PhoneNumber: { type: Number },
  Email: { type: String },
  
});

module.exports = mongoose.model("Paravat", ParavatSchema);
