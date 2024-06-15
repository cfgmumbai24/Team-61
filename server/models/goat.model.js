const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoatSchema = new Schema({
  tag: { type: String, required: true },
  dob: { type: Date },
  weight: { type: Number, min: 0 },
  breed: { type: String },
  gender: { type: String, enum: ["Male", "Female", "Unknown"] },
  color: { type: String },
  vaccinations: [
    {
      date: { type: Date },
      vaccId: { type: Schema.Types.ObjectId, ref: "Vaccination" },
    },
  ],
  issueDate: { type: Date },
  updatedWeight: [{ type: Number }],
  insurance: [
    {
      date: { type: Date },
      insuranceid: { type: String },
    },
  ],
  isAlive: { type: Boolean },
  diseases: [{ type: String }],
  sellingPrice: { type: Number },
  numberOfChildren: { type: Number },
  children: [{ type: Schema.Types.ObjectId, ref: "Goat" }],
  comments: { type: String },
  beneficId: { type: Schema.Types.ObjectId, ref: "Benefic" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  health: { type: String },
});

module.exports = mongoose.model("Goat", GoatSchema);
