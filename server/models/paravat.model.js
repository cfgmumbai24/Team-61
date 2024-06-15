const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParavatSchema = new Schema({
  name: { type: String },
  address: { type: String },
  PhoneNumber: { type: Number },
  Score: { type: Number },
  Password: { type: String },
  Email: { type: String },
  beneficId: [{ type: Schema.Types.ObjectId, ref: "Benefic" }],
  verificationToken: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Paravat", ParavatSchema);
